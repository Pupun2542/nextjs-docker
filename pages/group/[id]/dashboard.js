import React, { useState, useEffect, useRef } from "react";
import CustomNavbar from "../../../components/navbar";

import {
  Box,
  Flex,
  Center,
  Spacer,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Button,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";

import { Info, Megaphone } from "phosphor-react";
import { GroupPost } from "../../../components/groupcomponents/post";
import { useAuthState } from "react-firebase-hooks/auth";
import { useApp, useUser } from "../../../src/hook/local";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import axios from "axios";

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;
//   const res = await fetch(`${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}`);

//   let data = await res.json();
// // console.log("rerender")
//   return { props: { data } };
// }

function dashboard() {
  const [data, setData] = useState(undefined);
  const [orderby, setOrderby] = useState("lastactive");
  const [loadLimit, selLoadlimit] = useState(20);
  const { app, auth, db } = useApp();
  const [user, userLoading, error] = useAuthState(auth);
  const Router = useRouter();
  const { id } = Router.query;
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState([]);
  const pasteInputRef = useRef(undefined);
  const getUser = useUser();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    const fetchdata = async () => {
      const token = await user.getIdToken();
      const resdata = await axios.get(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (resdata.status === 200) {
        setData({ ...data, ...resdata.data });
        setLoading(false);
      }
    };

    let unsubscribe;

    if (user && !userLoading) {
      fetchdata();
      // Promise.resolve().then(()=>{

      // ).then(() => {
      //   setPost(mappedcommentData);
      // });
      //     }
      //   })
      // });
    }
    
  }, [user, userLoading]);

  useEffect(() => {
    // console.log(id)
    let unsubscribe;
    if (data){
      unsubscribe = onSnapshot(
        query(
          collection(db, "posts"),
          where("groupId", "==", id),
          orderBy(orderby, "desc"),
          limit(loadLimit)
        ),
        (snapshot) => {
          if (!snapshot.empty) {
            let mappedcommentData = [];
            Promise.all(
              snapshot.docs.map(async (doc) => {
                let creator = {};
                // console.log(data);
                if (data.member[doc.data().uid]) {
                  creator = data.member[doc.data().uid];
                } else {
                  const usr = await getUser([doc.data().uid]);
                  creator = usr[0];
                }
                mappedcommentData = [
                  ...mappedcommentData,
                  {
                    ...doc.data(),
                    creator: creator,
                    pid: doc.id,
                    gid: id
                  },
                ];
              })
            ).then(() => {
              setPost(mappedcommentData);
            });
          }
        }
      );
    }
    return () => unsubscribe;
  }, [data, orderby, loadLimit]);

  useEffect(() => {
    if (user && data && data.member) {
      // console.log(data);
      // const isMember = data.member.find((v) => v == user.uid);
      const isMember = Object.keys(data.member).find((v) => v == user.uid);
      if (!isMember) {
        Router.push(`/group/${id}`);
      }
      // if (find)
    }
  }, [data, user]);

  const handleImagePaste = () => {
    if (e.clipboardData.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (image.length < 4) {
            setImage([...image, reader.result]);
          } else {
            alert("ใส่รูปได้ไม่เกิน 4 รูปต่อ 1 โพสต์");
          }
        }
      };
      reader.readAsDataURL(e.clipboardData.files[0]);
    }
  };
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
  const resizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  const handleSent = async () => {
    if (!isEmptyOrSpaces(message)) {
      onClose();
      setMessage("");
      setImage([]);
      const token = await user.getIdToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${id}/create/`,
        { message: message, imageURL: "", charaId: "" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
  };

  // console.log(loading, data);
  if (!loading && data) {
    return (
      <Box
        overflowY={"auto"}
        // maxH={'960'}
        maxH={"100vh"}
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
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

        <Flex pt={55} fontFamily={"mitr"}>
          <Spacer />

          <Box
            bg={"#F3F3F3"}
            minH={896}
            h={"auto"}
            minW={800}
            maxW={800}
            boxShadow="base"
          >
            <VStack spacing={0}>
              <Flex>
                <Center
                  color={"white"}
                  minWidth={778}
                  pl={22}
                  fontWeight={"700"}
                  minH={75}
                  fontSize={28}
                  bg={"#6768AB"}
                >
                  {/* [LTLEC]Land of the lustrous : Eternity cycle */}[
                  {data?.tag}] {data?.name}
                </Center>

                <Box bg={"#6768AB"}>
                  <Popover bg={"#6768AB"}>
                    <PopoverTrigger>
                      <Info color="#FFC75A" size={22} weight="fill" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody
                        maxH={500}
                        overflowY={"auto"}
                        css={{
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "#727272",
                            borderRadius: "24px",
                          },
                        }}
                      >
                        {data.desciption
                          ? data.desciption
                          : "ไม่มีคำอธิบายคอมมู"}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              </Flex>

              <Tabs w={"100%"} maxW={800} isFitted variant="enclosed">
                {/* หัว tab */}
                <TabList mb="1em">
                  <Tab
                    _selected={{
                      color: "white",
                      bg: "#9A9AB0",
                      margin: "2",
                      borderRadius: "10",
                    }}
                  >
                    Post
                  </Tab>
                  <Tab
                    _selected={{
                      color: "white",
                      bg: "#9A9AB0",
                      margin: "2",
                      borderRadius: "10",
                    }}
                  >
                    Gallery
                  </Tab>
                  <Tab
                    _selected={{
                      color: "white",
                      bg: "#9A9AB0",
                      margin: "2",
                      borderRadius: "10",
                    }}
                  >
                    Member
                  </Tab>
                  <Tab
                    _selected={{
                      color: "white",
                      bg: "#9A9AB0",
                      margin: "2",
                      borderRadius: "10",
                    }}
                  >
                    Setting
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    {/* ประกาศ */}
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow="base"
                      h={55}
                      borderRadius={10}
                    >
                      <Center
                        borderRightRadius={10}
                        bg={"#FBBC43"}
                        w={65}
                        transform={"auto"}
                        scaleX={"-1"}
                        color={"#FFFFFF"}
                      >
                        <Megaphone size={42} />
                      </Center>

                      <Box w={"81%"} p={4}></Box>

                      <Center w={"65"} color={"gray.500"}>
                        เพิ่มเติม
                      </Center>
                    </Flex>
                    {/* กล่องข้อความ */}
                    <Flex
                      mt={3}
                      p={2}
                      boxShadow={"base"}
                      bg={"white"}
                      borderRadius={10}
                    >
                      <Image
                        mr={2}
                        rounded={"100%"}
                        h={42}
                        w={42}
                        src={user.photoURL}
                      />
                      <Text w="93%" onClick={onOpen}>
                        {message ? message : "Something"}
                      </Text>
                      {/* <Input placeholder='Basic usage' w={'93%'} /> */}
                    </Flex>
                    {/* โพสต์ */}
                    {/* {console.log(data, data.member)} */}
                    {post &&
                      post.map((apost, i) => (
                        <GroupPost post={apost} key={i} member={data.member} />
                      ))}

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay
                        bg="blackAlpha.300"
                        backdropFilter="blur(10px) hue-rotate(90deg)"
                      />
                      <ModalContent>
                        <ModalHeader>Create Post</ModalHeader>
                        <ModalCloseButton />
                        <Divider />
                        <ModalBody>
                          <Textarea
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            onPaste={handleImagePaste}
                            onKeyDown={resizeTextArea}
                          />
                          <Input
                            mt={2}
                            p={2}
                            h={"auto"}
                            display="hidden"
                            type="file"
                            ref={pasteInputRef}
                          />
                          {image && (
                            <Box>
                              <Box></Box>
                              <Box
                                display={image.length > 2 ? "initial" : "none"}
                              ></Box>
                            </Box>
                          )}
                          <Button float={"right"} onClick={handleSent}>
                            Send
                          </Button>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </TabPanel>

                  <TabPanel>
                    <p>Gallery!</p>
                  </TabPanel>

                  <TabPanel>
                    <p>Member!</p>
                  </TabPanel>

                  <TabPanel>
                    <p>Setting!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </Box>

          <Spacer />
        </Flex>
      </Box>
    );
  } else {
    return (
      <>
        <CustomNavbar />
        Loading
      </>
    );
  }
}
// console.log("test test")

export default dashboard;
