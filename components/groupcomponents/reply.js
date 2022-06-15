import React, { useEffect, useState } from "react";
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
  Avatar,
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  Eye,
  DotsThreeVertical,
} from "phosphor-react";
import { useApp } from "../../src/hook/local";
import axios from "axios";

export const GroupReply = ({ reply }) => {
  const [love, setLove] = useState(false);
  const creator = reply.creator;
  const { auth } = useApp();
  useEffect(() => {
    if (reply.love.includes(auth.currentUser.uid)) {
      setLove(true);
    }
    return () => {
      setLove(false);
    };
  }, [reply]);

  const handleDelete = async () => {
    const token = await auth.currentUser.getIdToken();
    if (replydoc.imageURL) {
      const path = getpathfromUrl(replydoc.imageURL);
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${reply.gid}/${reply.pid}/comment/${reply.cid}/reply/${reply.rid}/delete`,
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
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${reply.gid}/${reply.pid}/comment/${reply.cid}/reply/${reply.rid}/delete`,
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
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${reply.gid}/${reply.pid}/comment/${reply.cid}/reply/${reply.rid}/update`,
      {
        message: message,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setEditMode(false);
    // setMessage(editMessage);
    // console.log(getpathfromUrl(commentdoc.imageURL))
  };

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${reply.gid}/${reply.pid}/comment/${reply.cid}/reply/${reply.rid}/unlove`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        // setLovecount(lovecount-1)
        setLove(false);
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${reply.gid}/${reply.pid}/comment/${reply.cid}/reply/${reply.rid}/love`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        // setLovecount(lovecount+1)
        setLove(true);
      }
    }
  };

  return (
    <Flex mt={3} p={2} boxShadow={"base"} w={"100%"}>
      <Box w={"8%"}>
        <Avatar
          mr={2}
          rounded={"100%"}
          h={42}
          w={42}
          src={creator.photoURL}
          name={creator.displayName}
        />
      </Box>

      <Box pl={2} pr={2} w={"84.5%"}>
        <HStack spacing={4}>
          <Box ml={2}>{creator.displayName}</Box>
          <Spacer />
          <Box color={"gray.500"} fontSize={14}>
            {parseDate(reply.timestamp)}
          </Box>
        </HStack>

        <Divider />

        <Box m={2}>{reply.message}</Box>

        <Center mt={3} w={"100%"} borderRadius={10} boxShadow={"base"}>
          {reply.imageUrl && (
            <Image
              size={300}
              color="#100e0e"
              weight="light"
              src={reply.imageUrl}
              objectFit={"contain"}
              display={"inline-block"}
            />
          )}
        </Center>

        <HStack spacing={4} fontSize={14} color={"GrayText"} pt={2}>
          <Button
            leftIcon={<Heart />}
            color="black"
            width={"40%"}
            fontSize={16}
            fontWeight={"light"}
            boxShadow={"base"}
            variant="solid"
            onClick={HandleLove}
          >
            {reply.love.length}
          </Button>
        </HStack>
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
