import "../config/firebase.config"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { getApp } from "firebase/app"
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from 'react'
import { async } from "@firebase/util";
// import { store } from "./firebaseadminservice";


export function Uploadprofileimg(file){
    const app = getApp();
    const store = getStorage(app);
    const auth = getAuth(app);
    // const [fileURL, setfileURL] = useState("");
    // console.log(file.name)
    if (!file){
        // console.log("returned")
        return;
    }
    const storageref = ref(store,`profileimg/${file.name}`);
    const uploadtask = uploadBytesResumable(storageref, file);

    uploadtask.on("state_changed", (snapshot) =>{
        // console.log(snapshot.totalBytes)
    }, (error) => {console.log(error)}, 
    ()=>{
        getDownloadURL(uploadtask.snapshot.ref).then((url)=>{
            updateProfile(auth.currentUser, {photoURL: url});
        })
    })
    // return fileURL;
}

