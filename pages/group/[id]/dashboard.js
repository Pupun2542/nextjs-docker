import React, { useState, useEffect, useRef, createContext, useReducer } from "react";
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
  IconButton,
} from "@chakra-ui/react";

import { Info, Megaphone, X } from "phosphor-react";
import { GroupPost } from "../../../components/groupcomponents/post";
import { useAuthState } from "react-firebase-hooks/auth";
import { useApp, useUser } from "../../../src/hook/local";
import { useRouter } from "next/router";
import axios from "axios";
import { UploadGroupImage } from "../../../src/services/filestoreageservice";
import Gallery from "../../../components/groupcomponents/gallery";
import { Member } from "../../../components/groupcomponents/member";

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;
//   const res = await fetch(`${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}`);

//   let data = await res.json();
// // console.log("rerender")
//   return { props: { data } };
// }
export const PostContext = createContext();
function dashboard() {
  const [data, setData] = useState(undefined);
  const [orderby, setOrderby] = useState("timestamp");
  const [loadLimit, selLoadlimit] = useState(20);
  const { app, auth, db } = useApp();
  const [user, userLoading, error] = useAuthState(auth);
  const Router = useRouter();
  const { id } = Router.query;
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState([]);
  const pasteInputRef = useRef(undefined);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [replyTab, setReplyTab] = useState({});
  const [comment, setComment] = useState({});
  const [editComment, setEditComment] = useState({});

  const onPostDelete = (n) => {
    const newindex = post.filter((v, i) => i !== n);
    setPost(newindex);
  };

  const fetchPost = async () => {
    const token = await user.getIdToken();
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${id}?orderby=${orderby}&loadlimit=${loadLimit}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      // console.log(res.data);
      // setPost(res.data);
      let item = {};
      let postId = [];
      res.data.map((data) => {
        item = {...item, [data.pid]:{data: data, love: data.love}}

        // setStateData({data: data, love: data.love}, data.pid);
        postId = [...postId, data.pid];
      });
      // console.log(item);
      setPostData(item);
      setPost(postId);
    }
  };
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

  useEffect(() => {
    if (user && !userLoading) {
      fetchdata();
    }
  }, [user, userLoading]);

  useEffect(() => {
    console.log("fetchpost");
    if (data) {
      fetchPost();
    }
  }, [data, orderby, loadLimit]);

  useEffect(() => {
    if (user && data && data.member) {
      const isMember = Object.keys(data.member).find((v) => v == user.uid);
      if (!isMember) {
        Router.push(`/group/${id}`);
      }
      // if (find)
    }
  }, [data, user]);

  const setStateReplyTab = (state, id) => {
    setReplyTab({ ...replyTab, [id]: state });
  };
  const setStateEditMode = (state, id) => {
    setEditComment({ ...editComment, [id]: state });
  };
  const setStateOngoingComment = (value, id) => {
    setComment({ ...comment, [id]: value });
  };
  const setStateComment = (state, id) => {
    setEditComment({ ...editComment, [id]: state });
  };


 const reducer = (state, action) => {
  switch (action.type) {
    case "set": {
      // console.log(action.id, action.value, state[action.id])
      return {...state, [action.id]:{...state[action.id], ...action.value} }
    }
    case "setMultiple": {
      return {...state, ...action.value}
    }
    default: return state;
  }
 }

  const [postData, dispatch] = useReducer(reducer, {});

  // useEffect(()=>{
  //   console.log(postData);
  // },[postData])

  const setPostData = (value) => {
    dispatch({type:"setMultiple", value: value});
  }

  //main
  const setStateData = (value, id) => {
    dispatch({type: "set", value: value, id: id})
  };
  const getStateData = (id) => {
    return postData[id];
  };

  //data
  const setStateDataData = (value, id) => {
    dispatch({type: "set", value: {data: value}, id: id})
  };
  const getStateDataData = (id) => {
    return postData[id]?.data;
  };

  //editMessage
  const setStateDataEditMessage = (value, id) => {
    dispatch({type: "set", value: { editMessage: value }, id: id})
  };
  const getStateDataEditMessage = (id) => {
    return postData[id]?.editMessage ? postData[id].editMessage : "";
  };

  //pendingMessage
  const setStateDataPendingMessage = (value, id) => {
    dispatch({type: "set", value: { pendingMessage: value }, id: id})
  };
  const getStateDataPendingMessage = (id) => {
    return postData[id]?.pendingMessage? postData[id].pendingMessage:"";
  };
  //pendingImage
  const setStateDataPendingImage = (value, id) => {
    dispatch({type: "set", value: { pendingImage: value }, id: id})
  };
  const getStateDataPendingImage = (id) => {
    return postData[id]?.pendingImage;
  };
  //love
  const setStateDataLove = (value, id) => {
    dispatch({type: "set", value: { love: value }, id: id})
  };
  const getStateDataLove = (id) => {
    return postData[id]?.love ? postData[id]?.love : [];
  };

  //edit
  const setStateDataEdit = (state, id) => {
    dispatch({type: "set", value: { edit: state }, id: id})
  };
  const getStateDataEdit = (id) => {
    return postData[id]?.edit ? postData[id].edit : false;
  };

  //reply
  const setStateDataReply = (state, id) => {
    dispatch({type: "set", value: { reply: state }, id: id})
  };
  const getStateDataReply = (id) => {
    return postData[id]?.reply ? postData[id].reply : false;
  };
  //child
  const setStateDataChild = (value, id) => {
    dispatch({type: "set", value: { child: value }, id: id})
  };
  const getStateDataChild = (id) => {
    return postData[id]?.child? postData[id].child : [];
  };
  const pack = {
    setStateData,
    getStateData,
    setStateDataData,
    getStateDataData,
    setStateDataEditMessage,
    getStateDataEditMessage,
    setStateDataPendingMessage,
    getStateDataPendingMessage,
    setStateDataPendingImage,
    getStateDataPendingImage,
    setStateDataLove,
    getStateDataLove,
    setStateDataEdit,
    getStateDataEdit,
    setStateDataReply,
    getStateDataReply,
    postData,
    setPostData,
    setStateDataChild,
    getStateDataChild,
  };
  const handleImagePaste = (e) => {
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
    if (!isEmptyOrSpaces(message) || image.length > 0) {
      let dlurl = "";
      if (image.length > 0) {
        dlurl = await UploadGroupImage(image, user.uid, id);
        // console.log(dlurl);
      }
      const token = await user.getIdToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${id}/create/`,
        { message: message, imageUrl: dlurl, charaId: "" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        fetchPost();
      } else {
        alert(res.status + " : " + res.data);
      }
      onClose();
      setMessage("");
      setImage([]);
    }
  };

  // console.log(loading, data);
  if (!loading && data) {
    return (
      <Box>
        <CustomNavbar />

        <Flex pt={55} fontFamily={"mitr"} justifyContent={'center'} boxShadow='base'>

          <Box
            bg={"#F3F3F3"}
            minH={1000}
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

                <Box bg={"#6768AB"} cursor={'pointer'}>
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

              <Tabs w={"100%"} maxW={800} isFitted>
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
                    isDisabled
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
                    {/* <Flex
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
                    </Flex> */}
                    {/* กล่องข้อความ */}
                    <Flex
                      mt={3}
                      p={2}
                      boxShadow={"base"}
                      bg={"white"}
                      borderRadius={10}
                      cursor={'pointer'}
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
                    {/* {console.log(post)} */}
                    <PostContext.Provider value={pack}>
                      {post &&
                        post.map((apost, i) => (
                          <GroupPost
                            post={getStateDataData(apost)}
                            key={i}
                            member={data.member}
                            openReply={replyTab}
                            setOpenReply={setStateReplyTab}
                            setEditComment={setStateEditMode}
                            onGoingComment={comment}
                            setOnGoingComment={setStateOngoingComment}
                            onPostDelete={() => onPostDelete(i)}
                          />
                        ))}
                    </PostContext.Provider>
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
                            display="none"
                            type="file"
                            ref={pasteInputRef}
                          />
                          {/* {image && (
                            <Box>
                              <Box></Box>
                              <Box
                                display={image.length > 2 ? "initial" : "none"}
                              ></Box>
                            </Box>
                          )} */}
                          <Box
                            w="100%"
                            height={150}
                            overflowX="auto"
                            overflowY="hidden"
                            whiteSpace="nowrap"
                            display={image.length > 0 ? "inline-block" : "none"}
                          >
                            {image.length > 0 &&
                              image.map((img, k) => (
                                <Box
                                  key={k}
                                  display={"inline-block"}
                                  pos={"relative"}
                                >
                                  <Image
                                    src={img}
                                    width={150}
                                    height={150}
                                    objectFit="cover"
                                  />
                                  <IconButton
                                    icon={<X size={16} color="black" />}
                                    position="absolute"
                                    top={"-6px"}
                                    left={114}
                                    backgroundColor="transparent"
                                    _hover={{ backgroundColor: "transparent" }}
                                    onClick={() =>
                                      setImage(image.filter((v, i) => i !== k))
                                    }
                                  ></IconButton>
                                </Box>
                              ))}
                          </Box>
                          <Button
                            float={"right"}
                            onClick={handleSent}
                            disabled={
                              isEmptyOrSpaces(message) && image.length == 0
                            }
                          >
                            Send
                          </Button>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </TabPanel>

                  <TabPanel>
                    <Gallery gid={id} />
                  </TabPanel>

                  <TabPanel>
                    <Member />
                  </TabPanel>

                  <TabPanel>
                    <p>Setting!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </Box>
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
