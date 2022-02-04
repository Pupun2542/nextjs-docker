import React, { useState, useEffect } from "react";
import { Container, SSRProvider, Row, Col, Dropdown } from "react-bootstrap";
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
import { UpdateUserPinGroup } from "../../../src/services/firestoreservice";
import style from "../../../styles/groupdetail.module.css"

export default function Group() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [pin, setPin] = useState(true);

  const { id } = Router.query;
  useEffect(() => {
    const Fetchdata = async () => {
      getDoc(doc(db, "group", id)).then((d) => {
        getDoc(doc(db, "userDetail", d.data().Creator)).then((staff)=>{
          if (staff.exists){
            setData({...d.data(), CreatorName: staff.data().displayName});
          }
        });

        
        setLoading(false);
      });
    };
    if (id) Fetchdata();
  }, [id]);

  const editButtonHandler = () =>{
    Router.push("/group/"+id+"/edit")
  }

    useEffect(()=>{
      if (auth.currentUser&&db){
        const d = getDoc(doc(db, "userDetail", auth.currentUser.uid)).then((d) => {
          
          if (d.data().PinnedGroup.includes(id)){
            setPin(false);
          }
        });
      }
    },[auth,db,id])

    const pinHandler = () =>{
      if (auth.currentUser){
        UpdateUserPinGroup(auth.currentUser.uid, id)
        if(pin){
          setPin(false);
        }
        else{
          setPin(true);
        }
      }
      else{
        alert("กรุณาล็อกอินเพื่อใช้ฟังก์ชั่นปักหมุด")
      }
      
    }

  return (
    <div>
      <CustomNavbar />
      <div></div>
      <Row>
        <Col md={2}>
          <GroupSidebar />
        </Col>
        <Col md={8}>
          <img src={data.banner} height={360} width={640}></img>
          <div>วันเริ่มวิ่ง : {data.regDate ? data.regDate : "ยังไม่ได้ลงวันวิ่ง"}</div>
          <div>ด็อค : {data.doclink ? data.doclink : "ยังไม่มีลิงค์ด็อค"}</div>
          <div>ส่งวิ่ง : {data.submitlink ? data.submitlink : "ยังไม่มีลิงค์วิ่ง"}</div>
          <div>ตรวจสอบวิ่ง : {data.resultlink ? data.resultlink : "ยังไม่มีลิงค์ตรวจสอบวิ่ง"}</div>
          <div>ถามคำถาม : {data.qaasklink ? data.qaasklink : "ยังไม่มีลิงค์ถามคำถาม"}</div>
          <div>ตรวจสอบคำถาม : {data.qaanslink ? data.qaanslink : "ยังไม่มีลิงค์ตอบคำถาม"}</div>
          <div>จำนวนรับ : {data.maxplayer ? data.maxplayer : "ไม่จำกัดจำนวนรับ"}</div>
          <div>ช่องทางติดต่อ : {data.contactlink ? data.contactlink : "ไม่มีช่องทางติดต่อ"}</div>
          <div>ชื่อทีมงาน : {data.CreatorName ? data.CreatorName : data.Creator}</div>
          {auth.currentUser ? auth.currentUser.uid == data.Creator ? (<button onClick={editButtonHandler}>แก้ไขข้อมูล</button>) : null : null}
          <Dropdown>
            <Dropdown.Toggle>...</Dropdown.Toggle>
            <Dropdown.Menu>
              {pin ? <Dropdown.Item onClick={pinHandler}>ปักหมุดกลุ่มนี้</Dropdown.Item> : <Dropdown.Item onClick={pinHandler}>ถอนปักหมุดกลุ่มนี้</Dropdown.Item>}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2}>
        </Col>
      </Row>
    </div>
  );
}
