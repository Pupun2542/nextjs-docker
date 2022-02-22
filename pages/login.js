import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Login.module.css";
import "../src/config/firebase.config";
import {
  SignInwithGoogle,
  SignInWithFacebook,
  SignInWithEmailAndPassword,
} from "../src/services/authservice";
import { useState } from "react";
import CustomNavbar from "../components/navbar";
import { SSRProvider } from "react-bootstrap";
import { Router, useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";

function Login() {
  const app = getApp();
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  var mail;
  if (loading) {
    return (
      <SSRProvider>
        <CustomNavbar />
      </SSRProvider>
    );
  }
  if (user) {
    mail = user.email;
  } else {
    mail = "null";
  }
  const signInWithEmail = async () => {
    SignInWithEmailAndPassword(email, password);
  };
  const google = () => {
    SignInwithGoogle();
    router.push("/");
  };
  const facebook = () => {
    SignInWithFacebook();
    router.push("/");
  };
  return (
    <SSRProvider>
        <CustomNavbar />
        <Row>
          <Col>
            <h2 className={styles.textSignin}>Sign in</h2>
            <div className={styles.padSignin}>
              <Row className={styles.BUtton}>
                <button onClick={google} className={styles.stylebutton}>Sign in with Google</button>
              </Row>
              <Row className={styles.BUtton}>
                <button onClick={facebook} className={styles.stylebutton}>Sign in with Facebook</button>
              </Row>
            </div>
          </Col>
          <Col className={styles.bglogin}>
            <div className={styles.padpr}>
                <div>ยินดีต้อนรับกลับเข้าสู่ Comuthor อีกครั้ง</div>
                <div>
                  เริ่มเล่น เริ่มเขียน เริ่มสร้าง มาเริ่มต้นใหม่ที่ Comuthor กันเถอะ
                </div>
            </div>
            
          </Col>
        </Row>
    </SSRProvider>
  );
}

export default Login;
