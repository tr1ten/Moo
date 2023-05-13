import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

// throw error when response not ok
export async function fetchAPI(url:string, options?:any) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res;
}


export async function uploadImageAsync(uri:string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob:any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(storage, "images/" + Date.now());
    await uploadBytes(fileRef, blob);
    // We're done with the blob, close and release it
    blob.close();
    return await getDownloadURL(fileRef);
  }