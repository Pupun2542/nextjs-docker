import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  Eye,
  DotsThreeVertical,
  ImageSquare,
  NotePencil,
} from "phosphor-react";
import { GroupComment } from "./comment";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useApp, useUser } from "../../src/hook/local";
import axios from "axios";

export const GroupPost = ({
  post,
  member,
  openReply,
  setOpenReply,
  setEditComment,
}) => {
  const creator = post.creator;
  const getUser = useUser();
  // console.log(post);
  const { auth, db } = useApp();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [comment, setComment] = useState([]);
  const [fetchlimit, setFetchlimit] = useState(20);
  const [message, setMessage] = useState("");
  const [love, setLove] = useState(false);
  const [lovecount, setLovecount] = useState(0);
  useEffect(() => {
    if (post.love.includes(auth.currentUser.uid)) {
      setLove(true);
    }
    // setMessage(cdoc.message);
    setLovecount(post.love.length);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "group", post.gid, "posts", post.pid, "comments"),
        orderBy("timestamp", "desc"),
        limit(fetchlimit)
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          let mappedcommentData = [];
          Promise.all(
            snapshot.docs.map(async (doc) => {
              let creator = {};
              // console.log(member, doc.data().uid)
              if (member[doc.data().uid]) {
                creator = member[doc.data().uid];
              } else {
                const usr = await getUser([doc.data().uid]);
                creator = usr[0];
              }
              mappedcommentData = [
                ...mappedcommentData,
                {
                  ...doc.data(),
                  creator: creator,
                  cid: doc.id,
                  pid: post.pid,
                  gid: post.gid,
                },
              ];
            })
          ).then(() => {
            setComment(mappedcommentData);
          });
        }
      }
    );
    return () => {
      unsubscribe();
      onClose();
      setComment([])
      setLove(false);
      setLovecount(0);
    };
  }, [post]);

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
    if (!isEmptyOrSpaces(message)) {
      // setImage([]);
      const token = await auth.currentUser.getIdToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/comment/create`,
        { message: message, imageURL: "", charaId: "" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("before set", message);
      setMessage("");
      console.log("after set", message);
    }
  };

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love) {
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
        setLovecount(lovecount-1)
        setLove(false);
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
        setLovecount(lovecount+1)
        setLove(true);
      }
    }
  };


  if (post) {
    return (
      <Flex mt={3} p={2} boxShadow={"base"} bg={"white"} borderRadius={10}>
        <Box w={"6%"}>
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
            <Box>{creator.displayName}</Box>

            {/* <Tag variant="solid" colorScheme="gray">
              Day 1
            </Tag>
  
            <Tag variant="solid" colorScheme="gray">
              Cut scene
            </Tag> */}
          </HStack>

          <HStack spacing={4} fontSize={14} color={"GrayText"}>
            <Box>{creator.displayName}</Box>
            <Box>
              {post.timestamp ? parseDate(post.timestamp) : "01/01/1970:00.00"}
            </Box>
          </HStack>

          <Divider mb={2} />

          <Text whiteSpace="pre-line">{post.message}</Text>

          <Center mt={3} w={"100%"} borderRadius={10} boxShadow={"base"}>
            <Box display={"flex"} overflowX="auto" overflowY="hidden" whiteSpace="nowrap" alignContent={"center"}>
              {post.imageUrl &&
                post.imageUrl.map((img) => (
                  <Image
                    size={300}
                    color="#100e0e"
                    weight="light"
                    src={img}
                    objectFit={"contain"}
                    display={"inline-block"}
                  />
                ))}
            </Box>
          </Center>

          <HStack spacing={4} fontSize={14} color={"GrayText"} pt={2}>
            <Button
              leftIcon={<Heart 
                weight={love ? "fill" : "regular"}
              />}
              color={love ? "red" : "black"}
              width={"40%"}
              fontSize={16}
              fontWeight={"light"}
              boxShadow={"base"}
              variant="solid"
              onClick={HandleLove}
              
            >
              {lovecount}
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
              {(post.comment > comment.length? post.comment : comment.length)}
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
          {isOpen &&
            comment &&
            comment
              .map((cmt, i) => (
                <GroupComment
                  comment={cmt}
                  key={i}
                  member={member}
                  openReply={openReply[i]}
                  setOpenReply={(state) => setOpenReply(state, i)}
                />
              ))
              .reverse()}
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
              height="42"
              backgroundColor="gray.100"
              value={message}
              onKeyDown={(e) => {
                resizeTextArea(e);
                if (e.key == "Enter" && !e.shiftKey) {
                  // console.log('message sent')
                  handleSent();
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Box pl={2}>
              <IconButton rounded={"full"} icon={<ImageSquare size={28} />} />
              {/* <IconButton rounded={"full"} icon={<NotePencil size={28} />} onClick={handleSent} /> */}
            </Box>
          </Flex>
        </Box>
        <IconButton rounded={"full"} icon={<DotsThreeVertical size={28} />} />
      </Flex>
    );
  } else {
    return <>ยังไม่มีโพสต์ใหม่</>;
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
  // console.log(formatted2)
  return formatted2;
  // console.log(seconds.toDate());
};
