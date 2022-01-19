import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CustomNavbar from "../components/navbar";
import {
  getFirestore,
  getDoc,
  query,
  QuerySnapshot,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";

export default function Mygroup() {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();
  // const [data, setData] = useState([]);

  const CurrentUser = () => {
    const [commu, setCommu] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
      return (
        <SSRProvider>
          <CustomNavbar />
        </SSRProvider>
      );
    }
    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
        </div>
      );
    }

    if (user) {
      // let data = [];

      const q = query(
        collection(db, "group"),
        where("Creator", "==", auth.currentUser.uid)
      );
      getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          // data.push(doc);
          setCommu(...doc)
        });
      });
      // console.log(data);
      return (
        <div>
          <CustomNavbar />
          <div>
            {commu.map((value, index)=>{
              console.log(doc.get('Name'))
              return (
                <p key={index}>{value.get('Name')}</p>
              )
            })}
          </div>
          <Container></Container>
        </div>
      );
    }
    return Router.push("/login");
  };

  return CurrentUser();
}
