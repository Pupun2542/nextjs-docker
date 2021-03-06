import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  Tag,
  Divider,
  Image,
  Button,
  Spacer,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
  Avatar,
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
  Eye,
  DotsThreeVertical,
  ImageSquare,
  X,
  PaperPlaneRight,
  CaretDown
} from "phosphor-react";
import { GroupComment } from "./comment";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { useApp, useUser } from "../../src/hook/local";
import axios from "axios";
import {
  UploadGroupCommentImage,
  getpMutiPathfromUrl,
} from "../../src/services/filestoreageservice";
import { PostContext } from "../../pages/group/[id]/dashboard";
import { useCollection } from "react-firebase-hooks/firestore";
import { isEmptyOrSpaces } from "../../src/services/utilsservice";
import useCharaList from "../../src/hook/useCharaList";
import { useRouter } from "next/router";
export const GroupSinglePost = ({ post, member, onPostDelete, cid, rid, data, gid, mychara }) => {
  const {
    setStateDataData,
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
  } = useContext(PostContext);
  const router = useRouter();
  const {chara, refreshcharaList} = useCharaList(data, gid)
  const [selectedchara, setSelectedchara] = useState({});
  const checkChara = () => {
    if (chara[chara.findIndex(v => v.refererId == post.charaId)]) {
      return chara[chara.findIndex(v => v.refererId == post.charaId)];
    } else {
      // refreshcharaList();
      return ""
    }
  }
  const postchara = checkChara();

  const creator = Object.values(post.creator)[0];
  const getUser = useUser();
  const { auth, db } = useApp();
  const [fetchlimit, setFetchlimit] = useState(20);
  // const [love, setLove] = useState(post.love)
  const inputFileRef = useRef(null);
  const pid = post.pid;
  const TextareaRef = useRef(null);
  // const love = post.love;
  const love = getStateDataLove(pid);
  const setLove = (value) => {
    setStateDataLove(value, pid);
  };
  const editMode = getStateDataEdit(pid);
  const setEditMode = (state) => {
    setStateDataEdit(state, pid);
  };
  const editMessage = getStateDataEdit(pid);
  const setEditMessage = (value) => {
    setStateDataEdit(value, pid);
  };
  const message = getStateDataPendingMessage(pid);
  const setMessage = (value) => {
    setStateDataPendingMessage(value, pid);
  };
  const image = getStateDataPendingImage(pid);
  const setImage = (value) => {
    setStateDataPendingImage(value, pid);
  };
  const text = post.message;
  const setText = (value) => {
    setStateDataData({ ...post, message: value });
  };

  const isOpen = getStateDataReply(pid);
  const onOpen = () => {
    setStateDataReply(true, pid);
  };
  const onClose = () => {
    setStateDataReply(false, pid);
  };
  const onToggle = () => {
    setStateDataReply(!isOpen, pid);
  };

  const [snapshot, loading, error] = useCollection(
    query(
      collection(db, "group", post.gid, "posts", post.pid, "comments"),
      orderBy("timestamp", "desc"),
      limit(fetchlimit),
    )
  );
  let comment = [];
  if (snapshot) {
    Promise.all(
      snapshot.docs.map(async (doc) => {
        let mappedcommentData = {};
        let creator = {};
        if (member[doc.data().uid]) {
          creator = member[doc.data().uid];
        } else {
          const usr = await getUser([doc.data().uid]);
          creator = usr[0];
        }
        mappedcommentData = {
          ...doc.data(),
          creator: creator,
          cid: doc.id,
          pid: post.pid,
          gid: post.gid,
        };
        comment = [...comment, mappedcommentData];
      })
    );
  }

  const resizeTextArea = (e) => {
    if (!isEmptyOrSpaces(message)) {
      e.target.style.height = "inherit";
      e.target.style.height = `${e.target.scrollHeight}px`;
    } else {
      e.target.style.height = "inherit";
      e.target.style.height = `42px`;
    }
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
          post.gid
        );
      }
      const token = await auth.currentUser.getIdToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/comment/create`,
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
      // TextareaRef.current?.scrollIntoView();
    }
  };

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love.includes(auth.currentUser.uid)) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/unlove`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setLove(love.filter((v, i) => v !== auth.currentUser.uid));
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/love`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setLove([...love, auth.currentUser.uid]);
      }
    }
  };

  const handleEdit = async () => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/update`,
      {
        message: editMessage,
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
  };

  const handleDelete = async () => {
    const token = await auth.currentUser.getIdToken();
    if (post.imageUrl.length > 0) {
      const path = getpMutiPathfromUrl(post.imageUrl);
      const bucket = path[0].bucket;
      const fullpath = path.map((pat) => pat.fullpath);
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/delete`,
        {
          bucket: bucket,
          filepath: fullpath,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else {
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/delete`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
    setMessage("");
    setImage(null);
    onPostDelete();
    setComment([]);
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

  if (post) {
    return (
      <Flex
        mt={3}
        p={2}
        boxShadow={"base"}
        bg={"white"}
        borderRadius={10}
        direction={"column"}
      >
        <Flex w={"100%"}>
          <Avatar
            mr={2}
            rounded={"100%"}
            h={50}
            w={50}
            src={postchara.name? postchara.photoURL : creator.photoURL}
            name={postchara.name? postchara.name : creator.displayName}
            
          />
          <VStack w={"100%"} spacing={0}>
            <Box fontSize={18} w={"100%"} onClick={postchara.name? ()=>{}: ()=>router.push("../../profile/"+creator?.uid)} cursor={"pointer"}>
              {postchara.name? postchara.name : creator.displayName}
            </Box>
            <Flex w={"100%"} fontSize={14} color={"gray.400"}>
              <Box
                onClick={postchara.name? ()=>router.push("../../profile/"+creator?.uid): ()=>{}}
                cursor={"pointer"}
              >
                {postchara.name? creator.displayName: ""}
              </Box>
              <Spacer />
              <Box float={"right"}>
                {post.timestamp
                  ? parseDate(post.timestamp)
                  : "01/01/1970:00.00"}
              </Box>
            </Flex>
            <Divider />
          </VStack>
          <Menu>
            <MenuButton ml={5}>
              <IconButton
                icon={<DotsThreeVertical size={20} />}
                rounded={"full"}
              />
            </MenuButton>
            <MenuList>
              {auth.currentUser.uid == post.uid ? (
                <>
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
        </Flex>
        
        <Flex
          p={2}
          pl={55}
          pr={55}
          direction={"column"}
        >
          
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
            <Box w={"100%"} fontSize={16}>
              <Text whiteSpace="pre-line">{text ? text : ""}</Text>
            </Box>
          )}

          <Center mt={3} w={"100%"} borderRadius={10} boxShadow={"base"}>
            <Box
              display={"flex"}
              overflowX="auto"
              overflowY="hidden"
              whiteSpace="nowrap"
              alignContent={"center"}
            >
              {post.imageUrl &&
                post.imageUrl.map((img, k) => (
                  <Image
                    key={k}
                    size={300}
                    color="#100e0e"
                    weight="light"
                    src={img}
                    objectFit={"contain"}
                    display={"inline-block"}
                    borderRadius={10}
                  />
                ))}
            </Box>
          </Center>
        </Flex>
        <VStack w={"100%"} spacing={0}>
            <Flex direction={"column"} justifyContent={"center"} w={"100%"} pl={55} pr={55}>
              <HStack
                spacing={4}
                w={"100%"}
                fontSize={14}
                color={"GrayText"}
                pt={2}
              >
                <Button
                  leftIcon={
                    <Heart
                      weight={
                        love.includes(auth.currentUser.uid) ? "fill" : "regular"
                      }
                    />
                  }
                  color={
                    love.includes(auth.currentUser.uid) ? "#EA4545" : "black"
                  }
                  width={"40%"}
                  fontSize={16}
                  fontWeight={"light"}
                  boxShadow={"base"}
                  variant="solid"
                  onClick={HandleLove}
                >
                  {getStateDataLove(post.pid).length}
                </Button>
                <Button
                  leftIcon={<ChatCenteredText />}
                  color="black"
                  width={"100%"}
                  fontSize={16}
                  fontWeight={"light"}
                  boxShadow={"base"}
                  variant="solid"
                  onClick={onToggle}
                >
                  {post.comment > comment?.length
                    ? post.comment
                    : comment?.length}
                </Button>
                <Button
                  leftIcon={<Eye />}
                  color="black"
                  width={"40%"}
                  fontSize={16}
                  fontWeight={"light"}
                  boxShadow={"base"}
                  variant="solid"
                >
                  {post.view}
                </Button>
              </HStack>

              <Box>
                {isOpen && (
                  <>
                    {post.comment > fetchlimit && (
                      <Text
                        decoration="underline"
                        onClick={() => setFetchlimit(fetchlimit + 20)}
                        cursor="pointer"
                      >
                        Load more
                      </Text>
                    )}
                    {comment?.length > 0 &&
                      comment
                        .map((cmt, i) => (
                          <Box key={i} id={cmt.cid}>
                            <GroupComment comment={cmt} member={member} data={data} gid={gid} mychara={mychara} />
                          </Box>
                        ))
                        .reverse()}
                  </>
                )}
              </Box>

              <Flex mt={2}>
                <Box mr={1}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<CaretDown size={8} />}
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
                    {mychara &&
                      Object.values(mychara).map((cha) => (
                        <MenuItem onClick={() => setSelectedchara(cha)}>
                          <Flex alignItems={"center"}>
                            <Avatar src={cha.photoURL} w={8} h={8} mr={1} />
                            <Text fontSize="sm">{cha.name}</Text>
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
                  />
                </Box>
              </Flex>
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

              <Input
                type="file"
                id="file"
                ref={inputFileRef}
                display="none"
                onChange={(e) => handleUploadFile(e)}
              />
            </Flex>
        </VStack>
      </Flex>
    );
  } else {
    return <>???????????????????????????????????????????????????</>;
  }
};

const parseDate = (seconds) => {
  const date = new Date(seconds._seconds * 1000);
  // const date = seconds.toDate();
  const formatted = date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const spdate = formatted.split(" ");
  const formatted2 = `${spdate[0]} [${spdate[1]}]`;
  return formatted2;
};
