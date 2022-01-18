// import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
// import { getApp } from "firebase/app";
import { db } from "./firebaseadminservice";

export async function UpdateUserDetail(user) {
    await addDoc(collection(db, "userDetail"), {
        userId = user,
        lastnamechange = serverTimestamp()
    })
}
