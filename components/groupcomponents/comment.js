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
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  DotsThreeVertical,
  ImageSquare,
  PaperPlaneRight,
  X,
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

export const GroupComment = ({ comment, member }) => {
  const {
    getStateData,
    setStateDataData,
    getStateDataData,
    setStateDataEditMessage,
    getStateDataEditMessage,
    setStateDataPendingMessage,
    getStateDataPendingMessage,
    setStateDataPendingImage,
    getStateDataPendingImage,
    getStateDataLove,
    setStateDataEdit,
    getStateDataEdit,
    setStateDataReply,
    getStateDataReply,
    setPostData,
    setStateDataChild,
    getStateDataChild,
  } = useContext(PostContext);
  const creator = comment.creator;
  const getUser = useUser();
  const { auth, db } = useApp();
  const [fetchlimit, setFetchlimit] = useState(20);
  const inputFileRef = useRef(null);
  const cid = comment.cid;
  const TextareaRef = useRef(null);
  // console.log(getStateData(cid));
  // const love = getStateDataLove(cid);
  // const setLove = (value) => {
  //   console.log(love, value, cid);
  // };
  const love = comment.love;
  const editMode = getStateDataEdit(cid);
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
  // const reply = getStateDataChild(cid);
  // const setReply = (value) => {
  //   setStateDataChild(value, cid);
  // };
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
  console.log(comment);

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

  // useEffect(() => {
  //   console.log("fetchreply")
  //   const unsubscribe = onSnapshot(
  //     query(
  //       collection(
  //         db,
  //         "group",
  //         comment.gid,
  //         "posts",
  //         comment.pid,
  //         "comments",
  //         comment.cid,
  //         "replies"
  //       ),
  //       orderBy("timestamp", "desc"),
  //       limit(fetchlimit)
  //     ),
  //     (snapshot) => {
  //       if (!snapshot.empty) {
  //         let mappedcommentData = {};
  //         let commentList = [];
  //         console.log(cid,getStateData(cid));
  //         Promise.all(
  //           snapshot.docs.map(async (doc) => {
  //             let creator = {};
  //             // console.log(member, doc.data().uid)
  //             if (member[doc.data().uid]) {
  //               creator = member[doc.data().uid];
  //             } else {
  //               const usr = await getUser([doc.data().uid]);
  //               creator = usr[0];
  //             }
  //             mappedcommentData = {
  //               ...mappedcommentData,
  //               [doc.id]: {
  //                 ...getStateData(doc.id),
  //                 data: {
  //                   ...doc.data(),
  //                   creator: creator,
  //                   cid: comment.cid,
  //                   pid: comment.pid,
  //                   gid: comment.gid,
  //                   rid: doc.id,
  //                 },
  //                 love: doc.data().love,
  //               },
  //             };
  //             // setStateData({data: mappedcommentData, love: doc.data().love}, doc.id);
  //             commentList = [...commentList, doc.id];
  //           })
  //         ).then(() => {
  //           setPostData(mappedcommentData);
  //           setStateDataChild(commentList, cid);
  //         });
  //       }
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //     // setReply([]);
  //     // setText("");
  //   };
  // }, [comment]);

  // const ToggleReplyTab = () => {
  //   setOpenReply(!isOpen);
  //   onToggle();
  // };

  const resizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

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
        { message: message, imageUrl: dlurl, charaId: "" },
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
    <Flex mt={3} p={2} boxShadow={"base"} w={"100%"}>
      <Box w={"7%"}>
        <Avatar
          mr={2}
          rounded={"100%"}
          h={42}
          w={42}
          src={creator.photoURL}
          name={creator.displayName}
        />
      </Box>

      <Box pl={2} pr={2} w={"90%"}>
        <HStack spacing={4}>
          <Box ml={2}>{creator.displayName}</Box>
          <Spacer />
          <Box color={"gray.500"} fontSize={14}>
            {parseDate(comment.timestamp)}
          </Box>
        </HStack>

        <Divider />

        {editMode ? (
          // <InputGroup>
          <Textarea
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
          <Box fontSize={14} minW={"625"} w={"auto"} maxW={600}>
            <Text whiteSpace="pre-line">{text ? text : ""}</Text>
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

        <HStack spacing={4} fontSize={14} color={"GrayText"} pt={2}>
          <Button
            leftIcon={
              <Heart
                weight={
                  love.includes(auth.currentUser.uid) ? "fill" : "regular"
                }
              />
            }
            color={love.includes(auth.currentUser.uid) ? "red" : "black"}
            width={"40%"}
            fontSize={16}
            fontWeight={"light"}
            boxShadow={"base"}
            variant="solid"
            onClick={HandleLove}
          >
            {love.length}
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
            {comment.reply}
          </Button>
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
                  <GroupReply reply={rpy} key={i} member={member} />
                </Box>
              ))
              .reverse()}
          </>
        )}

        <Flex mt={2}>
          <Box w={"8%"} mr={1}>
            <Avatar
              mr={2}
              rounded={"100%"}
              h={42}
              w={42}
              src={auth.currentUser.photoURL}
              name={auth.currentUser.displayName}
            />
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
      </Box>

      <Menu>
        <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
          <DotsThreeVertical size={30} />
        </MenuButton>
        <MenuList>
          {auth.currentUser.uid == comment.uid ? (
            <>
              {/* {console.log(post)} */}
              <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
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
