import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
import { addDoc, collection, getFirestore, query, QuerySnapshot, serverTimestamp, setDoc,getDoc, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
// import { db } from "./firebaseadminservice";

const app = getApp();
const db = getFirestore(app);

export async function UpdateUserDetail(user) {
    const ref = collection(db, "userDetail", user);

    const docsnap = await getDoc(ref);
    if (docsnap.exists()){
        await updateDoc(coll, lastnamechange =serverTimestamp())
    }
    else{
        await setDoc(ref, {
            userid = user,
            lastnamechange = serverTimestamp()
        })
    }
}
export async function UpdateUserGroup(user, groupId) {
    const ref = collection(db, "userDetail", user);

    const docsnap = await getDoc(ref);
    if (docsnap.exists()){
        const currentGroup = docsnap.data().currentGroup;
        if (currentGroup){
            await updateDoc(ref,{
                currentGroup: [...currentGroup, groupId]
            })
        }
        else {
            await updateDoc(ref,{
                currentGroup: [groupId]
            })
        }
    }
}

export async function initializeUserDb(user){
    const ref = collection(db, "userDetail", user);
    const docsnap = await getDoc(ref);
    if (!docsnap.exists()){
        await setDoc(ref, {
            userId = user
        })
    }
}
