import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore'
// import { getApp } from 'firebase/app'
import { getStorage } from "firebase-admin/storage";

const app = initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://comuthor-36139-default-rtdb.asia-southeast1.firebasedatabase.app"
})

export const db = getFirestore(app);
export const store = getStorage(app);

