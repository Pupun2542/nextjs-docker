import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import "../src/config/firebase.config"
import { SignInwithGoogle, SignInWithFacebook, SignInWithEmailAndPassword } from '../src/services/authservice';
import { useState } from 'react'
import CustomNavbar from '../components/navbar';
import { SSRProvider } from 'react-bootstrap';
import { Router, useRouter } from 'next/router';

function Login() {
    const app = getApp()
    const auth = getAuth(app)
    const [user, loading, error] = useAuthState(auth);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const router = useRouter()
    var mail
	if (loading){
		return(<SSRProvider><CustomNavbar/></SSRProvider>)
	}
    if (user){
        mail = user.email
    }
    else{
        mail = "null"
    }
    const signInWithEmail = async()=>{
        SignInWithEmailAndPassword(email, password)
    }
	const google = () =>{
		SignInwithGoogle();
		router.push("/");
	}
	const facebook = () =>{
		SignInWithFacebook();
		router.push("/")
	}
    return (
		<SSRProvider>
        <div>
			<CustomNavbar/>
            {email}
            {password}
            <div>
	    <div>
		    <div>
			    <div>

					<h2>Sign in</h2>
			        <div>
						<form onSubmit={signInWithEmail}>
							<div>
                                {/* <label>
                                    Email
                                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                                </label> */}
							</div>
							<div>
                                {/* <label>
                                    Password
                                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                                </label> */}
								<div>
									<div>
										{/* <div class="forgot-password text-end"><a href="#">Forgot password?</a></div> */}
									</div>
								</div>
							</div>
							<div>
								{/* <button type='submit'>Sign In</button> */}
							</div>
						</form>

							{/* <div class="auth-option text-center pt-5">Not yet a member? <a class="text-link" href="#"> Sign up</a></div> */}
                            <button onClick={google}>Sign in with google</button>
                            <button onClick={facebook}>Sign in with Facebook</button>
					</div>

			    </div>

		    </div>
	    </div>
	    <div>
		    <div>
		    </div>
		    <div></div>
		    <div>
			    <div>
				    <div>
					    <h5>ยินดีต้อนรับกลับเข้าสู่ Comuthor อีกครั้ง</h5>
					    <div>เริ่มเล่น เริ่มเขียน เริ่มสร้าง มาเริ่มต้นใหม่ที่ Comuthor กันเถอะ</div>
				    </div>
				</div>
		    </div>
	    </div>
        </div>
        </div>
		</SSRProvider>
    )
}

export default Login
