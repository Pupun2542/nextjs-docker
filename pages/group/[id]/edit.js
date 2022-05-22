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
import { Createcommuform } from "../../../components/createcommuform";

export default function Edit() {
  // const app = useApp();
  // const db = getFirestore(app);
  // const auth = getAuth(app);
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

  const [genre, setGenre] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [communame, setCommuname] = useState("");
  const [maxplayer, setMaxplayer] = useState("");
  // const [regDate, setRegDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [smlink, setSmlink] = useState("");
  const [doclink, setDoclink] = useState("");
  const [docfile, setDocfile] = useState(null);
  const [qaasklink, setQaasklink] = useState("");
  const [qaanslink, setQaanslink] = useState("");
  const [submitlink, setSubmitlink] = useState("");
  const [resultlink, setResultlink] = useState("");
  const [contactlink, setContactlink] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [bannerBlob, setBannerBlob] = useState(null);
  const [durationsw, setDurationsw] = useState(true);
  const [Averagesw, setAveragesw] = useState(true);
  const [Locationsw, setLocationsw] = useState(true);
  const [Timelinesw, setTimelinesw] = useState(true);
  const [Ratingsw, setRatingsw] = useState(true);
  const [Triggersw, setTriggersw] = useState(true);
  const [Rulesw, setRulesw] = useState(true);
  const [places, setPlaces] = useState([]);
  const [times, setTimes] = useState([]);
  const [TWs, setTWs] = useState([]);
  const [rating, setRating] = useState("");
  const originBannerUrl = useRef("");
  const [rule, setRule] = useState("");
  const [averageTime, setAvergeTime] = useState("");
  const [averageTimeUnit, setAvergeTimeUnit] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState(null)

  //ก็อปปี้บรรทัดบนไปวางเพิ่ม หรือเขียนเอง ลักษณะคือ const [state, setState] = useState(true) โดยที่ state คือชื่อตัวแปรที่จะใช้ เช่น durationsw ส่วน setstate คือฟังก์ชั่นที่ไว้ใช้เปลี่ยนค่าตัวแปร

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login");
    } else {
      if (id && user) {
        getDoc(doc(db, "group", id)).then((v) => {
          // const data = v.data();
          setData(v.data())

      //     if (user.uid != data.creator) {
      //       console.log(data.creator + " ", user);
      //       alert("Unorthorized Access");
      //       Router.back();
      //     } else {
      //       setGenre(data.genre ? data.genre : "");
      //       setCommuname(data.name ? data.name : "");
      //       setMaxplayer(data.maxplayer ? data.maxplayer : "");
      //       // setRegDate(data.regDate ? data.regDate : "");
      //       setRuntime(data.runtime ? data.runtime : "");
      //       setStartDate(data.startDate ? data.startDate : "");
      //       setSmlink(data.smlink ? data.smlink : "");
      //       setDescription(data.description ? data.description : "");
      //       setDoclink(data.doclink ? data.doclink : "");
      //       setQaasklink(data.qaasklink ? data.qaasklink : "");
      //       setQaanslink(data.qaanslink ? data.qaanslink : "");
      //       setSubmitlink(data.submitlink ? data.submitlink : "");
      //       setResultlink(data.resultlink ? data.resultlink : "");
      //       setContactlink(data.contactlink ? data.contactlink : "");
      //       setPrivacy(data.privacy ? data.privacy : "");
      //       setBannerBlob(data.banner ? data.banner : "");
      //       setHashtag(data.tag ? data.tag : "");
      //       setPlaces(data.place ? data.place : []);
      //       setTimes(data.times ? data.times : []);
      //       setTWs(data.tws ? data.tws : []);
      //       setRating(data.rating ? data.rating : "");
      //       setRule(data.rule ? data.rule : "");
      //       setAvergeTime(data.averageTime ? data.averageTime : "");
      //       setAvergeTimeUnit(
      //         data.averageTimeUnit ? data.averageTimeUnit : "วัน(Day)"
      //       );
      //       setType(data.type ? data.type : "");
      //       originBannerUrl.current = data.banner;
      //     }
        });
      }
    }
    console.log(user, loading, id);
  }, [user, loading, id]);

  const HandleSubmit = async (e) => {
    // console.log(communame)
    // console.log(auth.currentUser.uid)
    // console.log(privacy)
    // console.log(hashtag)
    // console.log(description)
    // console.log(maxplayer)
    // console.log(runtime)
    // console.log(genre)
    // console.log(smlink)
    // console.log(doclink)
    // console.log(qaasklink)
    // console.log(qaanslink)
    // console.log(submitlink)
    // console.log(resultlink)
    // console.log(contactlink)
    // console.log(regDate)
    // console.log(startDate)
    // console.log(places)
    // console.log(times)
    // console.log(TWs)
    // console.log(rating)
    // console.log(rule)
    // console.log(averageTime)
    // console.log(averageTimeUnit)
    // console.log(bannerBlob, originBannerUrl.current, bannerBlob !== originBannerUrl.current)

    e.preventDefault();
    if (confirm("ยืนยันการแก้ไข?")) {
      if (communame && hashtag && description) {
        await updateDoc(doc(db, "group", id), {
          name: communame,
          creator: auth.currentUser.uid,
          type: type,
          privacy: privacy,
          tag: hashtag,
          description: description,
          maxplayer: maxplayer,
          runtime: runtime,
          genre: genre,
          smlink: smlink,
          doclink: doclink,
          qaasklink: qaasklink,
          qaanslink: qaanslink,
          submitlink: submitlink,
          resultlink: resultlink,
          contactlink: contactlink,
          // regDate: regDate,
          startDate: startDate,
          place: places,
          times: times,
          tws: TWs,
          rating: rating,
          rule: rule,
          averageTime: averageTime,
          averageTimeUnit: averageTimeUnit,
          createAt: serverTimestamp(),
        });
        let toUpdate = {};
        if (bannerBlob !== originBannerUrl.current) {
          // console.log(bannerBlob, originBannerUrl);
          const storageref = ref(
            store,
            `group/${id}/uploadImages/${auth.currentUser.uid}${Date.now()}`
          );
          uploadString(storageref, bannerBlob, "data_url").then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              updateDoc(doc(db, "group", id), { banner: url });
              // toUpdate = { ...toUpdate, banner: url };
            });
          });
        }
        if (docfile) {
          // console.log(store)
          const storageref = ref(
            store,
            `group/${id}/documents/mainDocument.pdf`
          );
          console.log(storageref)
          uploadBytes(storageref, docfile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              // toUpdate = { ...toUpdate, doclink: url };
              updateDoc(doc(db, "group", id), { doclink: url });
            });
          });
        }
        // console.log("tosendLength",Object.keys(toUpdate).length)
        // if (!Object.keys(toUpdate).length === 0) {
        //   updateDoc(doc(db, "group", id), toUpdate);
        // }

        setGenre([]);
        setCommuname("");
        setMaxplayer("");
        // setRegDate("");
        setRuntime("");
        setStartDate("");
        setSmlink("");
        setDescription("");
        setDoclink("");
        setQaasklink("");
        setQaanslink("");
        setSubmitlink("");
        setResultlink("");
        setContactlink("");
        setPrivacy("");
        setBannerBlob(null);
        setHashtag("");
        setPlaces([]);
        setTimes([]);
        setTWs([]);
        setRule("");
        setAvergeTime("");
        setAvergeTimeUnit("");
        setType("");
        setDocfile(null);
        Router.push("/group/" + id);
      } else {
        alert("กรุณาใส่ชื่อ ชื่อย่อ และคำอธิบายคอมมู");
      }
    }
  };

  const Hashtag = (props) => {
    const removeTags = (indexToRemove) => {
      props.setState([
        ...props.state.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const addTags = (event) => {
      let tag = event.target.value.replace(",", "");
      tag = tag.trim();
      if (tag !== "") {
        props.setState([...props.state, tag]);
        props.selectedTags([...props.state, tag]);
        event.target.value = "";
      }
    };
    return (
      <Box w={680} h={38}>
        <Box>
          <Box id="tags">
            {props.state.map((tag, index) => (
              <Box key={index} className={style.tag} m={1.5} p={1} maxW={600}>
                <Box>{tag}</Box>
                <CloseButton
                  onClick={() => removeTags(index)}
                  rounded={50}
                  bg="white"
                  color={"black"}
                  h={22}
                  w={22}
                  m={1}
                />
              </Box>
            ))}
            <Input
              type="text"
              onKeyUp={(event) => (event.key === "," ? addTags(event) : null)}
              placeholder=" ใช้ , เพื่อแบ่งประเภท"
              w={"auto"}
              className={style.search}
              isDisabled={props.isDisabled}
              border="hidden"
              maxW={650}
              mt={1}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  const selectedTags = (tags) => {
    console.log(tags);
  };

  return (
    <Box>
      <Box bg="#FDFDFD" maxW={1980}>
        <CustomNavbar />
        <Createcommuform data={data}/>

        <Center bg={"#343434"} h={180}>
          <Flex>
            <Center>
              <VStack m={5}>
                <Box fontFamily={"mitr"} color={"#FFFFFF"}>
                  Comuthor © 2022
                </Box>
                <Flex>
                  <FacebookLogo size={32} color={"#FFFFFF"} />
                  <Spacer w={5} />
                  <DiscordLogo size={32} color={"#FFFFFF"} />
                </Flex>
              </VStack>
            </Center>

            <Spacer borderRightColor={"#ffffff"} borderWidth={1} h={150} />

            <Center>
              <VStack fontFamily={"Mitr"} m={5} color={"#FFFFFF"}>
                <Box>About us</Box>
                <Box>Guide</Box>
              </VStack>
            </Center>

            <Spacer borderRightColor={"#ffffff"} borderWidth={1} h={150} />

            <Center>
              <VStack m={5} fontFamily={"Mitr"} color={"#FFFFFF"}>
                <Box>Policy</Box>
                <Box>Term</Box>
              </VStack>
            </Center>
          </Flex>
        </Center>
      </Box>
    </Box>
  );
}
