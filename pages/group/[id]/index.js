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
import Head from "next/head";
import { Box, Center, Flex, VStack, FacebookLogo, Spacer, DiscordLogo } from "@chakra-ui/react"

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
    // console.log("effect");
    const l = async ()=>{
      // console.log(auth.currentUser,db);
      if (auth.currentUser && db) {
        console.log("if1");
        const d = await getDoc(doc(db, "userDetail", auth.currentUser.uid))
        // console.log(auth.currentUser.uid);
        if (d.data().PinnedGroup){
          console.log("if2");
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
      <Head>
        <link rel="shortcut icon" href="../../../favicon.ico"></link>
        <title>Comuthor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box>


        <Center
          bg={'#343434'}
          h={180}
        >
          <Flex>
            <Center>
              <VStack m={5}>
                <Box fontFamily={'mitr'} color={'#FFFFFF'}>Comuthor © 2022</Box>
                <Flex>
                  <FacebookLogo size={32} color={'#FFFFFF'} />
                  <Spacer w={5} />
                  <DiscordLogo size={32} color={'#FFFFFF'}/>
                </Flex>
              </VStack>

            </Center>

            <Spacer borderRightColor={'#ffffff'} borderWidth={1} h={150} />

            <Center>
              <VStack fontFamily={'Mitr'} m={5} color={'#FFFFFF'}>
                <Box >About us</Box>
                <Box>Guide</Box>
              </VStack>


            </Center>

            <Spacer borderRightColor={'#ffffff'} borderWidth={1} h={150} />

            <Center>
              <VStack m={5} fontFamily={'Mitr'} color={'#FFFFFF'}>
                <Box>Policy</Box>
                <Box>Term</Box>
              </VStack>


            </Center>
          </Flex>
        </Center>
      </Box>


      {/* <div className={style.background}>
        <CustomNavbar />
        <div></div>
        <Row>
          <Col md={2}>
            
          </Col>
          <Col className={style.frombackground} md={8}>
            <img
              className={style.pic}
              src={data.banner}
              height={723}
              width={1285}
            ></img>
            <div className={style.head}>
              {data.tag ? data.tag : "ชื่อย่อคอมมู"} | {data.Name ? data.Name : "ชื่อคอมมู"}
            </div>
            <label className={style.dis}>คำอธิบาย</label>
            <div className={style.des}>{data.description}</div>
            <div className={style.des}>
              วันเริ่มวิ่ง :{" "}
              {data.regDate ? data.regDate : "ยังไม่ได้ลงวันวิ่ง"}
            </div>
            <div className={style.des}>
              ลิงก์กลุ่มคอมมู : {data.smlink ? (<a href={data.smlink}>{data.smlink}</a>) : "ยังไม่มีลิงก์ด็อค"}
            </div>
            <div className={style.des}>
              ลิงก์ด็อคคอมมู :{" "}
              {data.doclink ? (<a href={data.doclink}>{data.doclink}</a>) : "ยังไม่มีลิงก์วิ่ง"}
            </div>
            <div className={style.des}>
              ลิงก์ลงทะเบียนตัวละคร :{" "}
              {data.submitlink ? (<a href={data.submitlink}>{data.submitlink}</a>) : "ยังไม่มีลิงก์ตรวจสอบวิ่ง"}
            </div>
            <div className={style.des}>
              ลิงก์ตรวจสอบผลการสมัคร :{" "}
              {data.resultlink ? (<a href={data.resultlink}>{data.resultlink}</a>) : "ยังไม่มีลิงก์ถามคำถาม"}
            </div>
            <div className={style.des}>
              จำนวนรับ : {data.maxplayer ? data.maxplayer : "ไม่จำกัดจำนวนรับ"}
            </div>
            <div className={style.des}>
              ลิงค์ถามคำถาม : {data.qaasklink ? (<a href={data.qaasklink}>{data.qaasklink}</a>) : "ไม่จำกัดจำนวนรับ"}
            </div>
            <div className={style.des}>
              ลิงค์ตอบคำถาม : {data.qaanslink ? (<a href={data.qaanslink}>{data.qaanslink}</a>) : "ไม่จำกัดจำนวนรับ"}
            </div>
            <div className={style.des}>
              ช่องทางติดต่อ :{" "}
              {data.contactlink ? (<a href={data.contactlink}>{data.contactlink}</a>) : "ไม่มีช่องทางติดต่อ"}
            </div>
            <div className={style.des}>
              ชื่อทีมงาน : {data.CreatorName ? (data.CreatorName) : data.Creator}
            </div>
            <Row>
              <Col md={8}></Col>
              <Col md={2}>
              {auth.currentUser ? (
              auth.currentUser.uid == data.Creator ? (
                <button onClick={editButtonHandler} className={style.button}>แก้ไขข้อมูล</button>
              ) : null
            ) : null}
              </Col>
              <Col md={2}>
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
            </Row>
            
            
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
          </Modal> */}
    </SSRProvider>
  );
}
