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
import { getAuth } from "firebase/auth";
import {
  Flex,
  Box,
  Text,
  Spacer,
  VStack,
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
} from "@chakra-ui/react";
import CustomNavbar from "../../../components/navbar";
import { Chatsidebar } from "../../../components/chat";

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
  // const [newtab, setNewtab] = useState("");

  useEffect(() => {
    // console.log(id);
    const loaduserDetail = async () => {
      if (!loading) {
        const detail = await getDoc(doc(db, "userDetail", id));
        //    console.log(detail.data())
        if (detail.exists) {
          setUserDetail(detail.data());
        }
      }
    };
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
        // docs.docs.map(doc=>{
        //     // console.log(doc.data())
        //     if (doc.data().member.includes(id)){
        //         roomId = doc.data().id
        //     }
        // });
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
  return (
    <Box fontFamily={'Mitr'}>
      <CustomNavbar />
      {/* {user&&(
        <Chatsidebar db={db} user={user} forcedopenTab={newtab}/>
      )} */}
      <Flex flexGrow={0.8} justifyContent="center" pt={55}>
        {/* <Spacer /> */}
        <VStack bg={'#EBEBEB'} minH={914} spacing={0} >
          <Center bg={"wheat"} width="100%" h={400} fontSize={30}>
            Cover
          </Center>
          <Flex bg={'white'} boxShadow={'base'}>
            <Center
              w={150}
              h={150}
              bg="blue.100"
              rounded={100}
              m={2}
              mt={-20}
              float={"left"}
            >
              Avatar
            </Center>

            <Flex bg={"red.200"} w={770} m={2} p={2}>
              <Flex flexDir={'column'} fontFamily={'Mitr'} w={'75%'}>
                {userDetail && (

                  <Box fontFamily={"Mitr"} fontSize={30}>
                    {userDetail.displayName}
                  </Box>

                )}
                <Box bg={'tomato'}>
                  เมื่อร่างกายได้ทิ้งดิ่งสู่เบื้องล่างตามแรงดึงดูดของโลก ระหว่างนั้นกลับรู้สึกวูบโหวงจนต้องเปล่งเสียงร้องออกมาด้วยความตกใจ น่าแปลกว่าแทนที่ผิวจะได้สัมผัสกับน้ำที่เน่า
                </Box>
              </Flex>

              <Spacer />

              {user && user.uid == id ? (
                <Button>Edit</Button>
              ) : (
                <Stack direction="row" spacing={4}>
                  <Button colorScheme="teal" variant="solid" position="initial">
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

          <Tabs w={'100%'} bg={'tomato2'} isFitted spacing={0}>
            <TabList borderColor={'gray.400'} p={2}>
              <Tab _selected={{ color: 'white', bg: '#9A9AB0' }} borderRadius={10}>About me</Tab>
              <Tab _selected={{ color: 'white', bg: '#9A9AB0' }} isDisabled borderRadius={10}>Timeline</Tab>
              <Tab _selected={{ color: 'white', bg: '#9A9AB0' }} isDisabled borderRadius={10}>Original Character</Tab>
              <Tab _selected={{ color: 'white', bg: '#9A9AB0' }} isDisabled borderRadius={10}>Friend</Tab>
              <Tab _selected={{ color: 'white', bg: '#9A9AB0' }} isDisabled borderRadius={10}>Bookshelf</Tab>
            </TabList>

            {/* <Divider  color={'black'}/> */}

            <TabPanels>

              {/* About */}
              <TabPanel>
                <Box fontSize={24} fontWeight={'extrabold'} ml={5}>การโรลเพลย์</Box>

                <VStack bg={'white'} width={'100%'} borderRadius={10} boxShadow={'base'}>
                  <Flex p={3} w={'100%'}>

                    <Center maxWidth={150} w={'100%'}>
                      สไตล์การเล่น
                    </Center>

                    <Divider ml={2} mr={2} orientation="vertical" />

                    <Wrap>
                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >สายวาด</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput />
                          </Editable>
                        </Flex>
                      </WrapItem>

                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >สายโรลเพลย์ยาว</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput w={50} />
                          </Editable>
                        </Flex>
                      </WrapItem>

                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >สายโรลเพลย์สั้น</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput w={50} />
                          </Editable>
                        </Flex>
                      </WrapItem>

                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >สายเวิ่นสตอรี่</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput w={50} />
                          </Editable>
                        </Flex>
                      </WrapItem>

                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >สายฟิคชั่น</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput w={50} />
                          </Editable>
                        </Flex>
                      </WrapItem>
                    </Wrap>

                  </Flex>

                  <Flex p={3} w={'100%'}>

                    <Center maxWidth={150} w={'100%'}>
                      สไตล์การเล่น
                    </Center>

                    <Divider ml={2} mr={2} orientation="vertical" />

                    <Wrap>
                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >คอเมดี้</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput />
                          </Editable>
                        </Flex>
                      </WrapItem>

                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >ดราม่า</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput w={50} />
                          </Editable>
                        </Flex>
                      </WrapItem>

                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >อีโรติก</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput w={50} />
                          </Editable>
                        </Flex>
                      </WrapItem>

                      <WrapItem>
                        <Flex bg={'gray.400'} borderRadius={10} p={1.5} boxShadow={'base'}>
                          <Center ml={2} mr={2} >มิตรภาพ</Center>
                          <Editable bg={'white'} w={53} borderRadius={10} pl={1} pr={1} pt={0.5} pb={0.5} defaultValue='100%'>
                            <EditablePreview />
                            <EditableInput w={50} />
                          </Editable>
                        </Flex>
                      </WrapItem>

                    </Wrap>

                  </Flex>
                </VStack>

                
              </TabPanel>

              {/* Timeline */}
              <TabPanel>
                <p>one!</p>
              </TabPanel>

              {/* OC */}
              <TabPanel>
                <p>two!</p>
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
        {/* <Spacer /> */}
      </Flex>
    </Box>
  );
}
