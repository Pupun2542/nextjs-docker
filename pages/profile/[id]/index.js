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
  Spacer,
  VStack,
  HStack,
  Center,
  Stack,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Avatar,
  Input,
  Image,
} from "@chakra-ui/react";
import CustomNavbar from "../../../components/navbar";
import { Check, X } from "phosphor-react";
import UploadImageModal from "../../../components/universalUploadModal";
import { Uploadprofileimg } from "../../../src/services/filestoreageservice";
import Footer from "../../../components/footer";
import { About } from "../../../components/profile/about";

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
                  <About></About>
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
