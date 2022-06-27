import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Flex,
  Center,
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar
} from "@chakra-ui/react";
import { Heart, DotsThreeVertical } from "phosphor-react";
import { useApp } from "../../src/hook/local";
import axios from "axios";
import { useRouter } from "next/router";

export const Replypost = ({ replydoc, message, setMessage }) => {
  const [editMode, setEditMode] = useState(false);
  // const [message, setMessage] = useState("");
  const { auth } = useApp();
  const [love, setLove] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (replydoc.love.includes(auth.currentUser.uid)) {
      setLove(true);
    }
    return () => setLove(false);
  }, [replydoc]);
  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${replydoc.gid}/comment/${replydoc.cid}/reply/${replydoc.rid}/unlove`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setLove(false);
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${replydoc.gid}/comment/${replydoc.cid}/reply/${replydoc.rid}/love`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setLove(true);
        console.log(res.request, res.statusText);
      } else {
        console.log(res.status, res.data);
      }
    }
  };
  const resizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  const handleDelete = async () => {
    const token = await auth.currentUser.getIdToken();
    if (replydoc.imageURL) {
      const path = getpathfromUrl(replydoc.imageURL);
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${replydoc.gid}/comment/${replydoc.cid}/reply/${replydoc.rid}/delete`,
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
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${replydoc.gid}/comment/${replydoc.cid}/reply/${replydoc.rid}/delete`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
    setMessage("");
    // console.log(getpathfromUrl(commentdoc.imageURL))
  };

  const handleEdit = async () => {
    const token = await auth.currentUser.getIdToken();
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${replydoc.gid}/comment/${replydoc.cid}/reply/${replydoc.rid}/update`,
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

  return (
    <Flex>
      <VStack spacing={0} mt={5} mr={5}>
        <Box
          w={"22px"}
          borderColor={"#636363"}
          height={"50"}
          borderLeftWidth={3}
        ></Box>
        <Box
          borderColor={"#636363"}
          borderBottomLeftRadius={10}
          borderBottomStyle={"solid"}
          borderBottomWidth={3}
          borderLeftWidth={3}
          height={"45px"}
          w={"22px"}
          borderLeftStyle={"solid"}
        ></Box>
      </VStack>

      <Flex
        width="100%"
        borderRadius={10}
        boxShadow="0 0 2px #000000"
        marginTop="10px"
      >
        <Center flexGrow={1} w={75} h={70} m={2.5}>
          <Avatar
            m={2.5}
            maxW={70}
            rounded={"full"}
            src={replydoc.creator.photoURL}
            name={replydoc.creator.displayName}
            onClick={()=>router.push("../profile/"+replydoc.creator?.uid)}
            cursor={"pointer"}
          />
        </Center>

        <Flex flexDir="column" w={440} flexGrow={10} p={2.5}>
          <Flex justifyContent="space-between">
            <Text fontSize={20} onClick={()=>router.push("../profile/"+replydoc.creator?.uid)} cursor={"pointer"}>
              {replydoc.creator.displayName
                ? replydoc.creator.displayName
                : "placeholder"}
            </Text>
            <Text fontSize={10} mt={3} color={"GrayText"}>
              {replydoc.timestamp
                ? parseDate(replydoc.timestamp)
                : "01/01/1970:00.00"}
              {/* {console.log(doc.data().timestamp)} */}
              {/* 01/01/1970:00.00 */}
            </Text>
          </Flex>

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
                } else {
                  resizeTextArea(e);
                }
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            <Box m={1} minW={440} w={"100%"} maxW={440} fontSize={14}>
              <Text>{replydoc.message ? replydoc.message : ""}</Text>
            </Box>
          )}

          <Box>
            <Button onClick={HandleLove}>
              <Box>
                <Heart
                  size={16}
                  color={"red"}
                  weight={
                    replydoc.love.includes(auth.currentUser.uid)
                      ? "fill"
                      : "regular"
                  }
                />
              </Box>

              <Box p={1}>{replydoc.love ? replydoc.love.length : "0"}</Box>
            </Button>
          </Box>
        </Flex>

        <Menu>
          <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
            <DotsThreeVertical size={30} />
          </MenuButton>
          <MenuList>
            {auth.currentUser.uid == replydoc.creator.uid ? (
              <>
                <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </>
            ) : (
              <MenuItem>Report</MenuItem>
            )}
          </MenuList>
        </Menu>
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
  return formatted2;
};
