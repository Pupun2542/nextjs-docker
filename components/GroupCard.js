import React, { useEffect, useState } from "react";
import { Container, SSRProvider, Row, Col } from "react-bootstrap";
import style from "../styles/groupcard.module.css";
import { useApp } from "../src/hook/local";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuth } from "firebase/auth";

function GroupCard() {
  
  const Router = useRouter();
  // const { ismygroup } = Router.query();

  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  const [loading, setLoading] = useState(true);
  // const query;
  useEffect(() => {
    const Fetchdata = async () => {
      if(auth.currentUser){
        const q = query(
          collection(db, "group"),
          where("Creator", "==", auth.currentUser.uid)
        );
        const QuerySnapshot = await getDocs(q);
        // QuerySnapshot.docs.map((doc) => doc.data());
        setCommu(
          QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
      }
      else{
          const snapshot = await getDocs(collection(db, "group"))
          setCommu(
            QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          setLoading(false);
      }
    };
    Fetchdata();
    
  }, []);



  return (
    <div>
    {!loading&&commu.map((value,index)=>{
      return(
        <div className={style.card}>
      <Col md={2}>
        <img src={value.banner_url} height="150" width="150"></img>
      </Col>
      <Col md={10}>
        <Row>
          <h2>{value.Name}</h2>
        </Row>
        <Row>
          {value.genre.map((tag) => {
            return <div className={style.genre}>{tag}</div>;
          })}
        </Row>
      </Col>
    </div>
      )
    })}
    </div>
  );
}

export default GroupCard;
