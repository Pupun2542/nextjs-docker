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
    getDocs(query(collection(db, "chatrooms"), where("member", "array-contains", user.uid), where("type", "==", "private"))).then((docs) => {

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
            type: "private",
          }).then((created) => {
            roomId = created.id
            updateDoc(doc(db, "chatrooms", created.id), {
              id: created.id,
            }).then(() => changeTab(created.id))
          })
        }
        // console.log("not empty")
      } else {
        // console.log("empty")
        addDoc(collection(db, "chatrooms"), {
          member: [user.uid, id],
          type: "private",
        }).then((created) => {
          // console.log("created")
          roomId = created.id
          changeTab(roomId);
          updateDoc(doc(db, "chatrooms", created.id), {
            id: created.id,
          }).then(() => changeTab(created.id))
        })
      }

      // console.log(roomId)
      // setNewtab(roomId)
      // setTimeout(()=>setNewtab(""),500)
    })
  }
  return (
    <Box>
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

              {user && user.uid == id ? (<Button>Edit</Button>) : (<Stack direction="row" spacing={4}>
                <Button colorScheme="teal" variant="solid" position='initial'>
                  Add Friend
                </Button>
                <Button colorScheme="teal" variant="outline" onClick={handleMessage} position='initial'>
                  Message
                </Button>
              </Stack>)}

            </Flex>
          </Flex>

          <Tabs w={'100%'} bg={'tomato2'} isFitted  spacing={0}>
            <TabList borderColor={'black'} p={2}>
              <Tab _selected={{color:'white', bg:'#9A9AB0'}} borderRadius={10}>Timeline</Tab>
              <Tab _selected={{color:'white', bg:'#9A9AB0'}} borderRadius={10}>Community</Tab>
              <Tab _selected={{color:'white', bg:'#9A9AB0'}} borderRadius={10}>Original Character</Tab>
              <Tab _selected={{color:'white', bg:'#9A9AB0'}} borderRadius={10}>About me</Tab>
              <Tab _selected={{color:'white', bg:'#9A9AB0'}} borderRadius={10}>Friend</Tab>
            </TabList>

            {/* <Divider  color={'black'}/> */}

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>Friend</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
        {/* <Spacer /> */}
      </Flex>
    </Box>
  );
}
