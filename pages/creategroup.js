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
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "../components/Banner";
// import CaroselPreview from "../components/caroselPreview";
import { useDropzone } from "react-dropzone";
import { useApp } from "../src/hook/local";
import { UpdateUserGroup } from "../src/services/firestoreservice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import UploadImageModal from "../components/Banner";
import { UploadBannerImage } from "../src/services/filestoreageservice";
import { getBlob } from "firebase/storage";
// import { Blob } from "node:buffer";
import Head from "next/head";
import {
  Box,
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
} from "@chakra-ui/react";
import { 
  CaretLeft, 
  CaretRight, 
  Plus,
  Minus, } from "phosphor-react";
import GroupSidebar from "../components/GroupSidebar";

export default function CreateGroup() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const Router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login");
    }
  }, [user, loading]);

  const getplaceholder = async () => {
    const blob = await getBlob("group/banner/UploadBanner.jpg");
    return blob;
  };

  const [tags, setTags] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [communame, setCommuname] = useState("");
  const [maxplayer, setMaxplayer] = useState("");
  const [regDate, setRegDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [smlink, setSmlink] = useState("");
  const [doclink, setDoclink] = useState("");
  const [qaasklink, setQaasklink] = useState("");
  const [qaanslink, setQaanslink] = useState("");
  const [submitlink, setSubmitlink] = useState("");
  const [resultlink, setResultlink] = useState("");
  const [contactlink, setContactlink] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [bannerBlob, setBannerBlob] = useState("");
  const [durationsw, setDurationsw] = useState(true);

  //ก็อปปี้บรรทัดบนไปวางเพิ่ม หรือเขียนเอง ลักษณะคือ const [state, setState] = useState(true) โดยที่ state คือชื่อตัวแปรที่จะใช้ เช่น durationsw ส่วน setstate คือฟังก์ชั่นที่ไว้ใช้เปลี่ยนค่าตัวแปร

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!bannerBlob) {
      setBannerBlob(
        "https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2Fimageplaceholder.png?alt=media&token=f5f9ea02-1b1d-404c-8fb4-4619892dc474"
      );
    }
    const docRef = await addDoc(collection(db, "group"), {
      Name: communame,
      Creator: auth.currentUser.uid,
      Type: privacy,
      tag: hashtag,
      description: description,
      maxplayer: maxplayer,
      runtime: runtime,
      genre: tags,
      smlink: smlink,
      doclink: doclink,
      qaasklink: qaasklink,
      qaanslink: qaanslink,
      submitlink: submitlink,
      resultlink: resultlink,
      contactlink: contactlink,
      regDate: regDate,
      endDate: endDate,
      banner: bannerBlob,
      createAt: serverTimestamp(),
    });
    setTags([]);
    setCommuname("");
    setMaxplayer("");
    setRegDate("");
    setRuntime("");
    setEndDate("");
    setSmlink("");
    setDescription("");
    setDoclink("");
    setQaasklink("");
    setQaanslink("");
    setSubmitlink("");
    setResultlink("");
    setContactlink("");
    setPrivacy("");
    setBannerBlob("");
    setHashtag("");
    Router.push("/group/" + docRef.id);
  };

  const Hashtag = (props) => {
    const removeTags = (indexToRemove) => {
      setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = (event) => {
      let tag = event.target.value.replace(",", "");
      tag = tag.trim();
      if (tag !== "") {
        setTags([...tags, tag]);
        props.selectedTags([...tags, tag]);
        event.target.value = "";
      }
    };
    return (
      <Box w={680} h={58}>
        <Box>
          <Box id="tags">
            {tags.map((tag, index) => (
              <Box
                key={index} 
                className={style.tag}
                mr={1}
                mt={1}
                p={2}
                mb={1}
                maxW={600}
              >
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
              maxW={650}
              mt={2}
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
    <SSRProvider>
      <Head>
        <link rel="shortcut icon" href="favicon.ico"></link>
        <title>Comuthor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box bg="#FDFDFD">
        <CustomNavbar />
        <Flex>
          <GroupSidebar />

          <Spacer />

          <Center bg={"#D5D5D5"} w={1024}>
            <VStack>
              <Center>
                <Box>
                  <Flex>
                    <Center>
                      <Circle
                        as="button"
                        _hover={{
                          background: "gray",
                        }}
                        m={2}
                      >
                        <CaretLeft size={32} color={"Black"} />
                      </Circle>
                    </Center>
                    <UploadImageModal
                      setBannerBlob={setBannerBlob}
                      BannerBlob={bannerBlob}
                    />
                    <Center>
                      <Circle
                        as="button"
                        _hover={{
                          background: "gray",
                        }}
                        m={2}
                      >
                        <CaretRight size={32} color={"Black"} />
                      </Circle>
                    </Center>
                  </Flex>

                  <Box 
                    bg={"#535353"} 
                    p={2} 
                    borderTopRadius={10}
                    maxW={1024}
                  >
                    <Center className={style.HeadingCreate}>
                      Community Name
                    </Center>

                    <Center className={style.HeadingCreate2}>
                      (ชื่อคอมมูนิตี้)
                    </Center>
                  </Box>

                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024} >
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
                              <Box p={2} w={238}>
                                <Box className={style.Topic} pl={2}>
                                  Community Name
                                </Box>
                                <Box className={style.Topic2} pl={2}>
                                  (ชื่อคอมมูนิตี้)
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
                                  h={58}
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
                                <Box p={2} w={238}>
                                  <Box className={style.Topic} pl={2}>
                                    Short Name
                                  </Box>
                                  <Box className={style.Topic2} pl={2}>
                                    (ชื่อย่อไม่เกิน 4 ตัวอักษร)
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
                                    h={58}
                                    bg={"white"}
                                    placeholder={"..."}
                                    className={style.search}
                                    maxLength={4}
                                  />
                                </Center>
                              </Flex>

                              <Spacer w={50} />

                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"10"}
                              >
                                <Box p={2} w={238}>
                                  <Box className={style.Topic} pl={2}>
                                    Privacy
                                  </Box>
                                  <Box className={style.Topic2} pl={2}>
                                    (ความเป็นส่วนตัว)
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Center
                                    w={260}
                                    h={58}
                                    borderRadius={10}
                                    bg={"white"}
                                  ></Center>
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
                                <Box p={2} w={238}>
                                  <Box className={style.Topic} pl={2}>
                                    Number of Player
                                  </Box>
                                  <Box className={style.Topic2} pl={2}>
                                    (จำนวนผู้เล่น)
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <NumberInput 
                                    w={130}
                                  >
                                    <NumberInputField
                                      bg={'white'}
                                      h={58}
                                      color={'black'}
                                    />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper color='black' />
                                      <NumberDecrementStepper color='black' />
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
                                <Box p={2} w={238}>
                                  <Box className={style.Topic} pl={2}>
                                    Genre
                                  </Box>
                                  <Box className={style.Topic2} pl={2}>
                                    (ประเภท)
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
                                    h={58}
                                    bg={"white"}
                                    color="black"
                                    placeholder="Select Genre"
                                    size="lg"
                                  >
                                    <option>Slow-Life</option>
                                    <option>Vote for kill</option>
                                    <option>Survival</option>
                                    <option>Slow-Survival</option>
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
                                <Box w={238} p={2}>
                                  <Box className={style.Topic} pl={2}>
                                    Category
                                  </Box>
                                  <Box className={style.Topic2} pl={2}>
                                    (หมวดหมู่)
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
                                    minH={58}
                                    bg={"white"}
                                    borderRadius={10}
                                    m={1.5}
                                  >
                                    <Hashtag selectedTags={selectedTags} />
                                  </Container>

                                </Center>
                              </Flex>
                            </Flex>
                          </Center>

                          <Flex w={1024}>
                            
                            <Center w={62}>
                              <Switch 
                                bg={'gray.500'}
                                borderRadius={10}
                                isChecked = {durationsw}
                                onChange = {()=>setDurationsw(!durationsw)}
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
                                  <Box w={238} p={2}>
                                    <Box className={style.Topic} pl={2}>
                                      Duration
                                    </Box>
                                    <Box className={style.Topic2} pl={2}>
                                      (ระยะเวลา)
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center pl={1.5} pr={1.5}>
                                    {/* <Select
                                      isRequired
                                      w={650}
                                      h={58}
                                      bg={"white"}
                                      color="black"
                                      placeholder="22/02/2022 22:22 - 22/02/2222 22:22"
                                      size="lg"
                                    >
                                    </Select> */}
                                    <Input
                                      type="datetime-local"
                                      isDisabled ={!durationsw} //แล้วก็เพิ่มตรงนี้ ชื่อตัวแปรตาม state ที่สร้าง
                                      
                                    />
                                    {/* <Box>
                                      {durationsw? "True":"False"}
                                    </Box> */}
                                  </Center>
                                  
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>
                          

                          <Flex w={1024}>
                            
                            <Center w={62}>
                              <Switch 
                                bg={'gray.500'}
                                borderRadius={10}
                              />
                            </Center>
                            
                            <Center>
                            
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                >
                                  <Box w={238} p={2}>
                                    <Box className={style.Topic} pl={2}>
                                      Average Time
                                    </Box>
                                    <Box className={style.Topic2} pl={2}>
                                      (ระยะเวลาโดยประมาณ)
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center
                                    bg='white'
                                    m={1.5}
                                    borderRadius={10}
                                    w={480}
                                  >
                                  </Center>
                                  
                                  <Spacer
                                    borderLeftColor={"white"}
                                    borderLeftWidth={3}
                                  />

                                  <Center 
                                    pl={1.5} 
                                    pr={1.5}
                                    
                                  >
                                    <Select
                                      isRequired
                                      
                                      h={58}
                                      bg={"white"}
                                      color="black"
                                      size="lg"
                                      
                                    >
                                      <option>วัน(Day)</option>
                                      <option>เดือน(Month)</option>
                                      <option>ปี(Year)</option>
                                    </Select>
                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            
                            <Center w={62}>
                              <Switch 
                                bg={'gray.500'}
                                borderRadius={10}
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
                                  <Box w={238} p={2}>
                                    <Box className={style.Topic} pl={2}>
                                      Location
                                    </Box>
                                    <Box className={style.Topic2} pl={2}>
                                      (สถานที่ภายในคอมมูนิตี้)
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
                                      minH={58}
                                      bg={"white"}
                                      borderRadius={10}
                                      m={1.5}
                                    >
                                      <Hashtag selectedTags={selectedTags} />
                                    </Container>

                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            
                            <Center w={62}>
                              <Switch 
                                bg={'gray.500'}
                                borderRadius={10}
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
                                  <Box w={238} p={2}>
                                    <Box className={style.Topic} pl={2}>
                                      Timeline
                                    </Box>
                                    <Box className={style.Topic2} pl={2}>
                                      (ช่วงเวลาภายในคอมมูนิตี้)
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
                                      minH={58}
                                      bg={"white"}
                                      borderRadius={10}
                                      m={1.5}
                                    >
                                      <Hashtag selectedTags={selectedTags} />
                                    </Container>

                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            
                            <Center w={62}>
                              <Switch 
                                bg={'gray.500'}
                                borderRadius={10}
                              />
                            </Center>
                            
                            <Center>
                            
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                >
                                  <Box w={238} p={2}>
                                    <Box className={style.Topic} pl={2}>
                                      Rating
                                    </Box>
                                    <Box className={style.Topic2} pl={2}>
                                      (ระดับของเนื้อหา)
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
                                      h={58}
                                      bg={"white"}
                                      color="black"
                                      size="lg"
                                    >
                                      <option>G (เหมาะสำหรับทุกวัย)</option>
                                      <option>R-13 (เหมาะสำหรับอายุ ๑๓ ปีขึ้นไป)</option>
                                      <option>R-18 (เหมาะสำหรับอายุ ๑๘ ปีขึ้นไป)</option>
                                      <option>NC-21 (ไม่เหมาะสำหรับเยาวชน)</option>
                                    </Select>
                                  </Center>
                                  
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>
                          
                          <Flex w={1024}>
                            
                            <Center w={62}>
                              <Switch 
                                bg={'gray.500'}
                                borderRadius={10}
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
                                  <Box w={238} p={2}>
                                    <Box className={style.Topic} pl={2}>
                                      Trigger Warning
                                    </Box>
                                    <Box className={style.Topic2} pl={2}>
                                      (คำเตือน)
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
                                      minH={58}
                                      bg={"white"}
                                      borderRadius={10}
                                      m={1.5}
                                    >
                                      <Hashtag selectedTags={selectedTags} />
                                    </Container>

                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            
                            <Center w={62}>
                              <Switch 
                                bg={'gray.500'}
                                borderRadius={10}
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
                                  <Box w={238} pt={4} pl={2}>
                                    <Box className={style.Topic} pl={2}>
                                      Rule & Agreeent
                                    </Box>
                                    <Box className={style.Topic2} pl={2}>
                                      (กฎกติกาและข้อตกลง)
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
                                    />
                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            
                            <Center w={62}>
                              
                            </Center>
                            
                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                  minH={"auto"}
                                >
                                  <Box w={238} pt={4} pl={2}>
                                    <Box className={style.Topic} pl={2}>
                                      Discription
                                    </Box>
                                    <Box className={style.Topic2} pl={2}>
                                      (คำอธิบาย)
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


{/* Other Link */}


                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024} >
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
                          
                          <Flex w={1024}>
                            
                            <Center w={62} >
                              <Center 
                                // red
                                // bg={'#EA4545'} 
                                bg={'#72994C'}
                                rounded="50">
                                {/* <Minus size={32} */}
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
                          </Flex>

                          

                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  {/* Registration */}

                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024} >
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
                          
                          <Flex w={1024}>
                            
                            <Center w={62} >
                              <Center 
                                // red
                                // bg={'#EA4545'} 
                                bg={'#72994C'}
                                rounded="50">
                                {/* <Minus size={32} */}
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
                          </Flex>

                          

                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Row>
                    <Col md={6}>
                      <input
                        type="radio"
                        value="Private"
                        name="Privacy"
                        onChange={(e) => {
                          setPrivacy(e.target.value);
                        }}
                      >
                      </input>

                      <label>
                        <h6 className={style.radio}>ส่วนตัว</h6>
                      </label>


                      <input
                        type="radio"
                        value="Public"
                        name="Privacy"
                        onChange={(e) => {
                          setPrivacy(e.target.value);
                        }}
                        checked
                      ></input>
                      <label>
                        <h6 className={style.radio}>สาธารณะ</h6>
                      </label>
                    </Col>
                  </Row>

                  <Row md={12}>
                    <label>
                      <h4 className={style.label}>ลิงก์กลุ่มคอมมู</h4>
                    </label>
                    <input
                      className={style.setDescription}
                      type="url"
                      value={smlink}
                      onChange={(e) => {
                        setSmlink(e.target.value);
                      }}
                    ></input>
                  </Row>

                  <Row md={12}>
                    <label>
                      <h4 className={style.label}>ลิงก์ด็อคคอมมู</h4>
                    </label>
                    <input
                      className={style.setDescription}
                      type="url"
                      value={doclink}
                      onChange={(e) => {
                        setDoclink(e.target.value);
                      }}
                    ></input>
                  </Row>
                  <Row md={12}>
                    <label>
                      <h4 className={style.label}>ลิงค์ถามคำถาม</h4>
                    </label>
                    <input
                      className={style.setDescription}
                      type="url"
                      value={qaasklink}
                      onChange={(e) => {
                        setQaasklink(e.target.value);
                      }}
                    ></input>
                  </Row>
                  <Row md={12}>
                    <label>
                      <h4 className={style.label}>ลิงก์ตอบคำถาม</h4>
                    </label>
                    <input
                      className={style.setDescription}
                      type="url"
                      value={qaanslink}
                      onChange={(e) => {
                        setQaanslink(e.target.value);
                      }}
                    ></input>
                  </Row>
                  <Row md={12}>
                    <label>
                      <h4 className={style.label}>ลิงก์ลงทะเบียนตัวละคร</h4>
                    </label>
                    <input
                      className={style.setDescription}
                      type="url"
                      value={submitlink}
                      onChange={(e) => {
                        setSubmitlink(e.target.value);
                      }}
                    ></input>
                  </Row>
                  <Row md={12}>
                    <label>
                      <h4 className={style.label}>ลิงก์ตรวจสอบผลการสมัคร</h4>
                    </label>
                    <input
                      className={style.setDescription}
                      type="url"
                      value={resultlink}
                      onChange={(e) => {
                        setResultlink(e.target.value);
                      }}
                    ></input>
                  </Row>
                  <Row md={12}>
                    <label>
                      <h4 className={style.label}>ช่องทางติดต่อ</h4>
                    </label>
                    <input
                      className={style.setDescription}
                      type="url"
                      value={contactlink}
                      onChange={(e) => {
                        setContactlink(e.target.value);
                      }}
                      required
                    ></input>
                  </Row>

                  <button className={style.button} onClick={HandleSubmit}>
                    สร้างคอมมู
                  </button>
                </Box>
              </Center>
            </VStack>
          </Center>

          <Spacer />

          <Box minW={400} bg={"gray.300"}></Box>
        </Flex>
      </Box>
    </SSRProvider>
  );
}
