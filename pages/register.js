import React, { useState } from "react";
import CustomNavbar from "../components/navbar";
import { RegisterWithEmail } from "../src/services/authservice";
import { useRouter } from "next/router";
import "../src/config/firebase.config"

export default function Register() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[c_password, setC_Password] = useState("");
    const[displayname, setDisplayname] = useState("")
    const router = useRouter()

    const regist = () =>{
        if (password == c_password){
            console.log(email, password, displayname);
            RegisterWithEmail(email, password, displayname);
            // setEmail("");
            // setPassword("");
            // setC_Password("");
            // setDisplayname("");
            // router.push("/profile");
        }
    }


  return (
//     <SSRProvider>
//     <div class="row g-0 app-auth-wrapper">
//       <CustomNavbar />
//       <div class="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
//         <div class="d-flex flex-column align-content-end">
//           <div class="app-auth-body mx-auto">
//             <h2 class="header">Sign up</h2>

//             <div class="auth-form-container text-start mx-auto">
//               <form onSubmit={regist} class="auth-form auth-signup-form">
//                 {/* {{form.hidden_tag()}} */}
//                 <div class="email mb-3">
//                 <label>
//                     Username
//                     <input type="text" value={displayname} onChange={(e)=>{setDisplayname(e.target.value)}}></input>
//                 </label>
//                 </div>
//                 <div class="email mb-3">
//                 <label>
//                     Email
//                     <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
//                 </label>
//                 </div>
//                 <div class="password mb-3">
//                 <label>
//                     Password
//                     <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
//                 </label>
//                 </div>
//                 <div class="password mb-3">
//                 <label>
//                     Password
//                     <input type="password" value={c_password} onChange={(e)=>{setC_Password(e.target.value)}}></input>
//                 </label>
//                 </div>

//                 <div class="text-center">
//                   <Button type="submit" variant="primary">Register</Button>
//                 </div>
//               </form>

//               <div class="auth-option text-center pt-5">
//                 Already have an account?{" "}
//                 <a class="text-link" href="{{url_for('index')}}">
//                   Log in
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
//         <div class="auth-background-holder"></div>
//         <div class="auth-background-mask"></div>
//         <div class="auth-background-overlay p-3 p-lg-5">
//           <div class="d-flex flex-column align-content-end h-100">
//             <div class="overlay-content p-3 p-lg-4 rounded">
//               <h5 class="mb-3 overlay-title">ยินดีต้อนรับสู่ Comuthor</h5>
//               <div>
//                 เริ่มเล่น เริ่มเขียน เริ่มสร้าง มาเริ่มต้นใหม่ที่ Comuthor
//                 กันเถอะ
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </SSRProvider>
<div></div>
  );
}
