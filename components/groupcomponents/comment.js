import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  Divider,
  Image,
  Button,
  Spacer,
  IconButton,
  Input,
  Textarea,
  Avatar,
  useDisclosure,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  DotsThreeVertical,
  ImageSquare,
  PaperPlaneRight,
  X,
  CaretDown
} from "phosphor-react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { GroupReply } from "./reply";
import { useApp, useUser } from "../../src/hook/local";
import axios from "axios";
import { UploadGroupCommentImage } from "../../src/services/filestoreageservice";
import { PostContext } from "../../pages/group/[id]/dashboard";
import { useCollection } from "react-firebase-hooks/firestore";
import useCharaList from "../../src/hook/useCharaList";
import { isEmptyOrSpaces } from "../../src/services/utilsservice";
import { useRouter } from "next/router";

export const GroupComment = ({ comment, member, data, gid, mychara }) => {
  const {
    setStateDataData,
    setStateDataEditMessage,
    getStateDataEditMessage,
    setStateDataPendingMessage,
    getStateDataPendingMessage,
    setStateDataPendingImage,
    getStateDataPendingImage,
    setStateDataEdit,
    getStateDataEdit,
    setStateDataReply,
    getStateDataReply,
  } = useContext(PostContext);
  const creator = comment.creator;
  const getUser = useUser();
  const { auth, db } = useApp();
  const [fetchlimit, setFetchlimit] = useState(20);
  const inputFileRef = useRef(null);
  const cid = comment.cid;
  const TextareaRef = useRef(null);
  const love = comment.love;
  const editMode = getStateDataEdit(cid);
  const [selectedchara, setSelectedchara] = useState({});
  const router = useRouter();
  const { chara, refreshcharaList } = useCharaList(data, gid);
  const checkChara = () => {
    // console.log(chara[chara.findIndex(v => v.refererId = comment.charaId)])
    if (chara[chara.findIndex(v => v.refererId == comment.charaId)]) {
      return chara[chara.findIndex(v => v.refererId == comment.charaId)];
    } else {
      // refreshcharaList();
      return ""
    }
  }
  const postchara = checkChara();

  const setEditMode = (state) => {
    setStateDataEdit(state, cid);
  };
  const editMessage = getStateDataEditMessage(cid);
  const setEditMessage = (value) => {
    setStateDataEditMessage(value, cid);
  };
  const message = getStateDataPendingMessage(cid);
  const setMessage = (value) => {
    setStateDataPendingMessage(value, cid);
  };
  const image = getStateDataPendingImage(cid);
  const setImage = (value) => {
    setStateDataPendingImage(value, cid);
  };
  const text = comment.message;
  const setText = (value) => {
    setStateDataData({ ...comment, message: value });
  };

  const isOpen = getStateDataReply(cid);
  const onOpen = () => {
    setStateDataReply(true, cid);
  };
  const onClose = () => {
    setStateDataReply(false, cid);
  };
  const onToggle = () => {
    setStateDataReply(!isOpen, cid);
  };

  const [snapshot, loading, error] = useCollection(
    query(
      collection(
        db,
        "group",
        comment.gid,
        "posts",
        comment.pid,
        "comments",
        comment.cid,
        "replies"
      ),
      orderBy("timestamp", "desc"),
      limit(fetchlimit)
    )
  );

  let reply = [];
  if (!loading) {
    Promise.all(
      snapshot.docs.map(async (doc) => {
        let mappedcommentData = {};
        let creator = {};
        // console.log(member, doc.data().uid)
        if (member[doc.data().uid]) {
          creator = member[doc.data().uid];
        } else {
          const usr = await getUser([doc.data().uid]);
          creator = usr[0];
        }
        mappedcommentData = {
          ...doc.data(),
          creator: creator,
          cid: comment.cid,
          pid: comment.pid,
          gid: comment.gid,
          rid: doc.id,
        };
        reply = [...reply, mappedcommentData];
      })
    );
  }

  const resizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  const handleSent = async () => {
    if (!isEmptyOrSpaces(message) || image) {
      let dlurl = "";
      if (image) {
        dlurl = await UploadGroupCommentImage(
          image,
          auth.currentUser.uid,
          comment.gid
        );
      }
      const token = await auth.currentUser.getIdToken();
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${comment.gid}/${comment.pid}/comment/${comment.cid}/reply/create`,
        { message: message, imageUrl: dlurl, charaId: selectedchara.refererId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessage("");
      setImage("");
      onOpen();
      TextareaRef.current?.scrollIntoView();
    }
  };

  const handleDelete = async () => {
    const token = await auth.currentUser.getIdToken();
    if (comment.imageUrl) {
      const path = getpathfromUrl(replydoc.imageUrl);
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${comment.gid}/${comment.pid}/comment/${comment.cid}/delete`,
        {
          bucket: path.bucket,
          filepath: path.fullPath,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else {
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${comment.gid}/${comment.pid}/comment/${comment.cid}/delete`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
    // setMessage("");
    // console.log(getpathfromUrl(commentdoc.imageURL))
  };

  const handleEdit = async () => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${comment.gid}/${comment.pid}/comment/${comment.cid}/update`,
      {
        message: message,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      setText(editMessage);
      setEditMode(false);
    } else {
      alert(res.data);
    }
    // setMessage(editMessage);
    // console.log(getpathfromUrl(commentdoc.imageURL))
  };

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love.includes(auth.currentUser.uid)) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${comment.gid}/${comment.pid}/comment/${comment.cid}/unlove`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        // setLove(love.filter((v, i) => v !== auth.currentUser.uid));
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${comment.gid}/${comment.pid}/comment/${comment.cid}/love`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        // setLove([...love, auth.currentUser.uid]);
      }
    }
  };

  const handleUploadFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleFile = () => {
    inputFileRef.current.click();
  };
  const handleImagePaste = (e) => {
    if (e.clipboardData.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.clipboardData.files[0]);
    }
  };

  return (
    <Flex borderRadius={5} bg={'gray.100'} mt={2} p={1} boxShadow={'base'}>
      {/* <Center m={1}>
        <VStack spacing={0} mt={2} >
          <Box w={'22px'} borderColor={'#636363'} height={'120'} borderLeftWidth={3} ></Box>
          <Box
            borderColor={'#636363'}
            borderBottomLeftRadius={10}
            borderBottomStyle={'solid'}
            borderBottomWidth={3}
            borderLeftWidth={3}
            height={'45px'}
            w={'22px'}
            borderLeftStyle={'solid'}
          ></Box>
        </VStack>
      </Center> */}

      <Flex
        bg={'white'}
        p={2}
        boxShadow={"base"}
        direction={"column"}
        float={"right"}
        borderRadius={10}
        w={"100%"}
      >
        <Flex w={"100%"}>
          <Avatar
            mr={2}
            rounded={"100%"}
            h={45}
            w={45}
            src={postchara.name ? postchara.photoURL : creator.photoURL}
            name={postchara.name ? postchara.name : creator.displayName}

          />
          <VStack w={"100%"} spacing={0}>
            <Box fontSize={18} w={"100%"} onClick={postchara.name ? () => { } : () => router.push("../../profile/" + creator?.uid)} cursor={"pointer"}>
              {postchara.name ? postchara.name : creator.displayName}
            </Box>
            <Flex w={"100%"} fontSize={14} color={"gray.400"}>
              <Box
                cursor={"pointer"}
                onClick={postchara.name ? () => router.push("../../profile/" + creator?.uid) : () => { }}
              >
                {postchara.name ? creator.displayName : ""}
              </Box>
              <Spacer />
              <Box float={"right"}>{parseDate(comment.timestamp)}</Box>
            </Flex>
            <Divider mb={2} />

            <Flex justifyContent={"center"} w={"100%"}>
              <Flex direction={"column"} w={"100%"}>
                {editMode ? (
                  // <InputGroup>
                  <Textarea
                    w={"100%"}
                    resize="none"
                    minHeight={11}
                    onKeyDown={(e) => {
                      if (e.key == "Enter" && !e.shiftKey) {
                        handleEdit();
                      } else if (e.key == "Escape") {
                        // if (image != checkImage.current) {
                        //   setImage(checkImage.current);
                        // }
                        setEditMode(false);
                      }
                    }}
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    width="100%"
                    placeholder="Write Something"
                    height="45px"
                    backgroundColor="gray.100"
                    mb={2.5}
                  />
                ) : (
                  //  <InputRightElement>
                  //   <IconButton
                  //     paddingTop={1}
                  //     h={15}
                  //     w={11}
                  //     borderRadius={100}
                  //     onClick={handleFile}
                  //     icon={<ImageSquare size={32} weight="bold" />}
                  //   />
                  // </InputRightElement>
                  // </InputGroup>
                  <Box fontSize={14} w={"100%"}>
                    <Text mt={2} w={"100%"} whiteSpace="pre-line">
                      {text ? text : ""}
                    </Text>
                  </Box>
                )}

                <Center mt={3} w={"100%"} borderRadius={10} boxShadow={"base"}>
                  {comment.imageUrl && (
                    <Image
                      size={300}
                      color="#100e0e"
                      weight="light"
                      src={comment.imageUrl}
                      objectFit={"contain"}
                      display={"inline-block"}
                    />
                  )}
                </Center>

                <HStack
                  mt={2}
                  spacing={4}
                  w={"100%"}
                  fontSize={14}
                  color={"GrayText"}
                  p={1}
                  boxShadow={'base'}
                  bg={'gray.100'}
                  borderRadius={5}
                >
                  <Button
                    leftIcon={
                      <Heart
                        weight={
                          love.includes(auth.currentUser.uid)
                            ? "fill"
                            : "regular"
                        }
                      />
                    }
                    color={
                      love.includes(auth.currentUser.uid) ? "#EA4545" : "black"
                    }
                    width={"35%"}
                    fontSize={16}
                    fontWeight={"light"}
                    boxShadow={"base"}
                    variant="solid"
                    onClick={HandleLove}
                    bg={'white'}
                    h={30}
                  >
                    {love.length}
                  </Button>
                  <Button
                    leftIcon={<ChatCenteredText />}
                    color="black"
                    width={"35%"}
                    fontSize={16}
                    fontWeight={"light"}
                    boxShadow={"base"}
                    variant="solid"
                    onClick={onToggle}
                    bg={'white'}
                    h={30}
                  >
                    {comment.reply}
                  </Button>
                  <Box w={'100%'}></Box>
                </HStack>
                {/* {console.log(reply)} */}
                {isOpen && (
                  <>
                    {comment.reply > fetchlimit && (
                      <Text
                        decoration="underline"
                        onClick={() => setFetchlimit(fetchlimit + 20)}
                        cursor="pointer"
                      >
                        Load more
                      </Text>
                    )}
                    {reply
                      .map((rpy, i) => (
                        <Box key={i}>
                          <GroupReply
                            reply={rpy}
                            key={i}
                            member={member}
                            gid={gid}
                            mychara={mychara}
                            data={data}
                          />
                        </Box>
                      ))
                      .reverse()}
                  </>
                )}

                {image && (
                  <Box pos={"relative"}>
                    <Image
                      src={image}
                      width="250px"
                      height="250px"
                      onClick={() => setModalOpen(true)}
                      objectFit="cover"
                    />
                    <IconButton
                      icon={<X size={16} color="black" />}
                      position="absolute"
                      top={0}
                      left={200}
                      backgroundColor="transparent"
                      _hover={{ backgroundColor: "transparent" }}
                      onClick={() => setImage(null)}
                    ></IconButton>
                  </Box>
                )}
              </Flex>
            </Flex>
          </VStack>

          <Menu>
            <MenuButton ml={1} h={10} w={10}>
              <IconButton
                icon={<DotsThreeVertical size={15} />}
                rounded={"full"}
                size={'sm'}
              />
            </MenuButton>
            <MenuList>
              {auth.currentUser.uid == comment.uid ? (
                <>
                  {/* {console.log(post)} */}
                  <MenuItem
                    onClick={() => {
                      setEditMode(true);
                      setEditMessage(text);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </>
              ) : (
                <MenuItem>Report</MenuItem>
              )}
            </MenuList>
          </Menu>

          <Input
            type="file"
            id="file"
            ref={inputFileRef}
            display="none"
            onChange={(e) => handleUploadFile(e)}
          />
        </Flex>

        <Flex mt={2}>
          <Box mr={1}>
            <Menu>
              <MenuButton 
                w={42}
                h={42}
                _hover={{
                  bg: 'gray.100',
                  borderRadius: '5'
                }}
              >
                <Avatar
                  src={
                    Object.keys(selectedchara).length > 0
                      ? selectedchara.photoURL
                      : ""
                  }
                  w={30}
                  h={30}
                />
              </MenuButton>
              <MenuList>
                {mychara &&
                  Object.values(mychara).map((cha) => (
                    <MenuItem onClick={() => setSelectedchara(cha)}>
                      <Flex alignItems={"center"}>
                        <Avatar src={cha.photoURL} w={30} h={30} mr={2} />
                        <Text fontSize={16}>{cha.name}</Text>
                      </Flex>
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          </Box>
          <Textarea
            resize="none"
            minHeight={11}
            width="100%"
            placeholder="Write Something"
            height="42px"
            backgroundColor="gray.100"
            value={message}
            ref={TextareaRef}
            onKeyDown={(e) => {
              resizeTextArea(e);
              // if (e.key == "Enter" && !e.shiftKey) {
              //   // console.log('message sent')
              //   handleSent();
              // }
            }}
            onChange={(e) => setMessage(e.target.value)}
            onPaste={handleImagePaste}
          />
          <Box pl={2} whiteSpace="nowrap">
            <IconButton
              rounded={"full"}
              icon={<ImageSquare size={28} />}
              mr={2}
              onClick={handleFile}
            />
            <IconButton
              rounded={"full"}
              icon={<PaperPlaneRight size={28} />}
              onClick={handleSent}
              disabled={(isEmptyOrSpaces(message) && image) || Object.keys(selectedchara).length == 0}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

const parseDate = (seconds) => {
  // const date = new Date(seconds._seconds * 1000);
  const date = seconds.toDate();
  const formatted = date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const spdate = formatted.split(" ");
  const formatted2 = `${spdate[0]} [${spdate[1]}]`;
  // console.log(formatted2)
  return formatted2;
  // console.log(seconds.toDate());
};
