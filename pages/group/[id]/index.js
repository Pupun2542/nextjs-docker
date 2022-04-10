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
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [pin, setPin] = useState(true);
  const [text, setText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = Router.query;
  useEffect(() => {
    const Fetchdata = async () => {
      getDoc(doc(db, "group", id)).then((d) => {
        getDoc(doc(db, "userDetail", d.data().Creator)).then((staff) => {
          if (staff.exists) {
            setData({ ...d.data(), CreatorName: staff.data().displayName });
          }
        });

        setLoading(false);
      });
    };
    if (id) Fetchdata();
  }, [id]);

  const editButtonHandler = () => {
    Router.push("/group/" + id + "/edit");
  };

  useEffect(() => {
    // console.log("effect");
    const l = async () => {
      // console.log(auth.currentUser,db);
      if (auth.currentUser && db) {
        // console.log("if1");
        const d = await getDoc(doc(db, "userDetail", auth.currentUser.uid));
        // console.log(auth.currentUser.uid);
        if (d.data().PinnedGroup) {
          // console.log("if2");
          if (d.data().PinnedGroup.includes(id)) {
            setPin(false);
            console.log(pin);
          }
        }
      }
    };
    l();
  }, [auth, db, id, pin]);

  const pinHandler = () => {
    if (auth.currentUser) {
      UpdateUserPinGroup(auth.currentUser.uid, id);
      if (pin) {
        setPin(false);
      } else {
        setPin(true);
      }
    } else {
      alert("กรุณาล็อกอินเพื่อใช้ฟังก์ชั่นปักหมุด");
    }
  };

  const removehandler = () => {
    console.log("remove");
    if (auth.currentUser && auth.currentUser.uid == data.Creator) {
      console.log("modal");
      setShow(true);
    } else {
      console.log(auth.currentUser, auth.currentUser.uid, data.Creator);
    }
  };
  const confirmRemove = () => {
    if (text == data.tag) {
      deleteDoc(doc(db, "group", id));
      setShow(false);
      Router.push("/group");
    } else {
      console.log(text, data.tag);
      alert("กรุณากรอกข้อมูลอีกครั้ง");
    }
  };

  return (
    <Box>
      <Head>
        <link rel="shortcut icon" href="../../../favicon.ico"></link>
        <title>Comuthor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box bg={"#FFFFFF"}>
        <CustomNavbar />
        {data && (
          <Flex>
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
                        bg={"white"}
                        rounded="full"
                        h={38}
                        w={38}
                        mt={2.5}
                        ml={2.5}
                        icon={<PushPin size={32} />}
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
                      {auth.currentUser &&
                        auth.currentUser.uid === data.Creator && (
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
                                <Text>Delete</Text>
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
                              {data.privacy ? data.privacy : "สาธารณะ"}
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
                              h={63}
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            >
                              {/* {console.log(data.genre)} */}
                              {data.genre.length > 0
                                ? data.genre.map((genre) => (
                                    <Box
                                      key={index}
                                      className={style.tag}
                                      m={1.5}
                                      p={1}
                                      maxW={600}
                                    >
                                      <Text>{genre}</Text>
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
                              {data.tws.length > 0
                                ? data.tws.map((tw) => (
                                    <Box
                                      key={index}
                                      className={style.tag}
                                      m={1.5}
                                      p={1}
                                      maxW={600}
                                    >
                                      <Text>{tw}</Text>
                                    </Box>
                                  ))
                                : "ไม่มีคำเตือน"}
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
                              วันที่เริ่มเล่น
                            </Box>
                            <Box
                              bg={"white"}
                              w={550}
                              h={63}
                              pt={5}
                              pl={5}
                              shadow={"base"}
                              borderRightRadius={10}
                            ></Box>
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
                              bg={"#72994C"}
                              w={240}
                              h={63}
                              p={5}
                            >
                              Rate
                            </Center>
                          </Flex>

                          <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay />
                            <ModalContent fontFamily={"Mitr"}>
                              <ModalHeader>Rule&Agreement</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>Push your Rule</ModalBody>
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
                      <AccordionPanel pb={4}></AccordionPanel>
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

        <Footer />
      </Box>
    </Box>
  );
}
