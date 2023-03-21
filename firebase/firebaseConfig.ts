// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, FirebaseOptions } from "firebase/app";
import { browserLocalPersistence, getAuth, initializeAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getReactNativePersistence } from "@firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig:FirebaseOptions = {
  apiKey: "AIzaSyBX1UPyKjHZVIa3fvqyfNkWjNB9AqLZJJc",
  authDomain: "mooo-c2ad5.firebaseapp.com",
  projectId: "mooo-c2ad5",
  storageBucket: "mooo-c2ad5.appspot.com",
  messagingSenderId: "599369550483",
  appId: "1:599369550483:web:4768269fce56342282db66",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);
export { app, firestore, auth, storage };
