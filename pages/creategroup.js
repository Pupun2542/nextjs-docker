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
      const docRef = await addDoc(collection(db, "group"), {
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
        // doclink: doclink,
        qaasklink: qaasklink,
        qaanslink: qaanslink,
        submitlink: submitlink,
        resultlink: resultlink,
        contactlink: contactlink,
        // regDate: regDate,
        place: places,
        times: times,
        tws: TWs,
        startDate: startDate,
        rating: rating,
        rule: rule,
        averageTime: averageTime,
        averageTimeUnit: averageTimeUnit,
        createAt: serverTimestamp(),
      });

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
        <Flex justifyContent={'center'} >
          <Box
            w={400}
            minH={1000}
            bg={"#F3F3F3"}
            boxShadow={'0 0 3px #000000'}
          >
          </Box>
          <Spacer bg={"#F3F3F3"} />

          <VStack w={1000} spacing={0}>
            <Flex
              h={'58'}
              width={850}
              bg={"#6768AB"}
              marginTop={55}
              boxShadow={'0 0 3px #000000'}
            >
            </Flex>

            <Flex boxShadow={'0 0 3px #000000'}>
              <UploadImageModal
                setBannerBlob={setBannerBlob}
                BannerBlob={bannerBlob}
              />
            </Flex>

            <Flex
              h={'auto'}
              color={'white'}
              width={850}
              bg={"#6768AB"}
              borderTopRadius={5}
              boxShadow={'0 0 3px #000000'}
            >
              <Spacer />
              <Center
                //จะเป็น Real-Time จากช่องพิมพ์ชื่อย่อคอมมู
                p={2}
                className={style.HeadingCreate2}
              >
                {hashtag ? "[" + hashtag + "]" : "[____]"}
              </Center>

              <Center
                //จะเป็น Real-Time จากช่องพิมพ์ชื่อคอมมู
                className={style.HeadingCreate2}
              >
                {communame ? communame : "ชื่อคอมมูนิตี้"}
              </Center>
              <Spacer />
            </Flex>

            <VStack boxShadow={'0 0 3px #000000'} spacing={0}>
              <Accordion allowMultiple >
                <AccordionItem minW={850} bg={'#F3F3F3'}>
                  <h2>
                    <AccordionButton>
                      <AccordionIcon color={"Black"} w={50} h={50} />

                      <Box className={style.Accordion} color="Black">
                        Basic Information
                      </Box>
                    </AccordionButton>
                  </h2>

                  {/* Community Name */}

                  <AccordionPanel color={"white"}>
                    <VStack>
                      <Center w={800}>
                        <Flex
                          bg={'White'}
                          borderRadius={10}
                          minW={700}
                          boxShadow='0 0 3px #000000'
                        >
                          <Box p={4} w={200}>
                            <Box className={style.Topic2} pl={0}>
                              <Text float="left" color={'black'}>ชื่อคอมมูนิตี้</Text>
                              <Text color={"red"} float="left">&nbsp;*</Text>
                            </Box>
                          </Box>

                          <Spacer
                            borderRightColor={"#C4C4C4"}
                            borderRightWidth={3}
                          />

                          <Center pl={1.5} pr={1.5}>
                            <Input
                              type="text"
                              value={communame}
                              onChange={(e) => {
                                setCommuname(e.target.value);
                              }}
                              required
                              w={485}
                              h={46}
                              bg={"white"}
                              placeholder={"..."}
                              className={style.search}
                            />
                          </Center>
                        </Flex>
                      </Center>

                      {/* Name Tag */}

                      <Center>
                        <Flex minW={700}>
                          <Flex
                            bg={"white"}
                            borderRadius={10}
                            minW={"auto"}
                            color={'black'}
                            boxShadow='0 0 3px #000000'
                          >
                            <Box p={4} w={200}>
                              <Flex className={style.Topic2} pl={0}>
                                <Text float="left">
                                  ชื่อย่อ
                                </Text>
                                <Text color={"red"} float="left">
                                  *
                                </Text>
                                <Text fontSize={12} pt={2}>&nbsp;(ไม่เกิน 6 ตัวอักษร)</Text>
                              </Flex>
                            </Box>

                            <Spacer
                              borderRightColor={"#C4C4C4"}
                              borderRightWidth={3}
                            />

                            <Center pl={1.5} pr={1.5}>
                              <Input
                                type="text"
                                value={hashtag}
                                onChange={(e) => {
                                  setHashtag(e.target.value);
                                }}
                                required
                                w={100}
                                h={46}
                                bg={"white"}
                                placeholder={"..."}
                                className={style.search}
                                maxLength={6}
                              />
                            </Center>
                          </Flex>

                          <Spacer />

                          <Flex
                            bg={"white"}
                            borderRadius={10}
                            minW={"10"}
                            boxShadow='0 0 3px #000000'
                          >
                            <Box p={4} w={200}>
                              <Box className={style.Topic2}>
                                ความเป็นส่วนตัว
                              </Box>
                            </Box>

                            <Spacer
                              borderRightColor={"#C4C4C4"}
                              borderRightWidth={3}
                            />

                            <Center pl={1.5} pr={1.5}>
                              <Select
                                isRequired
                                w={160}
                                h={46}
                                bg={"white"}
                                color="black"
                                size="lg"
                                defaultValue={"สาธารณะ"}
                                fontFamily={"Mitr"}
                              >
                                <option
                                  style={{ backgroundColor: "White" }}
                                  value={"สาธารณะ"}
                                >
                                  สาธารณะ
                                </option>

                                <option
                                  style={{ backgroundColor: "White" }}
                                  value={"ส่วนตัว"}
                                >
                                  ส่วนตัว
                                </option>

                              </Select>
                            </Center>
                          </Flex>
                        </Flex>
                      </Center>

                      <Center>
                        <Flex minW={700}>
                          <Flex
                            bg={"white"}
                            borderRadius={10}
                            minW={"auto"}
                            boxShadow='0 0 3px #000000'
                          >
                            <Box p={4} w={200}>
                              <Box className={style.Topic2}>
                                จำนวนผู้เล่น
                              </Box>
                            </Box>

                            <Spacer
                              borderRightColor={"#C4C4C4"}
                              borderRightWidth={3}
                            />

                            <Center pl={1.5} pr={1.5}>
                              <NumberInput w={100} onChange={(e) => setMaxplayer(e)}>
                                <NumberInputField
                                  bg={"white"}
                                  h={46}
                                  color={"black"}
                                  fontFamily={'Mitr'}
                                />
                                <NumberInputStepper>
                                  <NumberIncrementStepper color="black" />
                                  <NumberDecrementStepper color="black" />
                                </NumberInputStepper>
                              </NumberInput>
                            </Center>
                          </Flex>

                          <Spacer />

                          <Flex
                            bg={"white"}
                            borderRadius={10}
                            minW={"10"}
                            boxShadow='0 0 3px #000000'
                          >
                            <Box p={4} w={200}>
                              <Box className={style.Topic2}>ประเภท</Box>
                            </Box>

                            <Spacer
                              borderRightColor={"#C4C4C4"}
                              borderRightWidth={3}
                            />

                            <Center pl={1.5} pr={1.5}>
                              <Select
                                isRequired
                                w={160}
                                h={46}
                                bg={"white"}
                                color="black"
                                size="lg"
                                fontFamily={"Mitr"}
                                onChange={(e) => setType(e.target.value)}
                                defaultValue={"Slow-Life"}
                              >
                                <option
                                  style={{ backgroundColor: "White" }}
                                  value={"Slow-Life"}
                                >
                                  Slow-Life
                                </option>
                                <option
                                  style={{ backgroundColor: "White" }}
                                  value={"Vote for kill"}
                                >
                                  Vote for kill
                                </option>
                                <option
                                  style={{ backgroundColor: "White" }}
                                  value={"Survival"}
                                >
                                  Survival
                                </option>
                                <option
                                  style={{ backgroundColor: "White" }}
                                  value={"Slow-Survival"}
                                >
                                  Slow-Survival
                                </option>
                              </Select>
                            </Center>
                          </Flex>
                        </Flex>
                      </Center>

                      <Center>
                        <Flex>
                          <Flex
                            bg={"white"}
                            borderRadius={10}
                            maxW={700}
                            minH={"auto"}
                            boxShadow='0 0 3px #000000'
                          >
                            <Box w={200} p={4}>
                              <Box className={style.Topic2}>หมวดหมู่</Box>
                            </Box>

                            <Spacer
                              borderRightColor={"#C4C4C4"}
                              borderRightWidth={3}
                            />

                            <Center>
                              <Container
                                minW={485}
                                h="auto"
                                minH={46}
                                bg={"white"}
                                borderRadius={10}
                                m={1.5}
                              >
                                <Hashtag
                                  selectedTags={selectedTags}
                                  state={genre}
                                  setState={setGenre}
                                />
                              </Container>
                            </Center>
                          </Flex>
                        </Flex>
                      </Center>

                      <Flex w={800}>
                        <Center w={50}>
                          <Switch
                            bg={"gray.500"}
                            borderRadius={10}
                            isChecked={durationsw}
                            onChange={() => setDurationsw(!durationsw)}
                          //เพิ่ม 2 บรรทัดบน ตัวแปรให้ตรงกับที่สร้าง 1 state ต่อ 1 component
                          />
                        </Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4}>
                                <Box className={style.Topic2}>
                                  วันที่เริ่มเล่น
                                </Box>
                              </Box>

                              <Spacer
                                borderRightColor={'#C4C4C4'}
                                borderRightWidth={3}
                              />

                              <Center pl={1.5} pr={1.5}>
                                <Input
                                  type="datetime-local"
                                  isDisabled={!durationsw} //แล้วก็เพิ่มตรงนี้ ชื่อตัวแปรตาม state ที่สร้าง
                                  isRequired
                                  h={46}
                                  bg={"white"}
                                  color="black"
                                  w={485}
                                  onChange={(e) =>
                                    setStartDate(parseTime(e.target.value))
                                  }
                                  fontFamily={"Mitr"}
                                />
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>

                      </Flex>

                      <Flex w={800}>
                        <Center w={50}>
                          <Switch
                            bg={"gray.500"}
                            borderRadius={10}
                            isChecked={Averagesw}
                            onChange={() => setAveragesw(!Averagesw)}
                          />
                        </Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4}>
                                <Box className={style.Topic2}>
                                  ระยะเวลาโดยประมาณ
                                </Box>
                              </Box>

                              <Spacer
                                borderRightColor={"#C4C4C4"}
                                borderRightWidth={3}
                              />

                              <Input
                                bg="white"
                                m={1.5}
                                borderRadius={10}
                                w={310}
                                h={46}
                                color={"Black"}
                                isDisabled={!Averagesw}
                                value={averageTime}
                                onChange={(e) =>
                                  setAvergeTime(e.target.value)
                                }
                              />

                              <Spacer
                                borderLeftColor={"#C4C4C4"}
                                borderLeftWidth={3}
                              />

                              <Center pl={1.5} pr={1.5}>
                                <Select
                                  isRequired
                                  h={46}
                                  w={160}
                                  bg={"white"}
                                  color="black"
                                  size="lg"
                                  isDisabled={!Averagesw}
                                  fontFamily={"Mitr"}
                                  onSelect={(e) =>
                                    setAvergeTimeUnit(e.target.value)
                                  }
                                >
                                  <option
                                    style={{ backgroundColor: "White" }}
                                  >
                                    วัน(Day)
                                  </option>
                                  <option
                                    style={{ backgroundColor: "White" }}
                                  >
                                    เดือน(Month)
                                  </option>
                                  <option
                                    style={{ backgroundColor: "White" }}
                                  >
                                    ปี(Year)
                                  </option>
                                </Select>
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>

                      </Flex>

                      <Flex w={800}>
                        <Center w={50}>
                          <Switch
                            bg={"gray.500"}
                            borderRadius={10}
                            isChecked={Locationsw}
                            onChange={() => setLocationsw(!Locationsw)}
                          />
                        </Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              minH={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4}>
                                <Box className={style.Topic2}>
                                  สถานที่ภายในคอมมูนิตี้
                                </Box>
                              </Box>

                              <Spacer
                                borderRightColor={"#C4C4C4"}
                                borderRightWidth={3}
                              />

                              <Center>
                                <Container
                                  minW={485}
                                  h="auto"
                                  minH={46}
                                  bg={"white"}
                                  borderRadius={10}
                                  m={1.5}
                                >
                                  <Hashtag
                                    selectedTags={selectedTags}
                                    state={places}
                                    setState={setPlaces}
                                    isDisabled={!Locationsw}
                                  />
                                </Container>
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>
                      </Flex>

                      <Flex w={800}>
                        <Center w={50}>
                          <Switch
                            bg={"gray.500"}
                            borderRadius={10}
                            isChecked={Timelinesw}
                            onChange={() => setTimelinesw(!Timelinesw)}
                          />
                        </Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              minH={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4}>
                                <Box className={style.Topic2}>
                                  ยุคสมัยของคอมมูนิตี้
                                </Box>
                              </Box>

                              <Spacer
                                borderRightColor={"#C4C4C4"}
                                borderRightWidth={3}
                              />

                              <Center>
                                <Container
                                  minW={485}
                                  h="auto"
                                  minH={46}
                                  bg={"white"}
                                  borderRadius={10}
                                  m={1.5}
                                >
                                  <Hashtag
                                    selectedTags={selectedTags}
                                    state={times}
                                    setState={setTimes}
                                    isDisabled={!Timelinesw}
                                  />
                                </Container>
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>
                      </Flex>

                      <Flex w={800}>
                        <Center w={50}>
                          <Switch
                            bg={"gray.500"}
                            borderRadius={10}
                            isChecked={Ratingsw}
                            onChange={() => setRatingsw(!Ratingsw)}
                          />
                        </Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4}>
                                <Box className={style.Topic2}>
                                  ระดับของเนื้อหา
                                </Box>
                              </Box>

                              <Spacer
                                borderRightColor={"#C4C4C4"}
                                borderRightWidth={3}
                              />

                              <Center pl={1.5} pr={1.5}>
                                <Select
                                  isRequired
                                  w={485}
                                  h={46}
                                  bg={"white"}
                                  color="black"
                                  size="lg"
                                  isDisabled={!Ratingsw}
                                  value={
                                    rating
                                      ? rating
                                      : "G (เหมาะสำหรับทุกวัย)"
                                  }
                                  onChange={(e) =>
                                    setRating(e.target.value)
                                  }
                                >
                                  <option
                                    style={{ backgroundColor: "White" }}
                                    value="G (เหมาะสำหรับทุกวัย)"
                                  >
                                    G (เหมาะสำหรับทุกวัย)
                                  </option>
                                  <option
                                    style={{ backgroundColor: "White" }}
                                    value="R-13 (เหมาะสำหรับอายุ 13 ปีขึ้นไป)"
                                  >
                                    R-13 (เหมาะสำหรับอายุ 13 ปีขึ้นไป)
                                  </option>
                                  <option
                                    style={{ backgroundColor: "White" }}
                                    value="R-18 (เหมาะสำหรับอายุ 18 ปีขึ้นไป)"
                                  >
                                    R-18 (เหมาะสำหรับอายุ 18 ปีขึ้นไป)
                                  </option>
                                  <option
                                    style={{ backgroundColor: "White" }}
                                    value="NC-21 (ไม่เหมาะสำหรับเยาวชน)"
                                  >
                                    NC-21 (ไม่เหมาะสำหรับเยาวชน)
                                  </option>
                                </Select>
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>
                      </Flex>

                      <Flex w={800}>
                        <Center w={50}>
                          <Switch
                            bg={"gray.500"}
                            borderRadius={10}
                            isChecked={Triggersw}
                            onChange={() => setTriggersw(!Triggersw)}
                          />
                        </Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              minH={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4}>
                                <Box className={style.Topic2}>คำเตือน</Box>
                              </Box>

                              <Spacer
                                borderRightColor={"#C4C4C4"}
                                borderRightWidth={3}
                              />

                              <Center>
                                <Container
                                  minW={485}
                                  h="auto"
                                  minH={46}
                                  bg={"white"}
                                  borderRadius={10}
                                  m={1.5}
                                >
                                  <Hashtag
                                    selectedTags={selectedTags}
                                    state={TWs}
                                    setState={setTWs}
                                    isDisabled={!Triggersw}
                                  />
                                </Container>
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>
                      </Flex>

                      <Flex w={800}>
                        <Center w={50}>
                          <Switch
                            bg={"gray.500"}
                            borderRadius={10}
                            isChecked={Rulesw}
                            onChange={() => setRulesw(!Rulesw)}
                          />
                        </Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              minH={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4}>
                                <Box className={style.Topic2}>
                                  กฎกติกาและข้อตกลง
                                </Box>
                              </Box>

                              <Spacer
                                borderRightColor={"#C4C4C4"}
                                borderRightWidth={3}
                              />

                              <Center>
                                <Textarea
                                  type="text"
                                  required
                                  w={485}
                                  h={100}
                                  bg={"white"}
                                  className={style.search}
                                  m={1.5}
                                  isDisabled={!Rulesw}
                                  value={rule}
                                  onChange={(e) => setRule(e.target.value)}
                                />
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>
                      </Flex>

                      <Flex w={800}>
                        <Center w={50}></Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              minH={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4} className={style.Topic2}>
                                <Text float="left">คำอธิบาย</Text>
                                <Text color={"red"} float="left">
                                  &nbsp;*
                                </Text>
                              </Box>

                              <Spacer
                                borderRightColor={"#C4C4C4"}
                                borderRightWidth={3}
                              />

                              <Center>
                                <Textarea
                                  type="text"
                                  required
                                  w={485}
                                  h={200}
                                  bg={"white"}
                                  className={style.search}
                                  m={1.5}
                                  value={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                />
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>
                      </Flex>

                      <Flex w={800}>
                        <Center w={50}></Center>

                        <Center>
                          <Flex maxW={700}>
                            <Flex
                              bg={"white"}
                              borderRadius={10}
                              minW={"auto"}
                              minH={"auto"}
                              boxShadow='0 0 3px #000000'
                            >
                              <Box w={200} p={4} className={style.Topic2}>
                                <Text float="left">เอกสารคอมมู</Text>
                                <Text color={"red"} float="left">
                                  &nbsp;*
                                </Text>
                                <Text color={"red"} fontSize={13} mt={1} float="left">
                                  &nbsp;(pdf)
                                </Text>
                              </Box>

                              <Spacer
                                borderRightColor={"#C4C4C4"}
                                borderRightWidth={3}
                              />

                              <Center>
                                <Input
                                  required
                                  w={485}
                                  bg={"white"}
                                  className={style.search}
                                  m={1.5}
                                  p={1}

                                  type="file"
                                  // value={doclink}
                                  onChange={(e) => {
                                    // uploadTotemporaryPDF(setDoclink, e.target.files[0])
                                    setDocfile(e.target.files[0])
                                  }}
                                />
                              </Center>
                            </Flex>
                          </Flex>
                        </Center>
                      </Flex>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* Registration */}

              <Accordion allowMultiple>
                <AccordionItem minW={850} bg={'#F3F3F3'}>
                  <Flex>
                    <AccordionButton>
                      <AccordionIcon color={"Black"} w={50} h={50} />

                      <Box className={style.Accordion} color="Black">
                        Registration
                      </Box>
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel fontFamily={'Mitr'} color={"white"}>
                    <VStack>

                      <Flex ml={100} w={'100%'}>
                        <Box fontSize={18} color={'black'}>ลงทะเบียนตัวละคร</Box>

                        <Spacer />

                        <IconButton mr={50} icon={<Plus size={24} />} size="auto" p={1} color={'white'} bg={'#72994C'} rounded="50" />
                      </Flex>

                      <Flex w={800}>

                        <Center w={50} >
                          <IconButton icon={<Minus size={24} />} size="auto" p={1} color={'white'} bg={'#F86F6F'} rounded="50" />
                        </Center>

                        <VStack>
                          <Flex
                            bg={"white"}
                            color={'black'}
                            borderRadius={10}
                            minW={200}
                            boxShadow='0 0 3px #000000'
                          >
                            <Box p={2} w={200}>
                              <Input
                                className={style.Topic3}
                                pl={2}
                                placeholder={"หัวข้อการรับสมัคร"}
                              />
                            </Box>

                            <Spacer
                              borderRightColor={"#C4C4C4"}
                              borderRightWidth={3}
                            />

                            <Center>
                              <Input
                                type="text"
                                required
                                w={485}
                                bg={"white"}
                                className={style.search}
                                m={1.5}
                                placeholder={'text'}
                              />
                            </Center>
                          </Flex>

                        </VStack>
                      </Flex>

                      <Flex height={'auto'}>
                        <Center w={89}>
                          <VStack spacing={0} >
                            <Box w={'22px'} borderColor={'#636363'} height={'5'} borderLeftWidth={3} ></Box>
                            <Box
                              borderColor={'#636363'}
                              borderBottomLeftRadius={10}
                              borderBottomStyle={'solid'}
                              borderBottomWidth={3}
                              borderLeftWidth={3}
                              height={'10px'}
                              w={'22px'}
                              borderLeftStyle={'solid'}
                            ></Box>
                          </VStack>
                        </Center>
                        <Flex
                          bg={"white"}
                          color={'black'}
                          borderRadius={10}
                          minW={200}
                          boxShadow='0 0 3px #000000'
                        >
                          <Box mt={1.5} p={2} w={196}>
                            วันที่และเวลา
                          </Box>

                          <Spacer
                            borderRightColor={"#C4C4C4"}
                            borderRightWidth={3}
                          />

                          <Flex w={412}>
                            <Input
                              type="date"
                              required
                              bg={"white"}
                              className={style.search}
                              m={1.5}
                            />

                            <Center>
                              <ArrowRight size={30} color="#000000" />
                            </Center>

                            <Input
                              type="date"
                              required
                              bg={"white"}
                              className={style.search}
                              m={1.5}
                              placeholder={'link'}
                            />

                          </Flex>
                        </Flex>

                      </Flex>

                      <Flex height={'auto'} color={'white'}>
                        <Center w={89}>
                          <VStack spacing={0} >
                            <Box w={'22px'} borderColor={'#636363'} height={'5'} borderLeftWidth={3} ></Box>
                            <Box
                              borderColor={'#636363'}
                              borderBottomLeftRadius={10}
                              borderBottomStyle={'solid'}
                              borderBottomWidth={3}
                              borderLeftWidth={3}
                              height={'10px'}
                              w={'22px'}
                              borderLeftStyle={'solid'}
                            ></Box>
                          </VStack>
                        </Center>
                        <Flex
                          bg={"white"}
                          color={'black'}
                          borderRadius={10}
                          minW={200}
                          boxShadow='0 0 3px #000000'
                        >
                          <Box mt={1.5} p={2} w={196}>
                            ลิงก์ลงทะเบียน
                          </Box>

                          <Spacer
                            borderRightColor={"#C4C4C4"}
                            borderRightWidth={3}
                          />

                          <Box w={412}>
                            <Input
                              type="text"
                              required
                              w={400}
                              bg={"white"}
                              className={style.search}
                              m={1.5}
                              placeholder={'link'}
                            />
                          </Box>
                        </Flex>


                      </Flex>

                      <Flex w={'100%'}>
                        <Box ml={55} fontSize={18} color={'black'}>ตรวจสถานะการรับสมัคร</Box>

                        <Spacer />

                        <IconButton icon={<Plus size={24} />} size="auto" p={1} color={'white'} bg={'#72994C'} rounded="50" />
                      </Flex>

                      <Flex w={800}>

                        <Center w={50} >
                          <IconButton icon={<Minus size={24} />} size="auto" p={1} color={'white'} bg={'#F86F6F'} rounded="50" />
                        </Center>

                        <VStack>
                          <Flex
                            bg={"white"}
                            color={'black'}
                            borderRadius={10}
                            minW={200}
                            boxShadow='0 0 3px #000000'
                          >
                            <Box p={2} w={200}>
                              <Input
                                className={style.Topic3}
                                pl={2}
                                placeholder={"หัวข้อการตรวจ"}
                              />
                            </Box>

                            <Spacer
                              borderRightColor={"#C4C4C4"}
                              borderRightWidth={3}
                            />

                            <Center>
                              <Input
                                type="text"
                                required
                                w={485}
                                bg={"white"}
                                className={style.search}
                                m={1.5}
                                placeholder={'text'}
                              />
                            </Center>
                          </Flex>

                        </VStack>
                      </Flex>

                      <Flex height={'auto'}>
                        <Center w={89}>
                          <VStack spacing={0} >
                            <Box w={'22px'} borderColor={'#636363'} height={'5'} borderLeftWidth={3} ></Box>
                            <Box
                              borderColor={'#636363'}
                              borderBottomLeftRadius={10}
                              borderBottomStyle={'solid'}
                              borderBottomWidth={3}
                              borderLeftWidth={3}
                              height={'10px'}
                              w={'22px'}
                              borderLeftStyle={'solid'}
                            ></Box>
                          </VStack>
                        </Center>
                        <Flex
                          bg={"white"}
                          color={'black'}
                          borderRadius={10}
                          minW={200}
                          boxShadow='0 0 3px #000000'
                        >
                          <Box mt={1.5} p={2} w={196}>
                            วันที่และเวลา
                          </Box>

                          <Spacer
                            borderRightColor={"#C4C4C4"}
                            borderRightWidth={3}
                          />

                          <Flex w={412}>
                            <Input
                              type="date"
                              required
                              bg={"white"}
                              className={style.search}
                              m={1.5}
                              placeholder={'link'}
                            />

                            <Center>
                              <ArrowRight size={30} color="#000000" />
                            </Center>

                            <Input
                              type="date"
                              required
                              bg={"white"}
                              className={style.search}
                              m={1.5}
                              placeholder={'link'}
                            />

                          </Flex>
                        </Flex>

                      </Flex>

                      <Flex height={'auto'} color={'white'}>
                        <Center w={89}>
                          <VStack spacing={0} >
                            <Box w={'22px'} borderColor={'#636363'} height={'5'} borderLeftWidth={3} ></Box>
                            <Box
                              borderColor={'#636363'}
                              borderBottomLeftRadius={10}
                              borderBottomStyle={'solid'}
                              borderBottomWidth={3}
                              borderLeftWidth={3}
                              height={'10px'}
                              w={'22px'}
                              borderLeftStyle={'solid'}
                            ></Box>
                          </VStack>
                        </Center>
                        <Flex
                          bg={"white"}
                          color={'black'}
                          borderRadius={10}
                          minW={200}
                          boxShadow='0 0 3px #000000'
                        >
                          <Box mt={1.5} p={2} w={196}>
                            ลิงก์
                          </Box>

                          <Spacer
                            borderRightColor={"#C4C4C4"}
                            borderRightWidth={3}
                          />

                          <Box w={412}>
                            <Input
                              type="text"
                              required
                              w={400}
                              bg={"white"}
                              className={style.search}
                              m={1.5}
                              placeholder={'link'}
                            />
                          </Box>
                        </Flex>

                      </Flex>

                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>

            <Flex w={800} p={10}>
              <Button
                color={"#000000"}
                bg={"#FFC75A"}
                fontFamily="Mitr"
                fontWeight={700}
                fontSize={20}
                borderWidth={3}
                borderColor={'#000000'}
                h={50}
                w={150}
                onClick={onOpen}
              >
                เพิ่มผู้ดูแล
              </Button>

              <Spacer />

              <Button
                color={"#000000"}
                bg={"#FFC75A"}
                fontFamily="Mitr"
                fontWeight={700}
                fontSize={20}
                borderWidth={3}
                borderColor={'#000000'}
                h={50}
                w={150}
              >
                เพิ่มรูปย่อ
              </Button>

              <Spacer />

              <Button
                onClick={HandleSubmit}
                color={"#FBBC43"}
                bg={"#343434"}
                fontFamily="Mitr"
                fontWeight={700}
                fontSize={20}
                borderWidth={3}
                borderColor={'#000000'}
                h={50}
                w={150}
              >
                สร้างคอมมู
              </Button>
            </Flex>

          </VStack>

          <Spacer bg={"#F3F3F3"} />

          <Box w={400} minH={1000} bg={"#F3F3F3"}></Box>
        </Flex>

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
