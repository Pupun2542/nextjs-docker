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
import { Myfriends } from "../../../components/profile/myfriends";
import axios from "axios";
import useFriendManager from "../../../components/groupcomponents/friendhooks";
import UseChatManager from "../../../src/hook/ChatManager";

export default function profile() {
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
  const [editAvartarMode, setEditAvatarMode] = useState(false);
  const [editCoverMode, setEditCoverMode] = useState(false);
  const {
    friend,
    setFriend,
    handleAddFriend,
    handleRemoveAddFriend,
    handleAcceptFriend,
    handleRejectFriend,
    handleRemoveFriend,
  } = useFriendManager();
  const { handleMessage } = UseChatManager()

  const loaduserDetail = async () => {
    if (!loading) {
      const token = await user.getIdToken();
      const res = await axios.post(`${process.env.NEXT_PUBLIC_USE_API_URL}/user/getdetailusers`, {
        users: [...new Set([id, user.uid])]
      },
        {
          headers: {
            Authorization: token,
          },
        })
      if (res.status === 200) {
        let thisuser = res.data.find(v => v.uid === id);
        let myuser = res.data.find(v => v.uid === user.uid);
        if (thisuser.pendingFriend?.includes(user.uid)) {
          setFriend(1); //onpending
        } else if (thisuser.friend?.includes(user.uid)) {
          setFriend(2); //friended
        } else if (myuser.pendingFriend?.includes(id)) {
          setFriend(3); //onpending but reciever
        }
        if (user.uid === id && thisuser.pendingFriend && thisuser.pendingFriend.length > 0) {

          const res2 = await axios.post(`${process.env.NEXT_PUBLIC_USE_API_URL}/user/getdetailusers`, {
            users: [...thisuser.pendingFriend]
          },
            {
              headers: {
                Authorization: token,
              },
            })
          if (res2.status === 200) {
            console.log(thisuser.pendingFriend, res2.data);
            thisuser = { ...thisuser, pendingFriend: res2.data }
          }
        }
        if (thisuser.friend && thisuser.friend.length > 0) {
          const res3 = await axios.post(`${process.env.NEXT_PUBLIC_USE_API_URL}/user/getdetailusers`, {
            users: [...thisuser.friend]
          },
            {
              headers: {
                Authorization: token,
              },
            })
          if (res3.status === 200) {
            thisuser = { ...thisuser, friend: res3.data }
          }
        }
        setUserDetail(thisuser);
      }
    }
  };

  useEffect(() => {
    // console.log(id);
    loaduserDetail();
  }, [loading, id]);

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
    <Box fontFamily={"Mitr"}>
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
            {user.uid === id ? (
              <Center
                width="100%"
                maxW={1000}
                h={563}
                fontSize={30}
                boxShadow={"base"}
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
            ) : (
              <Center
                width="100%"
                maxW={1000}
                h={563}
                fontSize={30}
                boxShadow={"base"}
                borderBottomRadius={10}
              >
                <Image
                  borderBottomRadius={10}
                  src={userDetail?.coverImage}
                  w="100%"
                  h="100%"
                  fallback={<Box></Box>}
                />
              </Center>
            )}
            <Flex borderBottomRadius={10} bg={"white"} boxShadow={"base"}>
              <Center
                rounded={"full"}
                ml={-10}
                p={2}
                mt={-20}
                w={157}
                h={157}
                bg={"white"}
                boxShadow={"base"}
              >
                {user.uid === id ? (
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
                ) : (
                  <Avatar
                    w={150}
                    h={150}
                    rounded={100}
                    m={2}
                    // mt={-20}
                    float={"left"}
                    src={userDetail?.photoURL}
                  ></Avatar>
                )}
              </Center>

              <Flex w={770} m={2} p={2}>
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

                  <Box>ตรงนี้คือ Profile Description!!</Box>
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
                    {friend === 0 && (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        position="initial"
                        onClick={() => handleAddFriend(id, user)}
                      >
                        Add Friend
                      </Button>
                    )}
                    {friend === 1 && (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        position="initial"
                        onClick={() => handleRemoveAddFriend(id, user)}
                      >
                        Cancel Request
                      </Button>
                    )}
                    {friend === 2 && (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        position="initial"
                        onClick={() => handleRemoveFriend(id, user)}
                      >
                        Unfriend
                      </Button>
                    )}
                    {friend === 3 && (
                      <>
                        <Button
                          colorScheme="teal"
                          variant="solid"
                          position="initial"
                          onClick={() => handleAcceptFriend(id, user)}
                        >
                          Accept Request
                        </Button>
                        <Button
                          colorScheme="teal"
                          variant="solid"
                          position="initial"
                          onClick={() => handleRejectFriend(id, user)}
                        >
                          Reject Request
                        </Button>
                      </>
                    )}
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => handleMessage(user, id)}
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
                  isDisabled
                  borderRadius={10}
                >
                  Community
                </Tab>
                <Tab
                  isDisabled
                  _selected={{ color: "white", bg: "#9A9AB0" }}
                  borderRadius={10}
                >
                  OC
                </Tab>
                <Tab
                  _selected={{ color: "white", bg: "#9A9AB0" }}
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
                  <About data={userDetail} onRefresh={loaduserDetail} />
                </TabPanel>
                
                {/* Timeline */}
                <TabPanel>
                  <p>one!</p>
                </TabPanel>

                {/* Community */}
                <TabPanel>
                  <p>?</p>
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
                  <Myfriends data={userDetail} owner={id} accessor={user.uid} />
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
