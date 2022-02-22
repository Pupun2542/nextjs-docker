import React, { useEffect, useState } from "react";
import { Container,SSRProvider, Row, Col } from "react-bootstrap";
import CustomNavbar from "../../components/navbar";

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
import GroupSidebar from "../../components/GroupSidebar";
import { useApp } from "../../src/hook/local";
import GroupCard from "../../components/GroupCard";
import style from "../../styles/group.module.css"

export default function Groups() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();
  // const [data, setData] = useState([]);

  const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(()=>{
      if(!loading && !user){
        Router.push("/login")
      }
    },[user,loading])


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
      return (
        <div className={style.groupbg}>
          <CustomNavbar />
          <div>
          </div>
            <Row>
              <Col md={2}>
                <GroupSidebar/>
              </Col>
              <Col md={8} className={style.GroupCardpad}>
                <GroupCard/>
              </Col>
              <Col md={2} className={style.colright}>
                <div className={style.create}>
                  <a href="/createcommy" className={style.textcreate}>CREATE COMMU</a>
                </div>
              </Col>
            </Row>
        </div>
      );
    }
    return <></>;
  };

  return CurrentUser();
}