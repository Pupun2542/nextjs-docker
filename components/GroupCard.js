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
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuth } from "firebase/auth";


function GroupCard() {
  
  const Router = useRouter();
  const { bws } = Router.query;

  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Fetchdata = async () => {
      if(bws=="mygroup"){
        if (auth.currentUser){
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
      }
      else{
          const q = query(
            collection(db, "group"),
            orderBy("createAt", "desc")
          );
          const QuerySnapshot = await getDocs(q)
          setCommu(
            QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          setLoading(false);
      }
    };
    Fetchdata();
    
  }, [bws]);



  return (
    <div>
    {!loading&&commu.map((value,index)=>{
      return(
        <div className={style.card} onClick={()=>{Router.push("/group/"+value.id)}}>
      <Col md={2}>
        <img src={value.banner} height="216" width="384"></img>
      </Col>
      <Col md={10}>
        <Row>
          <h2 className={style.namecommu}>[{value.tag}]{value.Name}</h2>
        </Row>
        <Row>
          {value.genre.map((tag) => {
            return <div className={style.genre}>{tag}</div>;
          })}
        </Row>
        <Row className={style.padgroupcard}></Row>
      </Col>
    </div>
      )
    })}
    </div>
  );
}

export default GroupCard;
