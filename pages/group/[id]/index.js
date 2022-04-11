import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import Footer from "../../../components/footer";
import {
  Heart,
  PushPin,
  CalendarBlank,
  DotsThreeVertical,
} from "phosphor-react";

export default function Group() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();
  // const [show, setShow] = useState(false);
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();

  // const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [pin, setPin] = useState(false);
  const [text, setText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, loading, error] = useAuthState(auth);
  const [color, setColor] = useState("");

  const { id } = Router.query;
  useEffect(() => {
    const Fetchdata = async () => {
      getDoc(doc(db, "group", id)).then((d) => {
        if (d.exists()) {
          getDoc(doc(db, "userDetail", d.data().Creator)).then((staff) => {
            if (staff.exists()) {
              setData({ ...d.data(), CreatorName: staff.data().displayName });
            }
          });

          if (d.data().rating === "NC-21 (ไม่เหมาะสำหรับเยาวชน)") {
            setColor("#EA4545");
            // console.log(d.data().rating);
          } else if (d.data().rating === "R-18 (เหมาะสำหรับอายุ 18 ปีขึ้นไป)") {
            setColor("#FF912B");
            // console.log(d.data().rating);
          } else if (d.data().rating === "R-13 (เหมาะสำหรับอายุ 13 ปีขึ้นไป)") {
            setColor("#FBBC43");
            // console.log(d.data().rating);
          } else {
            setColor("#72994C");
            // console.log(d.data().rating);
          }
        } else {
          alert("ไม่พบคอมมู");
          Router.back();
        }
      });
      // setLoading(false);
    };
    if (id) Fetchdata();
  }, [id]);

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
          name: data.Name,
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
    if (user && user.uid == data.Creator) {
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

  return (
    <Box>
      <Box bg={"#FFFFFF"}>
        <CustomNavbar />
        {!loading && data.Name && (
          <Flex>
            {/* {console.log(data)} */}
            <Box w={400} minH={1000} bg={"#F3F3F3"}></Box>
            <Spacer bg={"#F3F3F3"} />

            <Box>
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
                        icon={<Heart size={32} />}
                        isDisabled
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
                      {user && user.uid === data.Creator && (
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
                            <MenuItem _hover={{ background: "#E2E8F0" }}>
                              <Text
                                onClick={() =>
                                  Router.push("/group/" + id + "/edit")
                                }
                              >
                                Edit
                              </Text>
                            </MenuItem>
                            <MenuItem _hover={{ background: "#E2E8F0" }}>
                              <Text onClick={onDelOpen}>Delete</Text>
                            </MenuItem>
                          </MenuList>
                        </Menu>
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
                  {data.Name ? data.Name : "ชื่อคอมมู"}
                </Center>

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
                              color={'white'}
                              shadow={"base"}
                            >
                              {data.privacy ? (
                                data.privacy === "สาธารณะ" ? (
                                  <Flex flexDir={"column"} justifyContent="center">
                                    <Text flex={1} textAlign='center' fontSize={20}>Public</Text>
                                    <Text flex={1} textAlign='center' fontSize={12}>
                                      ทุกคนสามารถเข้าร่วมและเห็นการเคลื่อนไหวภายในกลุ่มได้
                                    </Text>
                                  </Flex>
                                ) : (
                                  <Flex flexDir='column' justifyContent="center">
                                    <Text flex={1} textAlign='center' fontSize={20}>Private</Text>
                                    <Text flex={1} textAlign='center' fontSize={12}>
                                      คนเฉพาะกลุ่มเท่านั้นที่สามารถเข้าร่วมภายในกลุ่มได้
                                    </Text>
                                  </Flex>
                                )
                              ) : (
                                <Flex flexDir={"column"} justifyContent="center">
                                  <Text flex={1} textAlign='center' fontSize={20}>Public</Text>
                                  <Text flex={1} textAlign='center' fontSize={12}>
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
                              {data.Type ? data.Type : "Slow-Life"}
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
                              pt={2}
                              pl={3}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {/* {console.log(data.genre)} */}
                              {data.genre.length > 0
                                ? data.genre.map((genre, index) => (
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
                              {data.place.length > 0
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
                              {data.times.length > 0
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
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {data.tws
                                ? data.tws.length > 0
                                  ? data.tws.map((tw, index) => (
                                      <Box key={index} float="left">
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
                                  ? data.averageTime+" "+data.averageTimeUnit
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
                            <Box
                              bg={"white"}
                              w={550}
                              minH={63}
                              p={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {data.description}
                            </Box>
                          </Flex>

                          <Flex ml={10} w={750}>
                            <Center
                              borderRadius={10}
                              bg={"#FBBC43"}
                              w={495}
                              h={63}
                              p={5}
                              as={"button"}
                              onClick={onOpen}
                              shadow={"base"}
                            >
                              Rule&Agreement
                            </Center>
                            <Spacer />
                            <Center
                              shadow={"base"}
                              borderRadius={10}
                              bg={color}
                              w={240}
                              h={63}
                              p={5}
                            >
                              {data.rating
                                ? data.rating
                                : "G (เหมาะสำหรับทุกวัย)"}
                            </Center>
                          </Flex>

                          <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay />
                            <ModalContent fontFamily={"Mitr"}>
                              <ModalHeader>Rule&Agreement</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                {data.rule ? data.rule : "ไม่มีกฎและข้อตกลง"}
                              </ModalBody>
                              <ModalFooter>
                                <Button onClick={onClose}>Close</Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          <Center
                            bg={"#303030"}
                            shadow={"base"}
                            color={"white"}
                            h={63}
                            w={750}
                            borderRadius={10}
                            onClick={
                              data.smlink
                                ? () => outsidenavigate(data.smlink)
                                : () => alert("ไม่มีลิงก์กลุ่ม")
                            }
                            cursor="pointer"
                          >
                            Community Link
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
                        {/* <Box pl={10}>ลงทะเบียนตัวละคร</Box> */}
                        <VStack>
                          <Flex w={750}>
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
                              ลงทะเบียนตัวละคร
                            </Box>
                            <Box
                              bg={"white"}
                              w={550}
                              h={63}
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {data.submitlink ? (
                                <a href={data.submitlink}>{data.submitlink}</a>
                              ) : (
                                "ไม่มีลิงก์ลงทะเบียน"
                              )}
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
                              ตรวจสอบตัวละคร
                            </Box>
                            <Box
                              bg={"white"}
                              w={550}
                              h={63}
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {data.resultlink ? (
                                <a href={data.resultlink}>{data.resultlink}</a>
                              ) : (
                                "ไม่มีลิงก์ตรวจสอบตัวละคร"
                              )}
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
                              ข้อมูลคอมมู
                            </Box>
                            <Box
                              bg={"white"}
                              w={550}
                              h={63}
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {data.doclink ? (
                                <a href={data.doclink}>{data.doclink}</a>
                              ) : (
                                "ไม่มีลิงก์ข้อมูลคอมมู"
                              )}
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
                              คำถาม
                            </Box>
                            <Box
                              bg={"white"}
                              w={550}
                              h={63}
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {data.qaasklink ? (
                                <a href={data.qaasklink}>{data.qaasklink}</a>
                              ) : (
                                "ไม่มีลิงก์ถามคำถาม"
                              )}
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
                              ตรวจสอบคำตอบ
                            </Box>
                            <Box
                              bg={"white"}
                              w={550}
                              h={63}
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {data.qaanslink ? (
                                <a href={data.qaanslink}>{data.qaanslink}</a>
                              ) : (
                                "ไม่มีลิงก์ตรวจสอบคำตอบ"
                              )}
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
                              ช่องทางติดต่อ
                            </Box>
                            <Box
                              bg={"white"}
                              w={550}
                              h={63}
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {data.contactlink ? (
                                <a href={data.contactlink}>
                                  {data.contactlink}
                                </a>
                              ) : (
                                "ไม่มีช่องทางติดต่อ"
                              )}
                            </Box>
                          </Flex>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Flex>
              </VStack>
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
