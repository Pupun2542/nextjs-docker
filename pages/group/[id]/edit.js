import React from "react";
import CustomNavbar from "../../../components/navbar";
import style from "../../../styles/creategroup.module.css";
import { useState, useEffect, useRef } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useApp } from "../../../src/hook/local";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import UploadImageModal from "../../../components/Banner";
import {
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
// import { Blob } from "node:buffer";
import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Center,
  Square,
  Circle,
  Container,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  VStack,
  Input,
  Select,
  CloseButton,
  Switch,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { FacebookLogo, DiscordLogo } from "phosphor-react";
import { Createcommuform } from "../../../components/commuforms/createcommuform";
import Footer from "../../../components/footer";
import axios from "axios";

export default function Edit() {
  const { app, auth, db } = useApp();
  const [user, loading, error] = useAuthState(auth);
  const Router = useRouter();
  const store = getStorage(app);
  const { id } = Router.query;

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login");
    }
  }, [user, loading]);
  const [data, setData] = useState(null)

  //ก็อปปี้บรรทัดบนไปวางเพิ่ม หรือเขียนเอง ลักษณะคือ const [state, setState] = useState(true) โดยที่ state คือชื่อตัวแปรที่จะใช้ เช่น durationsw ส่วน setstate คือฟังก์ชั่นที่ไว้ใช้เปลี่ยนค่าตัวแปร

  useEffect(() => {
    const Fetchdata = async () => {
      // console.log(auth.currentUser)
      const token = await user.getIdToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      let data = res.data;
      if (Object.keys(data.staff).includes(user.uid))
      setData(data);
    };
    if (!loading && !user) {
      Router.push("/login");
    } else {
      if (id && user) {
        Fetchdata();
      }
    }
  }, [user, loading, id]);
  return (
    <Box>
      <Box bg="#FDFDFD" maxW={1980}>
        <CustomNavbar />
        <Createcommuform data={data} gid={id}/>
        <Footer/>
      </Box>
    </Box>
  );
}
