import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useReducer,
} from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/react";
import { CaretDown, ImageSquare } from "phosphor-react";

import { Info, Megaphone, X } from "phosphor-react";
import { GroupPost } from "../../../components/groupcomponents/post";
import { useAuthState } from "react-firebase-hooks/auth";
import { useApp, useUser } from "../../../src/hook/local";
import { useRouter } from "next/router";
import axios from "axios";
import { UploadGroupImage } from "../../../src/services/filestoreageservice";
import Gallery from "../../../components/groupcomponents/gallery";
import { Member } from "../../../components/groupcomponents/member";
import Setting from "../../../components/groupcomponents/setting";
import { GroupSinglePost } from "../../../components/groupcomponents/singlePost";
import { isEmptyOrSpaces } from "../../../src/services/utilsservice";
import { useGroupData } from "../../../src/hook/useGroupData";
import { usePost } from "../../../src/hook/usePost";
import { Skeletonpost } from "../../../components/groupcomponents/skeletonpost";

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
  const [orderby, setOrderby] = useState("timestamp");
  const [loadLimit, selLoadlimit] = useState(20);
  const { app, auth, db } = useApp();
  const [user, userLoading, error] = useAuthState(auth);
  const Router = useRouter();
  const { id, pid, cid, rid } = Router.query;
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState([]);
  const pasteInputRef = useRef(undefined);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedchara, setSelectedchara] = useState({});
  const inputFileRef = useRef(null);
  const submitRef = useRef(null);
  const { data, loading, onRefresh } = useGroupData(id, user);
  const setPostData = (value) => {
    dispatch({ type: "setMultiple", value: value });
  };

  const { post, onPostDelete, fetchPost } = usePost(
    data,
    orderby,
    loadLimit,
    pid,
    setPostData,
    user,
    id
  );

  useEffect(() => {
    if (user && data && data.member) {
      const isMember = Object.keys(data.member).find((v) => v == user.uid);
      if (!isMember) {
        Router.push(`/group/${id}`);
      }
      // if (find)
    }
  }, [data, user]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "set": {
        // console.log(action.id, action.value, state[action.id])
        return {
          ...state,
          [action.id]: { ...state[action.id], ...action.value },
        };
      }
      case "setMultiple": {
        return { ...state, ...action.value };
      }
      default:
        return state;
    }
  };

  const [postData, dispatch] = useReducer(reducer, {});

  //main
  const setStateData = (value, id) => {
    dispatch({ type: "set", value: value, id: id });
  };
  const getStateData = (id) => {
    return postData[id];
  };

  //data
  const setStateDataData = (value, id) => {
    dispatch({ type: "set", value: { data: value }, id: id });
  };
  const getStateDataData = (id) => {
    return postData[id]?.data;
  };

  //editMessage
  const setStateDataEditMessage = (value, id) => {
    dispatch({ type: "set", value: { editMessage: value }, id: id });
  };
  const getStateDataEditMessage = (id) => {
    return postData[id]?.editMessage ? postData[id].editMessage : "";
  };

  //pendingMessage
  const setStateDataPendingMessage = (value, id) => {
    dispatch({ type: "set", value: { pendingMessage: value }, id: id });
  };
  const getStateDataPendingMessage = (id) => {
    return postData[id]?.pendingMessage ? postData[id].pendingMessage : "";
  };
  //pendingImage
  const setStateDataPendingImage = (value, id) => {
    dispatch({ type: "set", value: { pendingImage: value }, id: id });
  };
  const getStateDataPendingImage = (id) => {
    return postData[id]?.pendingImage;
  };
  //love
  const setStateDataLove = (value, id) => {
    dispatch({ type: "set", value: { love: value }, id: id });
  };
  const getStateDataLove = (id) => {
    return postData[id]?.love ? postData[id]?.love : [];
  };

  //edit
  const setStateDataEdit = (state, id) => {
    dispatch({ type: "set", value: { edit: state }, id: id });
  };
  const getStateDataEdit = (id) => {
    return postData[id]?.edit ? postData[id].edit : false;
  };

  //reply
  const setStateDataReply = (state, id) => {
    dispatch({ type: "set", value: { reply: state }, id: id });
  };
  const getStateDataReply = (id) => {
    return postData[id]?.reply ? postData[id].reply : false;
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

  const handleUploadFile = (e) => {
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
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleFile = () => {
    inputFileRef.current.click();
  };

  const resizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  const handleSent = async () => {
    console.log(!isEmptyOrSpaces(message), image.length > 0)
    if (!isEmptyOrSpaces(message) || image.length > 0) {
      let dlurl = "";
      if (image.length > 0) {
        dlurl = await UploadGroupImage(image, user.uid, id);
        // console.log(dlurl);
      }
      const token = await user.getIdToken();
      onClose();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${id}/create/`,
        { message: message, imageUrl: dlurl, charaId: selectedchara.refererId },
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
      setMessage("");
      setImage([]);
    }
  };

  console.log(loading, data);
  if (!loading && data) {
    return (
      <Box bg={'#F3F5F8'}>
        <CustomNavbar />

        <Flex justifyContent={"center"}>
          <Flex
            pt={55}
            fontFamily={"Sarabun"}
            justifyContent={"center"}
            boxShadow="base"
            minW={950}
            bg={'white'}
          >
            <Box
              minH={"calc(100vh - 55px)"}
              bg={"#F3F5F8"}
              minW={800}
              maxW={800}
              boxShadow="base"
            >
              <VStack w={'100%'} spacing={0}>
                <Flex w={'100%'}>
                  <Center
                    color={"white"}
                    pl={22}
                    w={'100%'}
                    maxW={800}
                    fontWeight={"700"}
                    minH={75}
                    fontSize={28}
                    bg={"#6768AB"}
                  >
                    [{data?.tag}] {data?.name}
                  </Center>

                  <Box p={1} bg={"#6768AB"} cursor={"pointer"}>
                    <Popover bg={"#6768AB"} >
                      <PopoverTrigger>
                        <Info color="#FFC75A" size={22} weight="fill" />
                      </PopoverTrigger>

                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody
                          whiteSpace={'pre-line'}
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
                          {data.description
                            ? data.description
                            : "ไม่มีคำอธิบายคอมมู"}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Flex>

                <Tabs
                  w={"100%"}
                  maxW={800}
                  isFitted
                  index={tabIndex}
                  onChange={(e) => setTabIndex(e)}
                >
                  {/* หัว tab */}
                  <TabList mb="1em">
                    <Tab
                      _selected={{
                        color: "white",
                        bg: "#9A9AB0",
                        margin: "2",
                        borderRadius: "10",
                      }}
                      onClick={() =>
                        Router.replace("/group/" + id + "/dashboard", undefined, {
                          shallow: true,
                        })
                      }
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
                    {/* {console.log(data)} */}
                    {data?.isStaff && (
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
                    )}
                  </TabList>

                  <TabPanels>
                    {/* Post */}
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
                        cursor={"pointer"}
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
                          Array.isArray(post) &&
                          post.map((apost, i) => (
                            <GroupPost
                              post={getStateDataData(apost)}
                              key={i}
                              member={data.member}
                              onPostDelete={() => onPostDelete(i)}
                              mychara={data.mychara}
                              data={data}
                              gid={id}
                            />
                          ))}
                        {/* {post.length > 0 && pid && (
                        <GroupSinglePost
                          post={getStateDataData(pid)}
                          member={data.member}
                          onPostDelete={() => onPostDelete(0)}
                          cid={cid}
                          rid={rid}
                          gid={id}
                          data={data}
                          mychara={data.mychara}
                        />
                      )} */}
                        {post.length == 0 &&
                          data &&
                          data.postcount &&
                          data.postcount > 0 && <Skeletonpost />}
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
                            <Text>เลือกตัวละครที่ใช้โพสต์</Text>
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<CaretDown size={8} />}
                                mt={2}
                                mb={2}
                              >
                                <Avatar
                                  src={
                                    Object.keys(selectedchara).length > 0
                                      ? selectedchara.photoURL
                                      : ""
                                  }
                                  w={8}
                                  h={8}
                                />
                              </MenuButton>
                              <MenuList>
                                {data.mychara &&
                                  Object.values(data.mychara).map((cha, i) => (
                                    <MenuItem
                                      onClick={() => setSelectedchara(cha)}
                                      key={i}
                                    >
                                      <Flex alignItems={"center"}>
                                        <Avatar
                                          src={cha.photoURL}
                                          w={8}
                                          h={8}
                                          mr={1}
                                        />
                                        <Text fontSize="sm">{cha.name}</Text>
                                      </Flex>
                                    </MenuItem>
                                  ))}
                              </MenuList>
                            </Menu>

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
                            <Input
                              type="file"
                              id="file"
                              ref={inputFileRef}
                              display="none"
                              onChange={(e) => handleUploadFile(e)}
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
                            <Flex justifyContent={"flex-end"}>
                              <IconButton
                                icon={<ImageSquare size={16} />}
                                onClick={handleFile}
                              />
                              <Button
                                onClick={() => {
                                  handleSent();
                                  submitRef.current.disabled = true;
                                }}
                                disabled={
                                  (isEmptyOrSpaces(message) &&
                                    image.length == 0) ||
                                  Object.keys(selectedchara).length == 0
                                }
                                ref={submitRef}
                              >
                                Send
                              </Button>
                            </Flex>
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </TabPanel>

                    {/* Gallery */}
                    <TabPanel>{tabIndex == 1 && <Gallery gid={id} mychara={data.mychara} />}</TabPanel>

                    {/* Member */}
                    <TabPanel>
                      {tabIndex == 2 && <Member data={data} gid={id} />}
                    </TabPanel>
                    {/* Settings */}
                    <TabPanel>
                      <SimpleGrid column={2} spacing={5}>
                        {tabIndex == 3 && <Setting data={data} gid={id} />}
                      </SimpleGrid>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
            </Box>
          </Flex>
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
