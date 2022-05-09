import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/navbar";
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
// import Head from 'next/head';
import Footer from "../components/footer";

const CreateGame = () => {

  const { app, auth, db } = useApp();
  const [ user, loading ] = useAuthState(auth)
  const Router = useRouter();
  const store = getStorage(app);

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login");
    }
  }, [user, loading])

  const [ gamename, setGamename ] = useState("");
  const [ maxplayer, setMaxplayer ] = useState("");
  const [ stardate, setStartdate ] = useState("");
  const [ starttime, setStarttime ] = useState("");
  const [ submitlink, setSubmitlink ] = useState("");
  const [ privacy, setPrivacy ] = useState("");
  const [ rule, setRule ] = useState(true);

  const parseTime = (localtime) => {
    // console.log(localtime);
    const spdatetime = localtime.split("T");

    const timebuild = spdatetime[0] + " เวลา " + spdatetime[1];
    return timebuild;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    // re design ทำดหมือนระบบสร้างคอมมูเลย
    if (gamename) {
      const docRef = await addDoc(collection(db, "game"),{
      });
      

      Router.push("/game/" + docRef.id);

    };
  };


  {/* {(e) => { setState(e.target.value) }} */}

    return (
      <Box>
        <CustomNavbar />
        <VStack w={1000} spacing={0}>
            <Flex
              h={'50'}
              width={'2000px'}
              bg={"#6768AB"}
              marginTop={55}
              boxShadow={'0 0 3px #000000'}
            >
              <Center>
                <Text> คอมมูโหวตฆ่าที่หัวตันๆ </Text>
              </Center>
            </Flex>
          </VStack>
      </Box>
    )
  }
 
export default CreateGame;

/* 
  <Box>
            <h2> มาทำโหวตฆ่ากันมั้ย </h2>
          </Box>
          <Box>
            <Input 
              type={'text'}
              value={gamename}
              onChange={(e) => {
                setGamename(e.target.value);
              }}
              required
              fontFamily={'Mitr'}
            />
          </Box>
          <Box>
              <Input 
                type={'datetime-local'}
                isRequired
                onChange={(e) => {
                  setRuntime(parseTime(e.target.value))
                }}
                fontFamily={'Mitr'}
              />
          </Box>
          <Box>
            <Textarea 
              type={'text'}
              required
              value={rule}
              onChange={(e) => setRule(e.target.value)}
            />
          </Box>
          <Box>
                <Textarea 
                  type={'text'}
                  required
                  value={good}
                  onChange={(e) => setGood(e.target.value)}
                />
          </Box>
          <Box>
                <Textarea 
                  type={'text'}
                  required
                  value={bad}
                  onChange={(e) => setBad(e.target.value)}
                />
          </Box>
          <Button
              onClick={HandleSubmit}
              color={"#FBBC43"}
              bg={"#343434"}
              fontFamily="Mitr"
              fontWeight={100}
              fontSize={20}
              h={50}
              w={150}
              mb={20}
          >
            เอามาเทสดู
          </Button>
*/
