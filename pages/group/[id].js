import React, { useState, useEffect } from "react";
import { Container, SSRProvider, Row, Col } from "react-bootstrap";
import CustomNavbar from "../../components/navbar";
import {
  getFirestore,
  getDoc,
  query,
  QuerySnapshot,
  collection,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import GroupSidebar from "../../components/GroupSidebar";
import { useApp } from "../../src/hook/local";

export default function Group() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);
    const { id } = Router.query;
    useEffect(() => {
        const Fetchdata = async () => {
            const d = getDoc(doc(db, "group", id)).then((d) => {
              setData(d.data());
              setLoading(false);
            });
            
        };
        if (id) Fetchdata();
    }, [id]);
    
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
        <div>
          <CustomNavbar />
          <div></div>
          <Row>
            <Col md={3}>
              <GroupSidebar />
            </Col>
            <Col md={6}>
              <h1>{data.Name}</h1>
            </Col>
            <Col md={3}>
              <h1>Something</h1>
            </Col>
          </Row>
        </div>
      );
    }
    return Router.push("/login");
  };

  return CurrentUser();
}
