import { async } from "@firebase/util";
import { getApp } from "firebase/app"
import "../config/firebase.config"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext } from "react";
import { useApp } from "../hook/local";
import { initializeUserDb } from "./firestoreservice";

const app = getApp();
const auth = getAuth(app);

export async function SignInwithGoogle(){
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
}
export async function SignInWithFacebook(){
    const provider = new FacebookAuthProvider();
    return await signInWithPopup(auth, provider);
}
export async function Logout(){
    signOut(auth)
}
export async function SignInWithEmailAndPassword(email, password){
    await signInWithEmailAndPassword(email, password);
}
export async function RegisterWithEmail(email, password, displayname){
    console.log("into regis")
    let error = ""
    const phprofileurl = "https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/profileimg%2Fistockphoto-1223671392-612x612.jpg?alt=media&token=2e2848e9-864f-48db-a20b-0d62022f02c6"
    await createUserWithEmailAndPassword(auth, email, password).catch((e)=>{
        console.log(e)
    });
    // signInWithEmailAndPassword(email, password);
    updateProfile(auth, {displayName: displayname, photoURL: phprofileurl});
    // return
}
