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

export default function Edit() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
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

  //ก็อปปี้บรรทัดบนไปวางเพิ่ม หรือเขียนเอง ลักษณะคือ const [state, setState] = useState(true) โดยที่ state คือชื่อตัวแปรที่จะใช้ เช่น durationsw ส่วน setstate คือฟังก์ชั่นที่ไว้ใช้เปลี่ยนค่าตัวแปร

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login");
    } else {
      if (id && user) {
        getDoc(doc(db, "group", id)).then((v) => {
          const data = v.data();

          if (user.uid != data.Creator) {
            console.log(data.Creator + " ", user);
            alert("Unorthorized Access");
            Router.back();
          } else {
            setGenre(data.genre ? data.genre : "");
            setCommuname(data.Name ? data.Name : "");
            setMaxplayer(data.maxplayer ? data.maxplayer : "");
            // setRegDate(data.regDate ? data.regDate : "");
            setRuntime(data.runtime ? data.runtime : "");
            setStartDate(data.startDate ? data.startDate : "");
            setSmlink(data.smlink ? data.smlink : "");
            setDescription(data.description ? data.description : "");
            setDoclink(data.doclink ? data.doclink : "");
            setQaasklink(data.qaasklink ? data.qaasklink : "");
            setQaanslink(data.qaanslink ? data.qaanslink : "");
            setSubmitlink(data.submitlink ? data.submitlink : "");
            setResultlink(data.resultlink ? data.resultlink : "");
            setContactlink(data.contactlink ? data.contactlink : "");
            setPrivacy(data.privacy ? data.privacy : "");
            setBannerBlob(data.banner ? data.banner : "");
            setHashtag(data.tag ? data.tag : "");
            setPlaces(data.place ? data.place : []);
            setTimes(data.times ? data.times : []);
            setTWs(data.tws ? data.tws : []);
            setRating(data.rating ? data.rating : "");
            setRule(data.rule ? data.rule : "");
            setAvergeTime(data.averageTime ? data.averageTime : "");
            setAvergeTimeUnit(
              data.averageTimeUnit ? data.averageTimeUnit : "วัน(Day)"
            );
            setType(data.Type ? data.Type : "");
            originBannerUrl.current = data.banner;
          }
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
          Name: communame,
          Creator: auth.currentUser.uid,
          Type: type,
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

        if (bannerBlob !== originBannerUrl.current) {
          console.log(bannerBlob, originBannerUrl);
          const storageref = ref(
            store,
            `group/${id}/uploadImages/${auth.currentUser.uid}${Date.now()}`
          );
          uploadString(storageref, bannerBlob, "data_url").then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              updateDoc(doc(db, "group", id), { banner: url });
            });
          });
        }

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
        <Flex>
          <Box minW={400}></Box>

          <Spacer />

          <Center bg={"#D5D5D5"} w={1024}>
            <VStack>
              <Center>
                <Box>
                  <Center>
                    <Flex>
                      <UploadImageModal
                        setBannerBlob={setBannerBlob}
                        BannerBlob={bannerBlob}
                      />
                    </Flex>
                  </Center>

                  <Center
                    bg={"#535353"}
                    p={4}
                    borderTopRadius={10}
                    maxW={1024}
                    w={1024}
                    color={"#FFFFFF"}
                  >
                    <Flex>
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
                    </Flex>
                  </Center>

                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024} color={"#FFFFFF"}>
                      <h2>
                        <AccordionButton>
                          <AccordionIcon color={"Black"} w={50} h={50} />

                          <Box className={style.Accordion} color="Black">
                            Basic Information
                          </Box>
                        </AccordionButton>
                      </h2>

                      <AccordionPanel>
                        <VStack>
                          {/* Community Name */}
                          <Center w={1024}>
                            <Flex bg={"#535353"} borderRadius={10} minW={900}>
                              <Box p={4} w={238}>
                                <Box className={style.Topic2} pl={0}>
                                  <Text float="left">ชื่อคอมมูนิตี้</Text>
                                  <Text color={"red"} float="left">
                                    *
                                  </Text>
                                </Box>
                              </Box>

                              <Spacer
                                borderRightColor={"white"}
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
                                  w={650}
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
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                              >
                                <Box p={4} w={238}>
                                  <Box className={style.Topic2} pl={0}>
                                    <Text float="left">
                                      ชื่อย่อไม่เกิน 6 ตัวอักษร
                                    </Text>
                                    <Text color={"red"} float="left">
                                      *
                                    </Text>
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
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
                                    w={130}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"..."}
                                    className={style.search}
                                    maxLength={6}
                                  />
                                </Center>
                              </Flex>

                              <Spacer w={50} />

                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"10"}
                              >
                                <Box p={4} w={238}>
                                  <Box className={style.Topic2}>
                                    ความเป็นส่วนตัว
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Select
                                    isRequired
                                    w={260}
                                    h={46}
                                    bg={"white"}
                                    color="black"
                                    size="lg"
                                    defaultValue={privacy ? privacy : "สาธารณะ"}
                                    onChange={(e) => setPrivacy(e.target.value)}
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
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                              >
                                <Box p={4} w={238}>
                                  <Box className={style.Topic2}>
                                    จำนวนผู้เล่น
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <NumberInput w={130}>
                                    <NumberInputField
                                      bg={"white"}
                                      h={46}
                                      color={"black"}
                                    />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper color="black" />
                                      <NumberDecrementStepper color="black" />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </Center>
                              </Flex>

                              <Spacer w={50} />

                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"10"}
                              >
                                <Box p={4} w={238}>
                                  <Box className={style.Topic2}>ประเภท</Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Select
                                    isRequired
                                    w={260}
                                    h={46}
                                    bg={"white"}
                                    color="black"
                                    size="lg"
                                    fontFamily={"Mitr"}
                                    onChange={(e) => setType(e.target.value)}
                                    value={type ? type : "Slow-Life"}
                                    // value={type}
                                  >
                                    {/* {console.log(type)} */}
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
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                                minH={"auto"}
                              >
                                <Box w={238} p={4}>
                                  <Box className={style.Topic2}>หมวดหมู่</Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center>
                                  <Container
                                    minW={650}
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

                          <Flex w={1024}>
                            <Center w={62}>
                              <Switch
                                bg={"gray.500"}
                                borderRadius={10}
                                isChecked={durationsw}
                                onChange={() => setDurationsw(!durationsw)}
                                //เพิ่ม 2 บรรทัดบน ตัวแปรให้ตรงกับที่สร้าง 1 state ต่อ 1 component
                              />
                            </Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      วันที่เริ่มเล่น
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
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
                                      w={650}
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

                          <Flex w={1024}>
                            <Center w={62}>
                              <Switch
                                bg={"gray.500"}
                                borderRadius={10}
                                isChecked={Averagesw}
                                onChange={() => setAveragesw(!Averagesw)}
                              />
                            </Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      ระยะเวลาโดยประมาณ
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Input
                                    bg="white"
                                    m={1.5}
                                    borderRadius={10}
                                    w={480}
                                    h={46}
                                    color={"Black"}
                                    isDisabled={!Averagesw}
                                    defaultValue={averageTime}
                                    onChange={(e) =>
                                      setAvergeTime(e.target.value)
                                    }
                                  />

                                  <Spacer
                                    borderLeftColor={"white"}
                                    borderLeftWidth={3}
                                  />

                                  <Center pl={1.5} pr={1.5}>
                                    <Select
                                      isRequired
                                      h={46}
                                      bg={"white"}
                                      color="black"
                                      size="lg"
                                      isDisabled={!Averagesw}
                                      fontFamily={"Mitr"}
                                      value={averageTimeUnit}
                                      onChange={(e) =>
                                        setAvergeTimeUnit(e.target.value)
                                      }
                                      defaultValue={
                                        averageTimeUnit
                                          ? averageTimeUnit
                                          : "วัน(Day)"
                                      }
                                    >
                                      <option
                                        style={{ backgroundColor: "White" }}
                                        value={"วัน(Day)"}
                                      >
                                        วัน(Day)
                                      </option>
                                      <option
                                        style={{ backgroundColor: "White" }}
                                        value={"เดือน(Month)"}
                                      >
                                        เดือน(Month)
                                      </option>
                                      <option
                                        style={{ backgroundColor: "White" }}
                                        value={"ปี(Year)"}
                                      >
                                        ปี(Year)
                                      </option>
                                    </Select>
                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}>
                              <Switch
                                bg={"gray.500"}
                                borderRadius={10}
                                isChecked={Locationsw}
                                onChange={() => setLocationsw(!Locationsw)}
                              />
                            </Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                  minH={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      สถานที่ภายในคอมมูนิตี้
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Container
                                      minW={650}
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

                          <Flex w={1024}>
                            <Center w={62}>
                              <Switch
                                bg={"gray.500"}
                                borderRadius={10}
                                isChecked={Timelinesw}
                                onChange={() => setTimelinesw(!Timelinesw)}
                              />
                            </Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                  minH={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      ช่วงเวลาภายในคอมมูนิตี้
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Container
                                      minW={650}
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

                          <Flex w={1024}>
                            <Center w={62}>
                              <Switch
                                bg={"gray.500"}
                                borderRadius={10}
                                isChecked={Ratingsw}
                                onChange={() => setRatingsw(!Ratingsw)}
                              />
                            </Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      ระดับของเนื้อหา
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center pl={1.5} pr={1.5}>
                                    <Select
                                      isRequired
                                      w={650}
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

                          <Flex w={1024}>
                            <Center w={62}>
                              <Switch
                                bg={"gray.500"}
                                borderRadius={10}
                                isChecked={Triggersw}
                                onChange={() => setTriggersw(!Triggersw)}
                              />
                            </Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                  minH={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>คำเตือน</Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Container
                                      minW={650}
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

                          <Flex w={1024}>
                            <Center w={62}>
                              <Switch
                                bg={"gray.500"}
                                borderRadius={10}
                                isChecked={Rulesw}
                                onChange={() => setRulesw(!Rulesw)}
                              />
                            </Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                  minH={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      กฎกติกาและข้อตกลง
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Textarea
                                      type="text"
                                      required
                                      w={650}
                                      h={100}
                                      bg={"white"}
                                      className={style.search}
                                      m={1.5}
                                      isDisabled={!Rulesw}
                                      onChange={(e) => setRule(e.target.value)}
                                      value={rule}
                                    />
                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}></Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                  minH={"auto"}
                                >
                                  <Box w={238} p={4} className={style.Topic2}>
                                    <Text float="left">คำอธิบาย</Text>
                                    <Text color={"red"} float="left">
                                      *
                                    </Text>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Textarea
                                      type="text"
                                      required
                                      w={650}
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
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  {/* Registration */}

                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024} color={"#FFFFFF"}>
                      <h2>
                        <AccordionButton>
                          <AccordionIcon color={"Black"} w={50} h={50} />

                          <Box className={style.Accordion} color="Black">
                            Registration
                          </Box>
                        </AccordionButton>
                      </h2>

                      <AccordionPanel>
                        <VStack>
                          {/* <Flex w={1024}>

                            <Center w={62} >
                              <Center
                                red
                                bg={'#EA4545'} 
                                bg={'#72994C'}
                                rounded="50">
                                <Minus size={32}
                                <Plus size={32}
                                />
                              </Center>
                            </Center>

                            <Center>
                              <Flex bg={"#535353"} borderRadius={10} minW={900}>
                                <Box p={2} w={238}>
                                  <Input
                                    className={style.Topic3}
                                    pl={2}
                                    h={58}
                                    placeholder={"Link title"}
                                  />
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center>
                                  <Input
                                    type="text"
                                    required
                                    w={650}
                                    h={58}
                                    bg={"white"}
                                    className={style.search}
                                    m={1.5}
                                  />
                                </Center>
                              </Flex>
                            </Center>
                          </Flex> */}

                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                                minH={"auto"}
                              >
                                <Box w={238} p={4}>
                                  <Box className={style.Topic2}>
                                    ลิงก์ลงทะเบียนตัวละคร
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Input
                                    required
                                    w={650}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"สำหรับลิงก์ฟอร์มวิ่ง"}
                                    className={style.search}
                                    type="url"
                                    value={submitlink}
                                    onChange={(e) => {
                                      setSubmitlink(e.target.value);
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>

                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                                minH={"auto"}
                              >
                                <Box w={238} p={4}>
                                  <Box className={style.Topic2}>
                                    ลิงก์ตรวจสอบตัวละคร
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Input
                                    required
                                    w={650}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"สำหรับตรวจสอบ"}
                                    className={style.search}
                                    type="url"
                                    value={resultlink}
                                    onChange={(e) => {
                                      setResultlink(e.target.value);
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  {/* Other Link */}

                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024} color={"#FFFFFF"}>
                      <h2>
                        <AccordionButton>
                          <AccordionIcon color={"Black"} w={50} h={50} />

                          <Box className={style.Accordion} color="Black">
                            Other Link
                          </Box>
                        </AccordionButton>
                      </h2>

                      <AccordionPanel>
                        <VStack>
                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                                minH={"auto"}
                              >
                                <Box w={238} p={4}>
                                  <Box className={style.Topic2}>
                                    ลิงก์กลุ่มคอมมู
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Input
                                    required
                                    w={650}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"..."}
                                    className={style.search}
                                    type="url"
                                    value={smlink}
                                    onChange={(e) => {
                                      setSmlink(e.target.value);
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>

                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                                minH={"auto"}
                              >
                                <Box w={238} p={4}>
                                  <Box className={style.Topic2}>
                                    ลิงก์ข้อมูลคอมมู
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Input
                                    required
                                    w={650}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"..."}
                                    className={style.search}
                                    type="url"
                                    value={doclink}
                                    onChange={(e) => {
                                      setDoclink(e.target.value);
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>

                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                                minH={"auto"}
                              >
                                <Box w={238} p={4}>
                                  <Box className={style.Topic2}>
                                    ลิงก์ถามคำถาม
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Input
                                    required
                                    w={650}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"สำหรับ Q&A"}
                                    className={style.search}
                                    type="url"
                                    value={qaasklink}
                                    onChange={(e) => {
                                      setQaasklink(e.target.value);
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>

                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                                minH={"auto"}
                              >
                                <Box w={238} p={4}>
                                  <Box className={style.Topic2}>
                                    ลิงก์ตรวจสอบคำตอบ
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Input
                                    required
                                    w={650}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"สำหรับตรวจสอบ Q&A"}
                                    className={style.search}
                                    type="url"
                                    value={qaanslink}
                                    onChange={(e) => {
                                      setQaanslink(e.target.value);
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>

                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                                minH={"auto"}
                              >
                                <Box w={238} p={4}>
                                  <Box className={style.Topic2}>
                                    ช่องทางติดต่อ
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Input
                                    required
                                    w={650}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"ช่องทางติดต่อ"}
                                    className={style.search}
                                    type="url"
                                    value={contactlink}
                                    onChange={(e) => {
                                      setContactlink(e.target.value);
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Spacer h={10} />

                  <Center>
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
                      ยืนยัน
                    </Button>
                  </Center>
                </Box>
              </Center>
            </VStack>
          </Center>

          <Spacer />

          <Box minW={400}></Box>
        </Flex>

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
