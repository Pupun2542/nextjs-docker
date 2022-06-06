import React, {useState, useEffect} from "react";
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
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  DotsThreeVertical,
  ImageSquare,
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

export const GroupComment = ({ comment, member }) => {
  const creator = comment.creator
  const getUser = useUser();
  // console.log(comment);
  const { auth, db } = useApp();
  const { isOpen, onToggle } = useDisclosure();
  const [reply, setReply] = useState(undefined);
  const [fetchlimit, setFetchlimit] = useState(20);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", comment.pid, "comments", comment.cid, "replies"),
        orderBy("timestamp", "desc"),
        limit(fetchlimit)
      ),
      (snaphot) => {
        if (!snaphot.empty) {
          let mappedcommentData = [];
          Promise.all(
            snaphot.docs.map(async (doc) => {
              let creator = {};
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
                  cid: comment.cid, 
                  pid: comment.pid,
                  rid: doc.id 
                },
              ];
            })
          ).then(() => {
            setReply(mappedcommentData);
          });
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, [comment]);
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
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.pid}/comment/create`,
        { message: message, imageURL: "", charaId: "" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("before set", message);
      setMessage("");
      console.log("after set", message)
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
          <Box ml={2}>{comment.creator.displayName}</Box>
          <Spacer />
          <Box color={"gray.500"} fontSize={14}>
            {parseDate(comment.timestamp)}
          </Box>
        </HStack>

        <Divider />

        <Box m={2}>
          <Text whiteSpace="pre-line">{comment.message}</Text>
        </Box>

        <HStack spacing={4} fontSize={14} color={"GrayText"} pt={2}>
          <Button
            leftIcon={<Heart />}
            color="black"
            width={"40%"}
            fontSize={16}
            fontWeight={"light"}
            boxShadow={"base"}
            variant="solid"
          >
            {comment.love.length}
          </Button>
          <Button
            leftIcon={<ChatCenteredText />}
            color="black"
            width={"100%"}
            fontSize={16}
            fontWeight={"light"}
            boxShadow={"base"}
            variant="solid"
          >
            {comment.reply.length}
          </Button>
        </HStack>
        {isOpen&&reply.reverse().map((rpy, i)=>{
          <GroupReply reply={rpy} key={i} member={member} />
        })}
        

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
          </Box>
        </Flex>
      </Box>

      <IconButton rounded={"full"} icon={<DotsThreeVertical size={28} />} />
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
