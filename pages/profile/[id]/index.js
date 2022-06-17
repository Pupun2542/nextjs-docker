import React, { useEffect, useState } from "react";
import { useApp, useTab } from "../../../src/hook/local";
import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { getAuth, updateProfile } from "firebase/auth";
import {
  Flex,
  Box,
  Text,
  Spacer,
  VStack,
  HStack,
  Center,
  Stack,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Wrap,
  WrapItem,
  IconButton,
  useBreakpointValue,
  Avatar,
  Input,
  Image,
  Radio,
  RadioGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Select,
} from "@chakra-ui/react";
import CustomNavbar from "../../../components/navbar";
import { Check, Eye, X, EyeClosed } from "phosphor-react";
import UploadImageModal from "../../../components/universalUploadModal";
import { Uploadprofileimg } from "../../../src/services/filestoreageservice";
import Footer from "../../../components/footer";

export default function profile() {
  const { tabState, addTab, removeTab, changeTab, CloseTab } = useTab();
  const router = useRouter();
  const { id } = router.query;
  // const app = useApp();
  // const db = getFirestore(app);
  // const auth = getAuth(app);
  const { app, auth, db } = useApp();
  const [user, loading, error] = useAuthState(auth);
  const [userDetail, setUserDetail] = useState(null);
  const [editDisplayNameMode, setEditDisplayNameMode] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editAvartar, setEditAvatar] = useState("");
  const [editCover, setEditCover] = useState("");
  const [editAvartarMode, setEditAvatarMode] = useState(false);
  const [editCoverMode, setEditCoverMode] = useState(false);
  const [value, setValue] = React.useState('1')

  const loaduserDetail = async () => {
    if (!loading) {
      const detail = await getDoc(doc(db, "userDetail", id));
      //    console.log(detail.data())
      if (detail.exists) {
        setUserDetail(detail.data());
      }
    }
  };

  const [hiddenState, setHiddenState] = useState({
    othname: false,
    gender: false,
    age: false,
    work: false,
  })

  useEffect(() => {
    // console.log(id);
    loaduserDetail();
  }, [loading, id]);

  const handleMessage = () => {
    let roomId = "";
    getDocs(
      query(
        collection(db, "chatrooms"),
        where("member", "array-contains", user.uid),
        where("type", "==", "private")
      )
    ).then((docs) => {
      if (!docs.empty) {
        //ถ้าเจอ doc
        const docId = docs.docs.find((v) => v.data().member.includes(id));
        if (docId) {
          //ถ้า doc เป็นของเราจริงๆ
          changeTab(docId.data().id);
        } else {
          //ถ้าไม่ใช่
          addDoc(collection(db, "chatrooms"), {
            member: [user.uid, id],
            memberDetail: [
              {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
              {
                uid: id,
                displayName: userDetail.displayName,
                photoURL: userDetail.photoURL,
              },
            ],
            type: "private",
          }).then((created) => {
            roomId = created.id;
            updateDoc(doc(db, "chatrooms", created.id), {
              id: created.id,
            }).then(() => changeTab(created.id));
          });
        }
        // console.log("not empty")
      } else {
        // console.log("empty")
        addDoc(collection(db, "chatrooms"), {
          member: [user.uid, id],
          memberDetail: [
            {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            {
              uid: id,
              displayName: userDetail.displayName,
              photoURL: userDetail.photoURL,
            },
          ],
          type: "private",
        }).then((created) => {
          // console.log("created")
          roomId = created.id;
          changeTab(roomId);
          updateDoc(doc(db, "chatrooms", created.id), {
            id: created.id,
          }).then(() => changeTab(created.id));
        });
      }

      // console.log(roomId)
      // setNewtab(roomId)
      // setTimeout(()=>setNewtab(""),500)
    });
  };

  const handleNameChange = async () => {
    await updateProfile(user, { displayName: editDisplayName });
    await updateDoc(doc(db, "userDetail", user.uid), {
      displayName: editDisplayName,
    });
    await loaduserDetail();
  };
  const handleAvartarChange = async (newavatar) => {
    const dlurl = await Uploadprofileimg(newavatar, user.uid);
    if (dlurl) {
      await updateProfile(user, { photoURL: dlurl });
      await updateDoc(doc(db, "userDetail", user.uid), {
        photoURL: dlurl,
      });
      loaduserDetail();
    }
  };
  const handleCoverChange = async (newcover) => {
    const dlurl = await Uploadprofileimg(newcover, user.uid);
    if (dlurl) {
      await updateDoc(doc(db, "userDetail", user.uid), {
        coverImage: dlurl,
      });
      loaduserDetail();
    }
  };

  return (
    <Box
      fontFamily={"Mitr"}
      overflowY={"auto"}
      maxH={"100vh"}
      css={{
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px"
        },
        "&::-webkit-scrollbar-track": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#727272",
          borderRadius: "24px",
        },
      }}
    >

      <CustomNavbar />
      {/* {user&&(
        <Chatsidebar db={db} user={user} forcedopenTab={newtab}/>
      )} */}
      <Flex flexGrow={0.8} justifyContent="center" pt={55}>
        {userDetail && (
          <VStack
            bg={"#EBEBEB"}
            width="100%"
            maxW={1000}
            minH={914}
            spacing={0}
            boxShadow="base"
          >
            <Center
              width="100%"
              maxW={1000}
              h={400}
              fontSize={30}
              boxShadow={'base'}
              borderBottomRadius={10}
              onClick={() => setEditCoverMode(true)}
            >
              <Image
                borderBottomRadius={10}
                src={userDetail?.coverImage}
                w="100%"
                h="100%"
                fallback={<Box></Box>}
              />
            </Center>
            <Flex borderBottomRadius={10} bg={"white"} boxShadow={"base"}>
              <Center rounded={'full'} ml={-10} p={2} mt={-20} w={157} h={157} bg={'white'} boxShadow={'base'}>
                <Avatar
                  w={150}
                  h={150}
                  rounded={100}
                  m={2}
                  // mt={-20}
                  float={"left"}
                  src={userDetail?.photoURL}
                  onClick={() => setEditAvatarMode(true)}
                ></Avatar>
              </Center>


              <Flex w={770} m={2} p={2} >
                <Flex flexDir={"column"} fontFamily={"Mitr"} w={"75%"}>
                  {userDetail && (
                    <Box fontFamily={"Mitr"} fontSize={30}>
                      {editDisplayNameMode ? (
                        <Input
                          value={editDisplayName}
                          onChange={(e) => setEditDisplayName(e.target.value)}
                        />
                      ) : (
                        <>{userDetail?.displayName}</>
                      )}
                    </Box>
                  )}

                  <Box>
                    ตรงนี้คือ Profile Description!!
                  </Box>

                </Flex>

                <Spacer />

                {user && user.uid == id ? (
                  <Box>
                    {!editDisplayNameMode && (
                      <Button
                        onClick={() => {
                          setEditDisplayNameMode(true);
                          setEditDisplayName(userDetail.displayName);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    {editDisplayNameMode && (
                      <HStack>
                        <IconButton
                          icon={<Check />}
                          onClick={() => {
                            handleNameChange();
                            setEditDisplayNameMode(false);
                          }}
                        />
                        <IconButton
                          icon={<X />}
                          onClick={() => {
                            setEditDisplayNameMode(false);
                            // setEditDisplayName("");
                          }}
                        />
                      </HStack>
                    )}
                  </Box>
                ) : (
                  <Stack direction="row" spacing={4}>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      position="initial"
                    >
                      Add Friend
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={handleMessage}
                      position="initial"
                    >
                      Message
                    </Button>
                  </Stack>
                )}
              </Flex>
            </Flex>

            <Tabs w={"100%"} bg={"tomato2"} isFitted spacing={0}>
              <TabList borderColor={"gray.400"} p={2}>
                <Tab
                  _selected={{ color: "white", bg: "#9A9AB0" }}
                  borderRadius={10}
                >
                  About me
                </Tab>
                <Tab
                  _selected={{ color: "white", bg: "#9A9AB0" }}
                  isDisabled
                  borderRadius={10}
                >
                  Timeline
                </Tab>
                <Tab
                  _selected={{ color: "white", bg: "#9A9AB0" }}
                  borderRadius={10}
                >
                  Original Character
                </Tab>
                <Tab
                  _selected={{ color: "white", bg: "#9A9AB0" }}
                  isDisabled
                  borderRadius={10}
                >
                  Friend
                </Tab>
                <Tab
                  _selected={{ color: "white", bg: "#9A9AB0" }}
                  isDisabled
                  borderRadius={10}
                >
                  Bookshelf
                </Tab>
              </TabList>

              <TabPanels>
                {/* About */}
                <TabPanel>
                  <Box fontSize={24} fontWeight={"extrabold"} ml={5}>
                    ข้อมูลส่วนตัว
                  </Box>

                  <VStack
                    bg={"white"}
                    width={"100%"}
                    borderRadius={10}
                    boxShadow={"base"}
                    p={3}
                    mt={2}
                    mb={2}
                  >
                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        ชื่อเรียก
                      </Box>

                      <Input w={'100%'} placeholder='สมมติชื่อสมชาย'></Input>

                      <IconButton ml={1} icon={hiddenState.othname ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, othname: !hiddenState.othname })} />
                    </Flex>

                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        เพศ
                      </Box>

                      <RadioGroup pt={2} w={'100%'} onChange={setValue} value={value}>
                        <Stack direction='row'>
                          <Radio value='1' colorScheme='purple'>ชาย</Radio>
                          <Radio value='2' colorScheme='purple'>หญิง</Radio>
                          <Radio value='3' colorScheme='purple'>ไม่ระบุ</Radio>
                          <Radio value='4' colorScheme='purple'>อื่น ๆ </Radio>
                        </Stack>
                      </RadioGroup>

                      <Input w={'100%'} />

                      <IconButton ml={1} icon={hiddenState.gender ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, gender: !hiddenState.gender })} />
                    </Flex>

                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        อายุ
                      </Box>

                      <NumberInput w={"100%"}>
                        <NumberInputField placeholder="2" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <IconButton ml={1} icon={hiddenState.age ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, age: !hiddenState.age })} />
                    </Flex>

                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        อาชีพ
                      </Box>

                      <Input w={'100%'} placeholder='Last BOSS in Narnia'></Input>

                      <IconButton ml={1} icon={hiddenState.work ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, work: !hiddenState.work })} />
                    </Flex>

                  </VStack>

                  <Box fontSize={24} fontWeight={"extrabold"} ml={5}>
                    การโรลเพลย์
                  </Box>

                  <VStack
                    bg={"white"}
                    width={"100%"}
                    borderRadius={10}
                    boxShadow={"base"}
                    p={3}
                    mt={2}
                    mb={2}
                  >
                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        สไตล์การเล่น
                      </Box>

                      <Wrap>
                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                สายโรลเพลย์สั้น
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                สายโรลเพลย์ยาว
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                สายฟิคชั่น
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                สายเวิ่นเนื้อเรื่อง
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                สายวาดภาพ
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>
                      </Wrap>
                    </Flex>

                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        แนวที่ชอบ
                      </Box>

                      <VStack>
                        <Wrap>
                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>ตลก</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>ดราม่า</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>โรแมนซ์</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>อีโรติก</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>มิตรภาพ</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>สยองขวัญ</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>ระทึกขวัญ</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>แอคชั่น</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>แฟนตาซี</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>ย้อนยุค</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>

                          <WrapItem>
                            <Center>
                              <Flex
                                bg={'#E7E7E7'}
                                borderRadius={10}
                                p={1.5}
                                boxShadow={"base"}
                                w={150}
                              >
                                <Center ml={2} mr={2}>ไซไฟ</Center>
                                <Spacer />
                                <Editable
                                  fontSize={14}
                                  bg={"white"}
                                  borderRadius={10}
                                  pl={1}
                                  pr={1}
                                  pt={0.5}
                                  pb={0.5}
                                  defaultValue="100%"
                                  borderWidth={1}
                                  borderColor={'#6768AB'}
                                >
                                  <EditablePreview />
                                  <EditableInput />
                                </Editable>
                              </Flex>
                            </Center>

                          </WrapItem>
                        </Wrap>

                        <Input placeholder="กรอกข้อมูลตรงนี้" />
                      </VStack>

                    </Flex>

                  </VStack>

                  <Box fontSize={24} fontWeight={"extrabold"} ml={5}>
                    ความแอคทีฟ
                  </Box>

                  <VStack
                    bg={"white"}
                    width={"100%"}
                    borderRadius={10}
                    boxShadow={"base"}
                    p={3}
                    mt={2}
                    mb={2}
                  >
                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        พื้นที่เล่น
                      </Box>

                      <Wrap>
                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                หลังไมค์ (แชท)
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                หน้าไมค์ (โพสต์)
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                      </Wrap>

                    </Flex>

                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        ระยะเวลาตอบ
                      </Box>

                      <Select placeholder='ตอบกลับทันที'>
                        <option>ตอบกลับตามความสะดวกของตนเอง</option>
                        <option>ตอบกลับภายใน 1 - 2 ชั่วโมง</option>
                        <option>ตอบกลับภายใน 3 - 6 ชั่วโมง</option>
                      </Select>
                    </Flex>
                  </VStack>

                  <Box fontSize={24} fontWeight={"extrabold"} ml={5}>
                    ความสัมพันธ์ตัวละคร
                  </Box>

                  <VStack
                    bg={"white"}
                    width={"100%"}
                    borderRadius={10}
                    boxShadow={"base"}
                    p={3}
                    mt={2}
                    mb={2}
                  >
                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        สายที่เล่น
                      </Box>

                      <Wrap>
                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Heroto Love
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Boy Love
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Girl Love
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                No Love
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center title="Friend with Benefit" fontSize={12} ml={2} mr={2}>
                                Friend with Benefit
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Friend Zone
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center title="Friend with Benefit" fontSize={12} ml={2} mr={2}>
                                One Night Stand
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>
                      </Wrap>
                    </Flex>

                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        สายที่ไม่เล่น
                      </Box>

                      <Input placeholder="กรอกข้อมูลตรงนี้" />
                    </Flex>

                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        โพสิชั่น
                      </Box>

                      <Wrap>
                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Top
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Bottom
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Switch
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Submissive
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>

                        <WrapItem>
                          <Center>
                            <Flex
                              bg={'#E7E7E7'}
                              borderRadius={10}
                              p={1.5}
                              boxShadow={"base"}
                              w={190}
                            >
                              <Center ml={2} mr={2}>
                                Dominant
                              </Center>
                              <Spacer />
                              <Editable
                                fontSize={14}
                                bg={"white"}
                                borderRadius={10}
                                pl={1}
                                pr={1}
                                pt={0.5}
                                pb={0.5}
                                defaultValue="100%"
                                borderWidth={1}
                                borderColor={'#6768AB'}
                              >
                                <EditablePreview />
                                <EditableInput />
                              </Editable>
                            </Flex>
                          </Center>

                        </WrapItem>
                      </Wrap>
                    </Flex>

                    <Flex pl={3} pr={2} w={"100%"}>
                      <Box pt={2} h={10} maxWidth={150} w={"100%"}>
                        รสนิยม
                      </Box>

                      <Input placeholder="กรอกข้อมูลตรงนี้" />
                    </Flex>
                  </VStack>
                </TabPanel>

                {/* Timeline */}
                <TabPanel>
                  <p>one!</p>
                </TabPanel>

                {/* OC */}
                <TabPanel>
                  <Center
                    h={150}
                    w={150}
                    boxShadow={"base"}
                    rounded={10}
                    as={"button"}
                    bg={"whatsapp.500"}
                    _hover={{
                      backgroundColor: "whatsapp.600",
                    }}
                    onClick={() => router.push("/CreateCharacterForm")}
                  >
                    Create
                  </Center>
                </TabPanel>

                {/* Friend */}
                <TabPanel>
                  <p>Friens Zone</p>
                </TabPanel>

                {/* Bookshelf */}
                <TabPanel>
                  <p>?</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        )}
      </Flex>
      <UploadImageModal
        isOpen={editAvartarMode}
        onOpen={() => setEditAvatarMode(true)}
        onClose={() => setEditAvatarMode(false)}
        onSubmit={(cropped) => handleAvartarChange(cropped)}
        aspectRatio={1 / 1}
      />
      <UploadImageModal
        isOpen={editCoverMode}
        onOpen={() => setEditCoverMode(true)}
        onClose={() => setEditCoverMode(false)}
        onSubmit={(cropped) => handleCoverChange(cropped)}
        aspectRatio={16 / 9}
      />
      <Footer></Footer>
    </Box>
  );
}
