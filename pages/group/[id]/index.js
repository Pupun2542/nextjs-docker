import React, { useState, useEffect } from "react";
import { Container, SSRProvider, Row, Col } from "react-bootstrap";
import CustomNavbar from "../../../components/navbar";
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
import GroupSidebar from "../../../components/GroupSidebar";
import { useApp } from "../../../src/hook/local";

export default function Group() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { id } = Router.query;
  useEffect(() => {
    const Fetchdata = async () => {
      const d = getDoc(doc(db, "group", id)).then((d) => {
        setData(d.data());
        setLoading(false);
      });
    };
    if (id) Fetchdata();
    // console.log(data)
  }, [id]);

  return (
    <div>
      <CustomNavbar />
      <div></div>
      <Row>
        <Col md={2}>
          <GroupSidebar />
        </Col>
        <Col md={8}>
          <img className="Banner"></img>
          <div>วันเริ่มวิ่ง : {data.regDate ? data.regDate : "ยังไม่ได้ลงวันวิ่ง"}</div>
          <div>ด็อค : {data.doclink ? data.doclink : "ยังไม่มีลิงค์ด็อค"}</div>
          <div>ส่งวิ่ง : {data.submitlink ? data.submitlink : "ยังไม่มีลิงค์วิ่ง"}</div>
          <div>ตรวจสอบวิ่ง : {data.resultlink ? data.resultlink : "ยังไม่มีลิงค์ตรวจสอบวิ่ง"}</div>
          <div>ถามคำถาม : {data.qaasklink ? data.qaasklink : "ยังไม่มีลิงค์ถามคำถาม"}</div>
          <div>ตรวจสอบคำถาม : {data.qaanslink ? data.qaanslink : "ยังไม่มีลิงค์ตอบคำถาม"}</div>
          <div>จำนวนรับ : {data.maxplayer ? data.maxplayer : "ไม่จำกัดจำนวนรับ"}</div>
          <div>ช่องทางติดต่อ : {data.contactlink ? data.contactlink : "ไม่มีช่องทางติดต่อ"}</div>
          {/* {auth ? auth.currentUser.uid = data.Creator ? (<button/>) : null : null} */}
        </Col>
        <Col md={2}>
          <h1>Something</h1>
        </Col>
      </Row>
    </div>
  );
}
