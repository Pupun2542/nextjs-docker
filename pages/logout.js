import React from 'react'
import { getApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import CustomNavbar from '../components/navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

function Logout() {
    const app = getApp();
    const auth = getAuth(app);
    const[user,loading,error] = useAuthState(auth);
    const router = useRouter();
    if (user){
        signOut(auth)
        router.push("/")
    }
    return (
    <div>
    <CustomNavbar/>
    </div>
    )
    
}

export default Logout
