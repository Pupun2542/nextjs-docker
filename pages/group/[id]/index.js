import React, { useState, useEffect } from "react";
import {
  Container,
  SSRProvider,
  Row,
  Col,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
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
  deleteDoc,
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
import style from "../../../styles/groupdetail.module.css";

export default function Group() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [pin, setPin] = useState(true);
  const [text, setText] = useState("");

  const { id } = Router.query;
  useEffect(() => {
    const Fetchdata = async () => {
      getDoc(doc(db, "group", id)).then((d) => {
        getDoc(doc(db, "userDetail", d.data().Creator)).then((staff) => {
          if (staff.exists) {
            setData({ ...d.data(), CreatorName: staff.data().displayName });
          }
        });

        setLoading(false);
      });
    };
    if (id) Fetchdata();
  }, [id]);

  const editButtonHandler = () => {
    Router.push("/group/" + id + "/edit");
  };

  useEffect(() => {
    const l = async ()=>{
      if (auth.currentUser && db) {
        
        const d = await getDoc(doc(db, "userDetail", auth.currentUser.uid))
        console.log(auth.currentUser.uid);
        if (d.data().PinnedGroup){
          if (d.data().PinnedGroup.includes(id)) {
            setPin(false);
            console.log(pin);
          }
        }
      }
    }
   l();
  }, [auth, db, id, pin]);

  const pinHandler = () => {
    if (auth.currentUser) {
      UpdateUserPinGroup(auth.currentUser.uid, id);
      if (pin) {
        setPin(false);
      } else {
        setPin(true);
      }
    } else {
      alert("กรุณาล็อกอินเพื่อใช้ฟังก์ชั่นปักหมุด");
    }
  };

  const removehandler = () => {
    console.log("remove")
    if (auth.currentUser && auth.currentUser.uid == data.Creator) {
      console.log("modal")
      setShow(true);
    }else{
      console.log(auth.currentUser,auth.currentUser.uid,data.Creator)
    }
  };
  const confirmRemove = () => {
    if (text == data.tag) {
      deleteDoc(doc(db, "group", id));
      setShow(false);
      Router.push("/group");
    } else {
      console.log(text,data.tag)
      alert("กรุณากรอกข้อมูลอีกครั้ง");
    }
  };

  return (
    <SSRProvider>
      <div className={style.background}>
        <CustomNavbar />
        <div></div>
        <Row>
          <Col md={2}>
            <GroupSidebar />
          </Col>
          <Col className={style.frombackground} md={8}>
            <img
              className={style.pic}
              src={data.banner}
              height={360}
              width={640}
            ></img>
            <div className={style.head}>
              ชื่อย่อคอมมู | {data.Name ? data.Name : "ชื่อคอมมู"}
            </div>
            <div className={style.des}>
              วันเริ่มวิ่ง :{" "}
              {data.regDate ? data.regDate : "ยังไม่ได้ลงวันวิ่ง"}
            </div>
            <div className={style.des}>
              ด็อค : {data.doclink ? data.doclink : "ยังไม่มีลิงก์ด็อค"}
            </div>
            <div className={style.des}>
              ส่งวิ่ง :{" "}
              {data.submitlink ? data.submitlink : "ยังไม่มีลิงก์วิ่ง"}
            </div>
            <div className={style.des}>
              ตรวจสอบวิ่ง :{" "}
              {data.resultlink ? data.resultlink : "ยังไม่มีลิงก์ตรวจสอบวิ่ง"}
            </div>
            <div className={style.des}>
              ถามคำถาม :{" "}
              {data.qaasklink ? data.qaasklink : "ยังไม่มีลิงก์ถามคำถาม"}
            </div>
            <div className={style.des}>
              ตรวจสอบคำถาม :{" "}
              {data.qaanslink ? data.qaanslink : "ยังไม่มีลิงก์ตอบคำถาม"}
            </div>
            <div className={style.des}>
              จำนวนรับ : {data.maxplayer ? data.maxplayer : "ไม่จำกัดจำนวนรับ"}
            </div>
            <div className={style.des}>
              ช่องทางติดต่อ :{" "}
              {data.contactlink ? data.contactlink : "ไม่มีช่องทางติดต่อ"}
            </div>
            <div className={style.des}>
              ชื่อทีมงาน : {data.CreatorName ? data.CreatorName : data.Creator}
            </div>
            {auth.currentUser ? (
              auth.currentUser.uid == data.Creator ? (
                <button onClick={editButtonHandler}>แก้ไขข้อมูล</button>
              ) : null
            ) : null}
            <Dropdown>
              <Dropdown.Toggle className={style.button}>...</Dropdown.Toggle>
              <Dropdown.Menu>
                {pin ? (
                  <Dropdown.Item
                    className={style.subbutton}
                    onClick={pinHandler}
                  >
                    ปักหมุดกลุ่มนี้
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item 
                  onClick={pinHandler}
                  className={style.subbutton}
                  >
                    
                    ถอนปักหมุดกลุ่มนี้
                  </Dropdown.Item>
                )}
                {auth.currentUser ? (
                  auth.currentUser.uid == data.Creator ? (
                    <Dropdown.Item
                      className={style.subbutton}
                      onClick={removehandler}
                    >
                      ลบกลุ่ม
                    </Dropdown.Item>
                  ) : null
                ) : null}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>ยืนยันลบคอมมู</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>กรอกแท็คคอมมูเพื่อยืนยันการลบคอมมู</div>
              <div>
                <input
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                ></input>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={confirmRemove}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
    </SSRProvider>
  );
}
