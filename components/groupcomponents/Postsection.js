import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useRef,
} from "react";
import {
  Box,
  Flex,
  Center,
  Spacer,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
  useDisclosure,
  VStack,
  HStack,
  CloseButton,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import { Skeletonpost } from "./skeletonpost";
import { usePost } from "../../src/hook/usePost";
import { CaretDown, ImageSquare } from "phosphor-react";
import { isEmptyOrSpaces } from "../../src/services/utilsservice";
import { GroupPost } from "./post";
import useCharaList from "../../src/hook/useCharaList";
import MentionBox from "../commonComponent/MentionBox";
export const PostContext = createContext();
const Postsection = ({ data, pid, user, id, selectedchara, setSelectedchara }) => {
  const [orderby, setOrderby] = useState("timestamp");
  const [loadLimit, selLoadlimit] = useState(20);
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState([]);
  const pasteInputRef = useRef(undefined);
  // const [selectedchara, setSelectedchara] = useState({});
  const inputFileRef = useRef(null);
  const submitRef = useRef(null);
  const [tag, setTag] = useState([]);

  const {
    isOpen: isMentionOpen,
    onOpen: onMentionOpen,
    onClose: onMentionClose,
  } = useDisclosure();
  const mentionRef = useRef(null);
  const [mention, setMention] = useState([]);

  if (typeof window !== "undefined") {
    document.addEventListener("mousedown", (e) => {
      if (mentionRef.current && !mentionRef.current.contains(e.target)) {
        onMentionClose();
      }
    });
  }

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
    selectedchara,
    setSelectedchara
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
    if (!isEmptyOrSpaces(message) || image.length > 0) {
      let dlurl = "";
      if (image.length > 0) {
        dlurl = await UploadGroupImage(image, user.uid, id);
      }
      const token = await user.getIdToken();
      onClose();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${id}/create/`,
        { message: message, imageUrl: dlurl, charaId: selectedchara.refererId, tag: tag, mention: mention },
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
      setMention([]);
      setTag([]);
      setImage([]);
    }
  };

  const Hashtag = (props) => {
    const removeTags = (indexToRemove) => {
      props.setState([
        ...props.state.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const addTags = (event) => {
      let tag = event.target.value.replace(",", "");
      tag = tag.trim();
      if (tag !== "") {
        props.setState([...props.state, tag]);
        // props.selectedTags([...props.state, tag]);
        event.target.value = "";
      }
    };
    return (
      <Box w={"100%"} h={"auto"} float={"left"}>
        <Box>
          <Box id="tags" mt={1.5} mb={1.5}>
            {props.state.map((tag, index) => (
              <HStack
                key={index}
                bg={"#6768AB"}
                color="white"
                borderRadius={10}
                pt={1}
                pb={1}
                pl={2}
                pr={2}
                // maxW={200}
                float="left"
                spacing={2.5}
                mr={0.5}
                ml={0.5}
                mt={0.5}
                mb={0.5}
                fontSize={16}
                w={"auto"}
              >
                <Box>{tag}</Box>
                <CloseButton
                  onClick={() => removeTags(index)}
                  rounded={"full"}
                  bg="white"
                  color={"black"}
                  h={5}
                  w={5}
                />
              </HStack>
            ))}
            <Input
              type="text"
              onKeyUp={(event) => (event.key === "," ? addTags(event) : null)}
              onBlur={addTags}
              placeholder=" ใช้ , เพื่อแบ่งประเภท"
              w={"auto"}
              isDisabled={props.isDisabled}
              // border="hidden"
              maxW={200}
              float="left"
              mr={0.5}
              ml={1}
              mb={2}
              mt={0.5}
              fontSize={16}
              h={31}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
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
        <Image mr={2} rounded={"100%"} h={42} w={42} src={user.photoURL} />
        <Text w="93%" mt={2} color={"GrayText"} onClick={onOpen}>
          {message ? message : "Say Something"}
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
        {post.length == 0 && data && data.postcount && data.postcount > 0 && (
          <Skeletonpost />
        )}
      </PostContext.Provider>

      <Modal isOpen={isOpen} size={"3xl"} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader fontFamily={"SarabunSB"}>Create Post</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Flex mb={1}>
              <Avatar
                mr={2}
                src={
                  Object.keys(selectedchara).length > 0
                    ? selectedchara.photoURL
                    : ""
                }
              />
              <Flex spacing={0} direction={"column"}>
                <Text>
                  {Object.keys(selectedchara).length > 0
                    ? selectedchara.name
                    : "Chara Name"}
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<CaretDown size={6} />}
                    height={26}
                    w={"auto"}
                  >
                    <Text fontSize="sm">{selectedchara.name}</Text>
                  </MenuButton>

                  <MenuList>
                    {data.mychara &&
                      Object.values(data.mychara).map((cha, i) => (
                        <MenuItem onClick={() => setSelectedchara(cha)} key={i}>
                          <Flex alignItems={"center"}>
                            <Avatar src={cha.photoURL} w={8} h={8} mr={1} />
                            <Text fontSize="sm">{cha.name}</Text>
                          </Flex>
                        </MenuItem>
                      ))}
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>

            <Textarea
              mt={1}
              mb={2}
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

            <Center w={"100%"} bg={"#F3F5F8"} mb={2} rounded={5}>
              <Flex width={"100%"}>
                <Center pl={3} pr={2} fontFamily={"SarabunSB"}>
                  Tag
                </Center>
                <Center p={1} width={"100%"}>
                  <Hashtag state={tag} setState={setTag} />
                </Center>
              </Flex>
            </Center>

            <Center w={"100%"} bg={"#F3F5F8"} mb={2} rounded={5}>
              <Flex width={"100%"}>
                <Center pl={3} pr={2} fontFamily={"SarabunSB"}>
                  Mention
                </Center>
                <Center p={1} width={"100%"}>
                  <MentionBox data={data} id={id} mention={mention} setMention={setMention} />
                </Center>
              </Flex>
            </Center>
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
                  <Box key={k} display={"inline-block"} pos={"relative"}>
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
                      _hover={{
                        backgroundColor: "transparent",
                      }}
                      onClick={() => setImage(image.filter((v, i) => i !== k))}
                    ></IconButton>
                  </Box>
                ))}
            </Box>
            <Flex justifyContent={"flex-end"} pos={"relative"}>
              <Button
                leftIcon={<ImageSquare size={16} />}
                onClick={handleFile}
                fontFamily={"Sarabun"}
                fontWeight={"light"}
                fontSize={14}
                boxShadow="base"
              >
                เพิ่มรูปภาพ
              </Button>
              {/* <Button
                leftIcon={<ImageSquare size={16} />}
                onClick={onMentionOpen}
                fontFamily={"Sarabun"}
                fontWeight={"light"}
                fontSize={14}
                boxShadow="base"
              >
                กล่าวถึง
              </Button>
              <Box position={"absolute"} display={isMentionOpen? "initial": "none"} left={0} top={"50px"} ref={mentionRef}>
                <DropdownCheckBox data={data} gid={id} onSubmit={()=>{}}/>
              </Box> */}

              <Spacer />
              <Button
                onClick={() => {
                  handleSent();
                  submitRef.current.disabled = true;
                }}
                disabled={
                  (isEmptyOrSpaces(message) && image.length == 0) ||
                  Object.keys(selectedchara).length == 0
                }
                ref={submitRef}
              >
                Send
              </Button>
              <Box position={"absolute"}></Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Postsection;
