import React, { useState, useEffect, useRef } from "react";
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

export const GroupComment = ({
  comment,
  member,
  openReply,
  setOpenReply,
  onGoingReply,
  setOnGoingReply,
}) => {
  const creator = comment.creator;
  const getUser = useUser();
  // console.log(comment);
  const { auth, db } = useApp();
  const { isOpen, onToggle } = useDisclosure({ isOpen: openReply });
  const [reply, setReply] = useState([]);
  const [fetchlimit, setFetchlimit] = useState(20);
  const inputFileRef = useRef(null);
  // const [message, setMessage] = useState("");
  const [love, setLove] = useState(false);
  // const [lovecount, setLovecount] = useState(0);
  console.log(onGoingReply);
  const message = onGoingReply?.message ? onGoingReply.message : "";
  const setMessage = (msg) => {
    setOnGoingReply({ ...onGoingReply, message: msg });
  };
  const image = onGoingReply?.image ? onGoingReply.image : "";
  const setImage = (img) => {
    setOnGoingReply({ ...onGoingReply, image: img });
  };
  const editMessage = onGoingReply?.message ? onGoingReply.message : "";
  const setEditComment = (msg) => {
    setOnGoingReply({ ...onGoingReply, editMessage: msg });
  };

  useEffect(() => {
    if (comment.love.includes(auth.currentUser.uid)) {
      setLove(true);
    }
    const unsubscribe = onSnapshot(
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
                  rid: doc.id,
                  gid: comment.gid,
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
      setLove(false);
      setReply([]);
      // setLovecount(0);
    };
  }, [comment]);

  const ToggleReplyTab = () => {
    setOpenReply(!isOpen);
    onToggle();
  };

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
        dlurl = await UploadGroupCommentImage(image, auth.currentUser.uid, comment.gid);
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
    }
  };

  const handleDelete = async () => {
    const token = await auth.currentUser.getIdToken();
    if (replydoc.imageURL) {
      const path = getpathfromUrl(replydoc.imageURL);
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
    axios.post(
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
    setEditMode(false);
    // setMessage(editMessage);
    // console.log(getpathfromUrl(commentdoc.imageURL))
  };

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love) {
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
        // setLovecount(lovecount-1)
        setLove(false);
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
        // setLovecount(lovecount+1)
        setLove(true);
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
            leftIcon={<Heart weight={love ? "fill" : "regular"} />}
            color={love ? "red" : "black"}
            width={"40%"}
            fontSize={16}
            fontWeight={"light"}
            boxShadow={"base"}
            variant="solid"
            onClick={HandleLove}
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
            onClick={() => ToggleReplyTab()}
          >
            {comment.reply}
          </Button>
        </HStack>
        {/* {console.log(reply)} */}
        {isOpen &&
          reply
            .map((rpy, i) => <GroupReply reply={rpy} key={i} member={member} />)
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
            height="42px"
            backgroundColor="gray.100"
            value={message}
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

      <IconButton rounded={"full"} icon={<DotsThreeVertical size={28} />} />
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
