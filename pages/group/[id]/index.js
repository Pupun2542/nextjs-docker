import React, { useState, useEffect, useRef } from "react";
import CustomNavbar from "../../../components/navbar";
// import "../../../styles/creategroup.module.css";
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
  Avatar,
  Image,
  SimpleGrid,
  Spinner,
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
import { GroupBar } from "../../../components/groupBar";

export default function Group() {
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
  const getUser = useUser();
  const buttonRef = useRef(null);

  const { id } = Router.query;
  useEffect(() => {
    const Fetchdata = async () => {
      const token = await auth.currentUser?.getIdToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}`,
        {
          headers: {
            Authorization: token || "",
          },
        }
      );
      let data = res.data;
      let color = "";
      if (data.rating === "NC-17 (ผู้ที่อายุต่ำกว่า 17 ปีควรไม่ควรรับชม)") {
        color = "#4D4D88";
      } else if (data.rating === "R (เด็กอายุต่ำกว่า 17 ปีควรได้รับคำแนะนำ)") {
        color = "#FFC75A";
      } else if (
        data.rating === "PG-13 (เด็กอายุต่ำกว่า 13 ปีควรได้รับคำแนะนำ)"
      ) {
        color = "#6768AB";
      } else if (data.rating === "PG (เด็กควรได้รับคำแนะนำ)") {
        color = "#535353";
      } else {
        color = "#C6C6C6";
      }
      setColor(color);
      setData(data);
    };
    if (id && id != "undefined" && !loading) {
      Fetchdata();
    }
  }, [id, loading]);
  useEffect(() => {
    if (user) {
      getDoc(doc(db, "userDetail", user.uid)).then((snap) => {
        if (snap.exists()) {
          if (snap.data().pinned?.includes(id)) {
            setPin(true);
          }
        }
      });
    }
  }, [user]);

  const pinHandler = async () => {
    const token = await user.getIdToken();
    if (user) {
      if (pin) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}/unpin`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPin(false);
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}/pin`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPin(true);
      }
    }
  };

  const removehandler = () => {
    if (user && user.uid == data.creator.uid) {
      onDelOpen();
    }
  };
  const confirmRemove = () => {
    if (text == data.tag) {
      deleteDoc(doc(db, "group", id));
      Router.push("/group");
    } else {
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
        if (res.status === 200) {
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
      Router.push(`/group/${id}/dashboard`);
    }
  };

  const handleEnterGroup = async () => {
    if (Object.keys(data.member).includes(user.uid)) {
      Router.push(`/group/${id}/dashboard`);
    } else {
      const token = await user.getIdToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}/joinGroup`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        alert("สมัครเข้ากลุ่มเรียบร้อย");
      }
    }
  };

  return (
    <Box bg={"F3F5F8"}>
      <CustomNavbar />
      <Flex
        justifyContent={"center"}
        direction={"column"}
        minH="calc(100vh - 180px)"
      >
        {!loading && data && (
          <Flex bg={"#F3F5F8"} justifyContent={"center"}>
            {user&&(
              <GroupBar id={id} data={data} user={user} />
            )}
            
            <Flex
              direction={"column"}
              marginTop={55}
              bg={"white"}
              boxShadow={"base"}
              minW={950}
            >
              <VStack spacing={0}>
                <Flex justifyContent={"center"}>
                  <Box w={850} boxShadow="base">
                    <Flex h={62} bg={"#6768AB"}>
                      {user && (
                        <>
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
                                    ? "#EA4545"
                                    : "black"
                                }
                              />
                            }
                            isDisabled={!user}
                            onClick={HandleLove}
                          />

                          <IconButton
                            bg={pin ? "#FFC75A" : "white"}
                            rounded="full"
                            h={38}
                            w={38}
                            mt={2.5}
                            ml={2.5}
                            icon={<PushPin size={32} />}
                            onClick={pinHandler}
                          />
                        </>
                      )}

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
                      {user &&
                        Object.keys(data.creator).includes(
                          auth.currentUser?.uid
                        ) && (
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

                              <MenuList minW={20} fontFamily={"Sarabun"}>
                                <MenuItem
                                  _hover={{ background: "#E2E8F0" }}
                                  onClick={() =>
                                    Router.push("/group/" + id + "/edit")
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
                </Flex>

                <img
                  boxShadow={"base"}
                  src={data.banner}
                  height={478}
                  width={850}
                ></img>

                <Flex direction={"column"} bg={"#F3F5F8"} boxShadow={"base"}>
                  <Center
                    h={62}
                    bg={"#6768AB"}
                    w={850}
                    fontFamily="Sarabun"
                    color={"white"}
                    fontSize={22}
                  >
                    {data.tag ? data.tag : "ชื่อย่อคอมมู"} |{" "}
                    {data.name ? data.name : "ชื่อคอมมู"}
                  </Center>

                  <Tabs isFitted w={850} boxShadow={"base"}>
                    <TabList fontFamily={"Sarabun"}>
                      <Tab>Detail</Tab>
                      <Tab>Document</Tab>
                      <Tab>Staff List</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <HStack
                          fontFamily={"Sarabun"}
                          justifyContent={"space-between"}
                          mb={5}
                        >
                          <Flex>
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
                                data.privacy === "public" ? (
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
                          </Flex>
                          <Center
                            shadow={"base"}
                            borderRadius={10}
                            bg={color}
                            w={"49.5%"}
                            h={70}
                            p={5}
                            color={"white"}
                          >
                            {data.rating
                              ? data.rating
                              : "G (เหมาะสำหรับทุกวัย)"}
                          </Center>
                          <Button
                            h={70}
                            alignContent={"center"}
                            bg={"#303030"}
                            _hover={{ bg: "gray.800" }}
                            color={"#FFC75A"}
                            w={155}
                            onClick={() => {
                              handleEnterGroup();
                            }}
                            disabled={!auth.currentUser}
                          >
                            {Object.keys(data.member).includes(
                              auth.currentUser?.uid
                            )
                              ? "ไปที่กลุ่ม"
                              : data.pendingmember &&
                                Object.keys(data.pendingmember).includes(
                                  auth.currentUser?.uid
                                )
                              ? "รอการตอบรับ"
                              : "เข้าร่วมกลุ่ม"}
                          </Button>
                        </HStack>

                        <Flex bg={"#F3F5F8"}>
                          <Accordion
                            w={850}
                            fontFamily={"Sarabun"}
                            defaultIndex={[0]}
                            allowMultiple
                          >
                            <AccordionItem>
                              <h2>
                                <AccordionButton>
                                  <AccordionIcon mr={5} />
                                  <Box
                                    fontFamily={"SarabunSB"}
                                    fontSize={25}
                                    flex="1"
                                    textAlign="left"
                                  >
                                    Basic Information
                                  </Box>
                                </AccordionButton>
                              </h2>
                              <AccordionPanel spacing={0}>
                                <VStack>
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
                                      {data.times && data.genre.length > 0
                                        ? data.genre.map((genre, index) => (
                                            <Box
                                              key={index}
                                              marginLeft={2.5}
                                              maxW={600}
                                              float={"left"}
                                              bg={"white"}
                                              p={1}
                                              pl={2}
                                              pr={2}
                                              borderColor={"black"}
                                              borderWidth={2}
                                              color={"black"}
                                              borderRadius={"5"}
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
                                                bg={"#EA4545"}
                                                p={2}
                                                borderRadius={5}
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
                                        pt={2}
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

                                  <Flex w={750}>
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

                                    <Box
                                      bg={"white"}
                                      w={550}
                                      minH={63}
                                      p={5}
                                      shadow={"base"}
                                      borderRightRadius={10}
                                      whiteSpace="pre-line"
                                    >
                                      {data.description}
                                    </Box>
                                  </Flex>

                                  <Flex ml={10} w={750}>
                                    <Center
                                      borderRadius={10}
                                      bg={"#FBBC43"}
                                      w={"100%"}
                                      h={63}
                                      p={5}
                                      as={"button"}
                                      onClick={onOpen}
                                      shadow={"base"}
                                    >
                                      กฎกติกาและข้อตกลง
                                    </Center>

                                    <Spacer />
                                  </Flex>

                                  <Modal
                                    onClose={onClose}
                                    isOpen={isOpen}
                                    isCentered
                                  >
                                    <ModalOverlay />
                                    <ModalContent fontFamily={"Sarabun"}>
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

                                  <Button
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
                                        handleEnterGroup();
                                      }
                                    }
                                    _hover={{ bg: "gray.800" }}
                                    cursor="pointer"
                                    disabled={!auth.currentUser}
                                  >
                                    {Object.keys(data.member).includes(
                                      auth.currentUser?.uid
                                    )
                                      ? "ไปที่กลุ่ม"
                                      : data.pendingmember &&
                                        Object.keys(
                                          data.pendingmember
                                        ).includes(auth.currentUser?.uid)
                                      ? "รอการตอบรับ"
                                      : "เข้าร่วมกลุ่ม"}
                                  </Button>
                                </VStack>
                              </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                              <h2>
                                <AccordionButton>
                                  <AccordionIcon mr={5} />
                                  <Box
                                    fontFamily={"SarabunSB"}
                                    fontSize={25}
                                    flex="1"
                                    textAlign="left"
                                  >
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
                                          // position="relative"
                                          maxWidth={180}
                                          h={"auto"}
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
                        overflowX={"hidden"}
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
                        <Center
                          ml={-4}
                          // w={850}
                          // h={500}
                        >
                          {data.doclink && (
                            <Box
                              position={"static"}
                              as="iframe"
                              src={data.doclink + "#toolbar=0&view=FitH"}
                              alt="demo"
                              w={900}
                              h={1000}
                              overflowY={"auto"}
                              overflowX={"hidden"}
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
                        </Center>
                      </TabPanel>

                      <TabPanel>
                        <Center
                          w={"100%"}
                          p={3}
                          color={"white"}
                          bg={"#6768AB"}
                          fontFamily={"Sarabun"}
                          fontSize={"xl"}
                          mb={5}
                        >
                          รายชื่อผู้สร้าง
                          <Center pl={2}>
                            [{Object.keys(data.staff).length}]
                          </Center>
                        </Center>

                        <SimpleGrid columns={3} spacing={2} pl={1} pr={1}>
                          {Object.values(data.staff).map((staff) => (
                            <Flex
                              bg={"white"}
                              borderRadius={"full"}
                              // borderRightRadius={5}
                              // boxShadow='base'
                            >
                              <Flex
                                bg={"#6768AB"}
                                borderLeftRadius="full"
                                // borderBottomLeftRadius={''}
                              >
                                <Avatar
                                  rounded={"full"}
                                  w={75}
                                  h={75}
                                  color={"white"}
                                  boxShadow={"base"}
                                  src={staff.photoURL}
                                  name={staff.displayName}
                                />
                              </Flex>

                              <Flex direction={"column"}>
                                <Box
                                  minWidth={190}
                                  w={"100%"}
                                  bg={"#6768AB"}
                                  fontSize={18}
                                  color={"white"}
                                  borderTopRightRadius={5}
                                  pl={2}
                                  boxShadow={"base"}
                                  fontFamily={"SarabunSB"}
                                >
                                  {Object.keys(data.creator).includes(staff.uid)
                                    ? "Owner"
                                    : "Staff"}
                                </Box>

                                <Box
                                  h={"100%"}
                                  bg={"white"}
                                  borderBottomRightRadius={5}
                                  ml={-10}
                                  pl={12}
                                  mt={2}
                                  fontFamily={"Sarabun"}
                                  boxShadow={"base"}
                                >
                                  {staff.displayName}
                                </Box>
                              </Flex>
                            </Flex>
                          ))}
                        </SimpleGrid>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </VStack>

              <Flex justifyContent={"center"}>
                <Flex
                  justifyContent={"center"}
                  boxShadow={"base"}
                  bg={"#F3F5F8"}
                  w={850}
                >
                  <Commentsection
                    gid={id}
                    initialcomment={data.commentcount ? data.commentcount : 0}
                    commenters={data.commentuser ? data.commentuser : {}}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}

        <Modal onClose={onDelClose} isOpen={isDelOpen} isCentered>
          <ModalOverlay />
          <ModalContent fontFamily={"Sarabun"}>
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
        {loading ||
          (!data && (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ))}
      </Flex>
      <Footer />
    </Box>
  );
}
