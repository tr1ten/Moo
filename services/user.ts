import { API_URL } from "../constants/common";
import { fetchAPI } from "./utils";

export async function registerUser(id:string,isSeller:boolean,name:string,location:string){
    const typeId = isSeller ? 1 : 2;
    const user = await fetchAPI(API_URL+"/user",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            typeId,
            name,
            location,
            id
        })
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during registering",e);
        return null;
    })
    return user;
}

export async function fetchSellerCatalog(id:string){
    const catalog = await fetchAPI(API_URL+`/user/catalogue?userId=${id}`).then((r)=>r.json()).catch((e)=>{
        console.log("error during fetchAPIing catalog",e);
        return null;
    })
    return catalog;
}

export async function getNearbySellerItems(userId:string){
    const sellers = await fetchAPI(API_URL+`/seller/nearby?userId=${userId}`).then((r)=>r.json()).catch((e)=>{});
    return sellers;
}

export async function getUser(userId:string) {
    const user = await fetchAPI(API_URL+`/user?userId=${userId}`).then((r)=>r.ok && r.json()).catch((e)=>console.log("error while getting user",e));
    return user;
}

export async function updateUser(userId:string,name:string,bio?:string,image?:string){
    const user = await fetchAPI(API_URL+`/user/update`,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId,
            image,
            name,
            bio
        })
    }).then((r)=>r.ok && r.json()).catch((e)=>null && console.log("error while updating user",e));
    return user;
}