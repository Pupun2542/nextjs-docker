import React, { useState, useEffect, useRef } from "react";
import CustomNavbar from "../../../components/navbar";
import "../../../styles/creategroup.module.css";
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
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import GroupSidebar from "../../../components/GroupSidebar";
import { useApp, useUser } from "../../../src/hook/local";
import { UpdateUserPinGroup } from "../../../src/services/firestoreservice";
import style from "../../../styles/groupdetail.module.css";
import Head from "next/head";
import {
  Box,
  Center,
  Flex,
  VStack,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AspectRatio,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Container,
  Wrap,
  WrapItem,
  HStack,
} from "@chakra-ui/react";
import Footer from "../../../components/footer";
import {
  Heart,
  PushPin,
  CalendarBlank,
  DotsThreeVertical,
} from "phosphor-react";
import { Comments } from "../../../components/comments";
import axios from "axios";
import { Commentsection } from "../../../components/groupcomponents/previewcommentsection";

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;
//   const res = await fetch(`${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}`);
//   let data = await res.json();
//   let color = "";
//   if (data.rating === "NC-21 (ไม่เหมาะสำหรับเยาวชน)") {
//     color = "#EA4545";
//     // console.log(d.data().rating);
//   } else if (data.rating === "R-18 (เหมาะสำหรับอายุ 18 ปีขึ้นไป)") {
//     color = "#FF912B";
//     // console.log(d.data().rating);
//   } else if (data.rating === "R-13 (เหมาะสำหรับอายุ 13 ปีขึ้นไป)") {
//     color = "#FBBC43";
//     // console.log(d.data().rating);
//   } else {
//     color = "#72994C";
//     // console.log(d.data().rating);
//   }
//   data = {...data, color:color};
//   return { props: { data } };
// }

export default function Group() {
  //{ data }
  const [data, setData] = useState(undefined);
  const { app, auth, db } = useApp();
  const Router = useRouter();
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();
  const [pin, setPin] = useState(false);
  const [text, setText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, loading] = useAuthState(auth);
  const [color, setColor] = useState("");
  // const color = data.color;
  // const [loading, setLoading] = useState(false);
  const getUser = useUser();
  const buttonRef = useRef(null);

  const { id } = Router.query;
  /* CSR */
  useEffect(() => {
    const Fetchdata = async () => {
      // console.log(auth.currentUser)
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      let data = res.data;
      let color = "";
      if (data.rating === "NC-21 (ไม่เหมาะสำหรับเยาวชน)") {
        color = "#EA4545";
        // console.log(d.data().rating);
      } else if (data.rating === "R-18 (เหมาะสำหรับอายุ 18 ปีขึ้นไป)") {
        color = "#FF912B";
        // console.log(d.data().rating);
      } else if (data.rating === "R-13 (เหมาะสำหรับอายุ 13 ปีขึ้นไป)") {
        color = "#FBBC43";
        // console.log(d.data().rating);
      } else {
        color = "#72994C";
        // console.log(d.data().rating);
      }
      // data = { ...data, color: color };
      setColor(color);
      setData(data);
    };
    if (id && id != "undefined" && !loading) {
      Fetchdata();
    }
  }, [id, loading]);
  /* CSR */
  useEffect(() => {
    if (user) {
      getDoc(doc(db, "userDetail", user.uid, "pinnedGroup", id)).then(
        (snap) => {
          if (snap.exists()) {
            setPin(true);
          }
        }
      );
    }
  }, [user]);

  const pinHandler = () => {
    if (user) {
      if (pin) {
        deleteDoc(doc(db, "userDetail", user.uid, "pinnedGroup", id)).then(
          () => {
            setPin(false);
          }
        );
      } else {
        setDoc(doc(db, "userDetail", user.uid, "pinnedGroup", id), {
          name: data.name,
          tag: data.tag,
          id: id,
        }).then(() => {
          setPin(true);
        });
      }
    }
    // console.log("handledpin")
  };

  const removehandler = () => {
    // console.log("remove");
    if (user && user.uid == data.creator.uid) {
      onDelOpen();
    }
  };
  const confirmRemove = () => {
    if (text == data.tag) {
      deleteDoc(doc(db, "group", id));
      Router.push("/group");
    } else {
      // console.log(text, data.tag);
      alert("กรุณากรอกข้อมูลอีกครั้ง");
    }
  };

  const outsidenavigate = (url) => {
    if (url.startsWith("https://")) {
      window.op = url;
    } else if (url.startsWith("http://")) {
      location = url;
    } else {
      location = "https://" + url;
    }
  };

  const HandleLove = async () => {
    if (user) {
      const token = await user.getIdToken();
      if (data.love === undefined || !data.love.includes(user.uid)) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}/love`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setData({ ...data, love: [...data.love, user.uid] });
        }
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}/unlove`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(res);
        if (res.status === 200) {
          console.log(data.love.filter((v, i) => v !== user.uid));
          setData({
            ...data,
            love: data.love.filter((v, i) => v !== user.uid),
          });
        }
      }
    }
  };

  const handleDebugJoin = async () => {
    if (Object.keys(data.member).includes(user.uid)) {
      Router.push(`/group/${id}/dashboard`);
    } else {
      const token = await user.getIdToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/debug/group/${id}/join`,
        {
          id: user.uid,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      Router.push(`/group/${id}/dashboard`);
    }
  };

  return (
    <Box>
      <Box bg={"#FFFFFF"}>
        <CustomNavbar />
        {!loading && data && (
          <Flex>
            {/* {console.log(data)} */}
            <Box w={400} minH={1000} bg={"#F3F3F3"}></Box>
            <Spacer bg={"#F3F3F3"} />

            <Box marginTop={55}>
              <VStack spacing={0}>
                <Flex w={1000} bg={"#FDFDFD"}>
                  <Spacer />
                  <Box bg={"#FFFFFF"} w={850} boxShadow="base">
                    <Flex h={62} bg={"#6768AB"}>
                      <IconButton
                        bg={"white"}
                        rounded="full"
                        h={38}
                        w={38}
                        mt={2.5}
                        ml={2.5}
                        icon={
                          <Heart
                            size={32}
                            weight={
                              data.love?.includes(auth.currentUser.uid)
                                ? "fill"
                                : "regular"
                            }
                            color={
                              data.love?.includes(auth.currentUser.uid)
                                ? "red"
                                : "black"
                            }
                          />
                        }
                        isDisabled={!user}
                        onClick={HandleLove}
                      />

                      <IconButton
                        bg={pin ? "yellow" : "white"}
                        rounded="full"
                        h={38}
                        w={38}
                        mt={2.5}
                        ml={2.5}
                        icon={<PushPin size={32} />}
                        onClick={pinHandler}
                      />

                      <Spacer />

                      <IconButton
                        bg={"white"}
                        rounded="full"
                        h={38}
                        w={38}
                        mt={2.5}
                        mr={2.5}
                        icon={<CalendarBlank size={32} />}
                        isDisabled
                      />
                      {console.log(data)}
                      {user && Object.keys(data.creator).includes(user.uid) && (
                        <Box>
                          <Menu>
                            <MenuButton
                              bg={"white"}
                              rounded="full"
                              h={38}
                              w={38}
                              mt={2.5}
                              mr={2.5}
                              icon={<DotsThreeVertical size={32} />}
                              as={IconButton}
                            />

                            <MenuList minW={20} fontFamily={"Mitr"}>
                              <MenuItem
                                _hover={{ background: "#E2E8F0" }}
                                onClick={
                                  () => Router.push("/group/" + id + "/edit")
                                  // console.log("edit")
                                }
                              >
                                <Text>Edit</Text>
                              </MenuItem>
                              <MenuItem
                                _hover={{ background: "#E2E8F0" }}
                                onClick={onDelOpen}
                              >
                                <Text>Delete</Text>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Box>
                      )}
                    </Flex>
                  </Box>
                  <Spacer />
                </Flex>

                <img src={data.banner} height={478} width={850}></img>

                <Center
                  h={62}
                  bg={"#6768AB"}
                  w={850}
                  fontFamily="Mitr"
                  color={"white"}
                  fontSize={22}
                >
                  {data.tag ? data.tag : "ชื่อย่อคอมมู"} |{" "}
                  {data.name ? data.name : "ชื่อคอมมู"}
                </Center>

                <Tabs isFitted w={850}>
                  <TabList fontFamily={"Mitr"}>
                    <Tab>Detail</Tab>
                    <Tab>Document</Tab>
                    <Tab>Staff List</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Flex bg={"#F3F3F3"} shadow={"base"}>
                        <Accordion
                          w={850}
                          fontFamily={"Mitr"}
                          defaultIndex={[0]}
                          allowMultiple
                        >
                          <AccordionItem>
                            <h2>
                              <AccordionButton>
                                <AccordionIcon mr={5} />
                                <Box fontSize={25} flex="1" textAlign="left">
                                  Basic Information
                                </Box>
                              </AccordionButton>
                            </h2>
                            <AccordionPanel spacing={0}>
                              <VStack>
                                <Flex ml={10} w={750}>
                                  <Center
                                    borderRadius={10}
                                    bg={"#6768AB"}
                                    w={350}
                                    h={70}
                                    p={5}
                                    color={"white"}
                                    shadow={"base"}
                                  >
                                    {data.privacy ? (
                                      data.privacy === "สาธารณะ" ? (
                                        <Flex
                                          flexDir={"column"}
                                          justifyContent="center"
                                        >
                                          <Text
                                            flex={1}
                                            textAlign="center"
                                            fontSize={20}
                                          >
                                            Public
                                          </Text>
                                          <Text
                                            flex={1}
                                            textAlign="center"
                                            fontSize={12}
                                          >
                                            ทุกคนสามารถเข้าร่วมและเห็นการเคลื่อนไหวภายในกลุ่มได้
                                          </Text>
                                        </Flex>
                                      ) : (
                                        <Flex
                                          flexDir="column"
                                          justifyContent="center"
                                        >
                                          <Text
                                            flex={1}
                                            textAlign="center"
                                            fontSize={20}
                                          >
                                            Private
                                          </Text>
                                          <Text
                                            flex={1}
                                            textAlign="center"
                                            fontSize={12}
                                          >
                                            คนเฉพาะกลุ่มเท่านั้นที่สามารถเข้าร่วมภายในกลุ่มได้
                                          </Text>
                                        </Flex>
                                      )
                                    ) : (
                                      <Flex
                                        flexDir={"column"}
                                        justifyContent="center"
                                      >
                                        <Text
                                          flex={1}
                                          textAlign="center"
                                          fontSize={20}
                                        >
                                          Public
                                        </Text>
                                        <Text
                                          flex={1}
                                          textAlign="center"
                                          fontSize={12}
                                        >
                                          ทุกคนสามารถเข้าร่วมและเห็นการเคลื่อนไหวภายในกลุ่มได้
                                        </Text>
                                      </Flex>
                                    )}
                                  </Center>
                                  <Spacer />
                                  {/* <Center
                                    shadow={"base"}
                                    borderRadius={10}
                                    bg={color}
                                    h={63}
                                    w={350}
                                    p={5}
                                  >
                                    {data.rating?data.rating:"G (เหมาะสำหรับทุกวัย)"}
                                  </Center> */}
                                </Flex>

                                <Flex ml={0} w={750}>
                                  <Box
                                    bg={"white"}
                                    w={200}
                                    h={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderRightColor={"gray.400"}
                                    borderRightWidth={3}
                                    borderLeftRadius={10}
                                  >
                                    จำนวนผู้เล่น
                                  </Box>
                                  <Box
                                    bg={"white"}
                                    w={170}
                                    h={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderRightRadius={10}
                                  >
                                    {data.maxplayer
                                      ? data.maxplayer
                                      : "ไม่จำกัดจำนวนรับ"}
                                  </Box>
                                  <Spacer />
                                  <Box
                                    bg={"white"}
                                    w={200}
                                    h={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderRightColor={"gray.400"}
                                    borderRightWidth={3}
                                    borderLeftRadius={10}
                                  >
                                    ประเภท
                                  </Box>
                                  <Box
                                    bg={"white"}
                                    w={170}
                                    h={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderRightRadius={10}
                                  >
                                    {data.type ? data.type : "Slow-Life"}
                                  </Box>
                                </Flex>

                                <Flex ml={10} w={750}>
                                  <Box
                                    bg={"white"}
                                    w={200}
                                    h={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderLeftRadius={10}
                                    borderRightColor={"gray.400"}
                                    borderRightWidth={3}
                                  >
                                    หมวดหมู่
                                  </Box>
                                  <Box
                                    bg={"white"}
                                    w={550}
                                    minH={63}
                                    pt={3}
                                    pl={1}
                                    pb={2}
                                    pr={1}
                                    // h={'auto'}
                                    shadow={"base"}
                                    borderRightRadius={10}
                                  >
                                    {/* {console.log(data.genre)} */}
                                    {data.times && data.genre.length > 0
                                      ? data.genre.map((genre, index) => (
                                          <Box
                                            key={index}
                                            marginLeft={2.5}
                                            maxW={600}
                                            float={"left"}
                                            bg={"#6768AB"}
                                            p={2}
                                            color={"white"}
                                            borderRadius={"10"}
                                          >
                                            {genre}
                                          </Box>
                                        ))
                                      : "ไม่มีหมวดหมู่"}
                                  </Box>
                                </Flex>

                                <Flex ml={10} w={750}>
                                  <Box
                                    bg={"white"}
                                    w={200}
                                    h={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderLeftRadius={10}
                                    borderRightColor={"gray.400"}
                                    borderRightWidth={3}
                                  >
                                    สถานที่ภายในคอมมูนิตี้
                                  </Box>
                                  <Box
                                    bg={"white"}
                                    w={550}
                                    minH={63}
                                    pt={5}
                                    pl={3}
                                    shadow={"base"}
                                    borderRightRadius={10}
                                  >
                                    {data.times && data.place.length > 0
                                      ? data.place.map((genre, index) => (
                                          <Box
                                            key={index}
                                            className={style.tag}
                                            marginLeft={2.5}
                                            maxW={600}
                                            float={"left"}
                                          >
                                            {genre}
                                          </Box>
                                        ))
                                      : "ไม่มีหมวดหมู่"}
                                  </Box>
                                </Flex>

                                <Flex ml={10} w={750}>
                                  <Box
                                    bg={"white"}
                                    w={200}
                                    h={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderLeftRadius={10}
                                    borderRightColor={"gray.400"}
                                    borderRightWidth={3}
                                  >
                                    ยุคสมัยของคอมมูนิตี้
                                  </Box>
                                  <Box
                                    bg={"white"}
                                    w={550}
                                    minH={63}
                                    pt={5}
                                    pl={3}
                                    shadow={"base"}
                                    borderRightRadius={10}
                                  >
                                    {/* {console.log(data.genre)} */}
                                    {data.times && data.times.length > 0
                                      ? data.times.map((genre, index) => (
                                          <Box
                                            key={index}
                                            className={style.tag}
                                            marginLeft={2.5}
                                            maxW={600}
                                            float={"left"}
                                          >
                                            {genre}
                                          </Box>
                                        ))
                                      : "ไม่มีหมวดหมู่"}
                                  </Box>
                                </Flex>

                                <Flex ml={10} w={750}>
                                  <Box
                                    bg={"white"}
                                    w={200}
                                    h={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderLeftRadius={10}
                                    borderRightColor={"gray.400"}
                                    borderRightWidth={3}
                                  >
                                    คำเตือน
                                  </Box>
                                  <Box
                                    bg={"white"}
                                    w={550}
                                    h={63}
                                    pt={2}
                                    pl={5}
                                    shadow={"base"}
                                    borderRightRadius={10}
                                  >
                                    {data.tws
                                      ? data.tws.length > 0
                                        ? data.tws.map((tw, index) => (
                                            <Box
                                              bg={"#6768AB"}
                                              p={2}
                                              borderRadius={10}
                                              color={"white"}
                                              m={1}
                                              key={index}
                                              float="left"
                                            >
                                              {tw}
                                            </Box>
                                          ))
                                        : "ไม่มีคำเตือน"
                                      : "ไม่มีคำเตือน"}
                                  </Box>
                                </Flex>

                                <Flex ml={10} w={750}>
                                  <Flex>
                                    <Box
                                      bg={"white"}
                                      w={200}
                                      h={63}
                                      pt={5}
                                      pl={5}
                                      shadow={"base"}
                                      borderLeftRadius={10}
                                      borderRightColor={"gray.400"}
                                      borderRightWidth={3}
                                    >
                                      วันที่เริ่มเล่น
                                    </Box>
                                    <Box
                                      bg={"white"}
                                      w={170}
                                      h={63}
                                      pt={5}
                                      pl={5}
                                      shadow={"base"}
                                      borderRightRadius={10}
                                    >
                                      {data.startDate
                                        ? data.startDate
                                        : "ยังไม่ได้ลงวันเริ่มเล่น"}
                                    </Box>
                                  </Flex>

                                  <Spacer />

                                  <Flex>
                                    <Box
                                      bg={"white"}
                                      w={200}
                                      h={63}
                                      pt={5}
                                      pl={5}
                                      shadow={"base"}
                                      borderLeftRadius={10}
                                      borderRightColor={"gray.400"}
                                      borderRightWidth={3}
                                    >
                                      ระยะเวลาโดยประมาณ
                                    </Box>
                                    <Box
                                      bg={"white"}
                                      w={170}
                                      h={63}
                                      pt={5}
                                      pl={5}
                                      shadow={"base"}
                                      borderRightRadius={10}
                                    >
                                      {data.averageTime
                                        ? data.averageTime +
                                          " " +
                                          data.averageTimeUnit
                                        : "ไม่มีระยะเวลาโดยประมาณ"}
                                    </Box>
                                  </Flex>
                                </Flex>

                                <Flex ml={10} w={750}>
                                  <Box
                                    bg={"white"}
                                    w={200}
                                    minH={63}
                                    pt={5}
                                    pl={5}
                                    shadow={"base"}
                                    borderLeftRadius={10}
                                    borderRightColor={"gray.400"}
                                    borderRightWidth={3}
                                  >
                                    คำอธิบาย
                                  </Box>
                                  <Container
                                    bg={"white"}
                                    w={550}
                                    minH={63}
                                    p={5}
                                    shadow={"base"}
                                    borderRightRadius={10}
                                    whiteSpace="pre-line"
                                  >
                                    {data.description}
                                  </Container>
                                </Flex>

                                <Flex ml={10} w={750}>
                                  <Center
                                    borderRadius={10}
                                    bg={"#FBBC43"}
                                    w={"49.5%"}
                                    h={63}
                                    p={5}
                                    as={"button"}
                                    onClick={onOpen}
                                    shadow={"base"}
                                  >
                                    กฎกติกาและข้อตกลง
                                  </Center>

                                  <Spacer />

                                  <Center
                                    shadow={"base"}
                                    borderRadius={10}
                                    bg={color}
                                    w={"49.5%"}
                                    h={63}
                                    p={5}
                                    color={"white"}
                                  >
                                    {data.rating
                                      ? data.rating
                                      : "G (เหมาะสำหรับทุกวัย)"}
                                  </Center>
                                </Flex>

                                <Modal
                                  onClose={onClose}
                                  isOpen={isOpen}
                                  isCentered
                                >
                                  <ModalOverlay />
                                  <ModalContent fontFamily={"Mitr"}>
                                    <ModalHeader>Rule&Agreement</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                      <Container whiteSpace="pre-line">
                                        {data.rule
                                          ? data.rule
                                          : "ไม่มีกฎและข้อตกลง"}
                                      </Container>
                                    </ModalBody>
                                  </ModalContent>
                                </Modal>

                                <Center
                                  bg={"#303030"}
                                  shadow={"base"}
                                  color={"#FFC75A"}
                                  h={63}
                                  w={750}
                                  borderRadius={10}
                                  borderColor={"black"}
                                  borderWidth={2}
                                  fontSize={18}
                                  onClick={
                                    // data.smlink
                                    //   ? () => outsidenavigate(data.smlink)
                                    //   : () => alert("ไม่มีลิงก์กลุ่ม")
                                    () => {
                                      handleDebugJoin();
                                    }
                                  }
                                  cursor="pointer"
                                >
                                  เข้าร่วมกลุ่ม
                                </Center>
                              </VStack>
                            </AccordionPanel>
                          </AccordionItem>

                          <AccordionItem>
                            <h2>
                              <AccordionButton>
                                <AccordionIcon mr={5} />
                                <Box fontSize={25} flex="1" textAlign="left">
                                  Registration
                                </Box>
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              {data.registrationlink?.map((link) => (
                                <VStack>
                                  <Flex w={"100%"}>
                                    <Center w={50}></Center>
                                    <Flex
                                      w={"100%"}
                                      bg={"white"}
                                      boxShadow={"base"}
                                      borderRadius={10}
                                    >
                                      <Box
                                        p={4}
                                        minW={180}
                                        borderRightColor={"#C4C4C4"}
                                        borderRightWidth={3}
                                      >
                                        <Box>
                                          <Text float="left">
                                            หัวข้อการรับสมัคร
                                          </Text>
                                        </Box>
                                      </Box>

                                      <Center
                                        w={"100%"}
                                        pl={1.5}
                                        pr={1.5}
                                        position="relative"
                                      >
                                        {link.name}
                                      </Center>
                                    </Flex>
                                    <Center w={50}></Center>
                                  </Flex>

                                  <Flex w={"100%"}>
                                    <Center w={50}></Center>
                                    <VStack w={50} spacing={0}>
                                      <Box
                                        mt={2.5}
                                        h={5}
                                        w={3.5}
                                        borderLeftWidth={3}
                                        borderLeftColor="gray.400"
                                      ></Box>
                                      <Box
                                        borderBottomLeftRadius={10}
                                        borderLeftWidth={3}
                                        borderBottomWidth={3}
                                        borderColor="gray.400"
                                        h={2}
                                        w={3.5}
                                      ></Box>
                                    </VStack>
                                    <Flex
                                      w={"100%"}
                                      bg={"white"}
                                      boxShadow={"base"}
                                      borderRadius={10}
                                    >
                                      <Center></Center>

                                      <Box
                                        p={4}
                                        minW={180}
                                        borderRightColor={"#C4C4C4"}
                                        borderRightWidth={3}
                                      >
                                        <Box>
                                          <Text float="left">
                                            วันที่และเวลา
                                          </Text>
                                        </Box>
                                      </Box>
                                      <Center
                                        w={"100%"}
                                        pl={1.5}
                                        pr={1.5}
                                        position="relative"
                                      >
                                        {link.fromdate} ถึง {link.todate}
                                      </Center>
                                    </Flex>
                                    <Center w={50}></Center>
                                  </Flex>

                                  <Flex w={"100%"}>
                                    <Center w={50}></Center>
                                    <VStack w={50} spacing={0}>
                                      <Box
                                        mt={2.5}
                                        h={5}
                                        w={3.5}
                                        borderLeftWidth={3}
                                        borderLeftColor="gray.400"
                                      ></Box>
                                      <Box
                                        borderBottomLeftRadius={10}
                                        borderLeftWidth={3}
                                        borderBottomWidth={3}
                                        borderColor="gray.400"
                                        h={2}
                                        w={3.5}
                                      ></Box>
                                    </VStack>
                                    <Flex
                                      w={"100%"}
                                      bg={"white"}
                                      boxShadow={"base"}
                                      borderRadius={10}
                                    >
                                      <Center></Center>

                                      <Box
                                        p={4}
                                        minW={180}
                                        borderRightColor={"#C4C4C4"}
                                        borderRightWidth={3}
                                      >
                                        <Box>
                                          <Text float="left">ลิงก์</Text>
                                        </Box>
                                      </Box>

                                      <Center
                                        w={"100%"}
                                        pl={1.5}
                                        pr={1.5}
                                        position="relative"
                                      >
                                        {link.link}
                                      </Center>
                                    </Flex>
                                    <Center w={50}></Center>
                                  </Flex>
                                </VStack>
                              ))}
                            </AccordionPanel>
                            <AccordionPanel pb={4}>
                              {data.statuschecklink?.map((link) => (
                                <VStack>
                                  <Flex w={"100%"}>
                                    <Center w={50}></Center>
                                    <Flex
                                      w={"100%"}
                                      bg={"white"}
                                      boxShadow={"base"}
                                      borderRadius={10}
                                    >
                                      <Box
                                        p={4}
                                        minW={180}
                                        borderRightColor={"#C4C4C4"}
                                        borderRightWidth={3}
                                      >
                                        <Box>
                                          <Text float="left">
                                            หัวข้อการรับสมัคร
                                          </Text>
                                        </Box>
                                      </Box>

                                      <Center
                                        w={"100%"}
                                        pl={1.5}
                                        pr={1.5}
                                        position="relative"
                                      >
                                        {link.name}
                                      </Center>
                                    </Flex>
                                    <Center w={50}></Center>
                                  </Flex>

                                  <Flex w={"100%"}>
                                    <Center w={50}></Center>
                                    <VStack w={50} spacing={0}>
                                      <Box
                                        mt={2.5}
                                        h={5}
                                        w={3.5}
                                        borderLeftWidth={3}
                                        borderLeftColor="gray.400"
                                      ></Box>
                                      <Box
                                        borderBottomLeftRadius={10}
                                        borderLeftWidth={3}
                                        borderBottomWidth={3}
                                        borderColor="gray.400"
                                        h={2}
                                        w={3.5}
                                      ></Box>
                                    </VStack>
                                    <Flex
                                      w={"100%"}
                                      bg={"white"}
                                      boxShadow={"base"}
                                      borderRadius={10}
                                    >
                                      <Center></Center>

                                      <Box
                                        p={4}
                                        minW={180}
                                        borderRightColor={"#C4C4C4"}
                                        borderRightWidth={3}
                                      >
                                        <Box>
                                          <Text float="left">
                                            วันที่และเวลา
                                          </Text>
                                        </Box>
                                      </Box>
                                      <Center
                                        w={"100%"}
                                        pl={1.5}
                                        pr={1.5}
                                        position="relative"
                                      >
                                        {link.fromdate} ถึง {link.todate}
                                      </Center>
                                    </Flex>
                                    <Center w={50}></Center>
                                  </Flex>

                                  <Flex w={"100%"}>
                                    <Center w={50}></Center>
                                    <VStack w={50} spacing={0}>
                                      <Box
                                        mt={2.5}
                                        h={5}
                                        w={3.5}
                                        borderLeftWidth={3}
                                        borderLeftColor="gray.400"
                                      ></Box>
                                      <Box
                                        borderBottomLeftRadius={10}
                                        borderLeftWidth={3}
                                        borderBottomWidth={3}
                                        borderColor="gray.400"
                                        h={2}
                                        w={3.5}
                                      ></Box>
                                    </VStack>
                                    <Flex
                                      w={"100%"}
                                      bg={"white"}
                                      boxShadow={"base"}
                                      borderRadius={10}
                                    >
                                      <Center></Center>

                                      <Box
                                        p={4}
                                        minW={180}
                                        borderRightColor={"#C4C4C4"}
                                        borderRightWidth={3}
                                      >
                                        <Box>
                                          <Text float="left">ลิงก์</Text>
                                        </Box>
                                      </Box>

                                      <Center
                                        w={"100%"}
                                        pl={1.5}
                                        pr={1.5}
                                        position="relative"
                                      >
                                        {link.link}
                                      </Center>
                                    </Flex>
                                    <Center w={50}></Center>
                                  </Flex>
                                </VStack>
                              ))}
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </Flex>
                    </TabPanel>

                    <TabPanel
                      overflowY={"auto"}
                      // maxH={'960'}
                      css={{
                        "&::-webkit-scrollbar": {
                          width: "8px",
                          height: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                          width: "8px",
                          height: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#727272",
                          borderRadius: "24px",
                        },
                      }}
                    >
                      <Container
                        ml={-4}
                        // w={850}
                        // h={500}
                      >
                        {data.doclink && (
                          <Box
                            position={"static"}
                            as="iframe"
                            src={data.doclink + "#toolbar=0"}
                            alt="demo"
                            w={900}
                            h={1000}
                            overflowY={"auto"}
                            css={{
                              "&::-webkit-scrollbar": {
                                width: "8px",
                                height: "8px",
                              },
                              "&::-webkit-scrollbar-track": {
                                width: "8px",
                                height: "8px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                background: "#727272",
                                borderRadius: "24px",
                              },
                            }}
                            // maxH={"75%"}
                            // maxW={"70%"}
                          />
                        )}
                        {/* <Box
                          as="iframe"
                          src={data.doclink}
                          w="850"
                          h="100%"
                        ></Box> */}
                      </Container>
                    </TabPanel>

                    <TabPanel>
                      <Center
                        w={"100%"}
                        p={3}
                        color={"white"}
                        bg={"#6768AB"}
                        fontFamily={"Mitr"}
                        fontSize={"xl"}
                        mb={5}
                      >
                        รายชื่อผู้สร้าง
                        <Center pl={1}>[0]</Center>
                      </Center>
                      <Wrap fontFamily={"Mitr"}>
                        <WrapItem>
                          <Center
                            w="180px"
                            h="180px"
                            bg="gray.100"
                            boxShadow={"base"}
                            rounded={10}
                          >
                            <VStack spacing={0}>
                              <Center
                                rounded={"full"}
                                bg={"crimson"}
                                w={75}
                                h={75}
                                mb={1}
                                color={"white"}
                              >
                                A
                              </Center>
                              <Center
                                bg={"#6768AB"}
                                w={120}
                                color={"white"}
                                p={1}
                                borderTopRadius={10}
                                mt={1}
                              >
                                A ant
                              </Center>
                              <Center
                                bg={"White"}
                                w={120}
                                borderBottomRadius={10}
                                p={1}
                              >
                                {" "}
                                Admin
                              </Center>
                            </VStack>
                          </Center>
                        </WrapItem>
                        <WrapItem>
                          <Center
                            w="180px"
                            h="180px"
                            bg="gray.100"
                            boxShadow={"base"}
                            rounded={10}
                          >
                            <VStack spacing={0}>
                              <Center
                                rounded={"full"}
                                bg={"tan"}
                                w={75}
                                h={75}
                                mb={1}
                                color={"white"}
                              >
                                B
                              </Center>
                              <Center
                                bg={"#6768AB"}
                                w={120}
                                color={"white"}
                                p={1}
                                borderTopRadius={10}
                                mt={1}
                              >
                                B Bird
                              </Center>
                              <Center
                                bg={"White"}
                                w={120}
                                borderBottomRadius={10}
                                p={1}
                              >
                                Staff
                              </Center>
                            </VStack>
                          </Center>
                        </WrapItem>
                      </Wrap>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
              <Box>
                <Commentsection
                  gid={id}
                  initialcomment={data.commentcount ? data.commentcount : 0}
                  commenters={data.commentuser ? data.commentuser : {}}
                />
              </Box>

              {/* <Text>TEST 1234</Text> */}
            </Box>

            <Spacer bg={"#F3F3F3"} />
            <Box w={400} minH={1000} bg={"#F3F3F3"}>
              {" "}
            </Box>
          </Flex>
        )}
        <Modal onClose={onDelClose} isOpen={isDelOpen} isCentered>
          <ModalOverlay />
          <ModalContent fontFamily={"Mitr"}>
            <ModalHeader>ยืนยันลบกลุ่ม</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>กรอกชื่อย่อของคอมมูเพื่อลบ</Text>
              <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>ปิด</Button>
              <Button onClick={confirmRemove}>ยืนยัน</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Footer />
      </Box>
    </Box>
  );
}
