import React from "react";
import CustomNavbar from "../components/navbar";
import style from "../styles/creategroup.module.css";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Carousel, SSRProvider } from "react-bootstrap";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "../components/Banner";
import { useApp } from "../src/hook/local";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import UploadImageModal from "../components/Banner";
import {
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

import {
  Box,
  Button,
  Flex,
  Center,
  Container,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Plus,
  Minus,
  ArrowRight,
} from "phosphor-react";
import GroupSidebar from "../components/GroupSidebar";
import Footer from "../components/footer";
import { Createcommuform } from "../components/createcommuform";

export default function CreateGroup() {
  const { app, auth, db } = useApp();
  const [user, loading, error] = useAuthState(auth);
  const Router = useRouter();
  const store = getStorage(app);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login");
    }
  }, [user, loading]);

  const [genre, setGenre] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [communame, setCommuname] = useState("");
  const [maxplayer, setMaxplayer] = useState("");
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
  const [rule, setRule] = useState("");
  const [averageTime, setAvergeTime] = useState("");
  const [averageTimeUnit, setAvergeTimeUnit] = useState("");
  const [type, setType] = useState("");

  const parseTime = (localtime) => {
    // console.log(localtime);
    const spdatetime = localtime.split("T");

    const timebuild = spdatetime[0] + " เวลา " + spdatetime[1];
    return timebuild;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (communame && hashtag && description) {
      // const docRef = await addDoc(collection(db, "group"), {
      //   name: communame,
      //   creator: auth.currentUser.uid,
      //   type: type,
      //   privacy: privacy,
      //   tag: hashtag,
      //   description: description,
      //   maxplayer: maxplayer,
      //   runtime: runtime,
      //   genre: genre,
      //   smlink: smlink,
      //   qaasklink: qaasklink,
      //   qaanslink: qaanslink,
      //   submitlink: submitlink,
      //   resultlink: resultlink,
      //   contactlink: contactlink,
      //   place: places,
      //   times: times,
      //   tws: TWs,
      //   startDate: startDate,
      //   rating: rating,
      //   rule: rule,
      //   averageTime: averageTime,
      //   averageTimeUnit: averageTimeUnit,
      //   createAt: serverTimestamp(),
      // });

      let toUpdate = {};

      if (bannerBlob) {
        const storageref = ref(
          store,
          `group/${docRef.id}/uploadImages/${auth.currentUser.uid}${Date.now()}`
        );
        uploadString(storageref, bannerBlob, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            updateDoc(docRef, { banner: url });
            toUpdate = { ...toUpdate, banner: url };
          });
        });
      } else {
        toUpdate = { ...toUpdate, banner: "https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2Fimageplaceholder.png?alt=media&token=e3a54ee9-8d20-4471-8f4f-7157ac972757" };
      }
      if (docfile) {
        const storageref = ref(
          store,
          `group/${docRef.id}/documents/mainDocument.pdf`
        );
        uploadBytes(storageref, docfile).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // toUpdate = {...toUpdate, doclink: url};
            updateDoc(docRef, { doclink: url });
          });
        });
      }
      // console.log("tosendLength",Object.keys(toUpdate).length)
      // if (!Object.keys(toUpdate).length === 0){
      //   updateDoc(docRef, toUpdate);
      // }

      setGenre([]);
      setCommuname("");
      setMaxplayer("");
      setRuntime("");
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
      setStartDate("");
      setRating("");
      setRule("");
      setAvergeTime("");
      setAvergeTimeUnit("");
      setType("");
      setDocfile(null)
      Router.push("/group/" + docRef.id);
    } else {
      alert("กรุณาใส่ชื่อ ชื่อย่อ และคำอธิบายคอมมู");
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
      <Box w={150} h={38}>
        <Box >
          <Box id="tags">
            {props.state.map((tag, index) => (
              <Box key={index} className={style.tag} m={1.5} p={1} maxW={200}>
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
              w={'auto'}
              className={style.search}
              isDisabled={props.isDisabled}
              border="hidden"
              maxW={200}
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

  if (loading) {
    <Text>Loding User</Text>
  }

  if (user) {
    return (
      <Box bg="#FFFFFF">
        <CustomNavbar />
        <Createcommuform/>

        {/* module zone */}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Test
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        <Footer></Footer>
      </Box>
    );
  }
  return (<></>)
}
