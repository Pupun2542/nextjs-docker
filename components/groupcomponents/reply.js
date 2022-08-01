import React, { useContext, useEffect, useState } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  Eye,
  DotsThreeVertical,
  CaretDown,
} from "phosphor-react";
import { useApp } from "../../src/hook/local";
import axios from "axios";
import { PostContext } from "./Postsection";
import useCharaList from "../../src/hook/useCharaList";
import { useRouter } from "next/router";

export const GroupReply = ({ reply, data, gid, mychara }) => {
  const {
    setStateDataData,
    setStateDataEditMessage,
    getStateDataEditMessage,
    getStateDataLove,
    setStateDataEdit,
    getStateDataEdit,
  } = useContext(PostContext);
  const router = useRouter();
  const { chara, refreshcharaList } = useCharaList(data, gid);
  const checkChara = () => {
    if (chara[chara.findIndex((v) => v.refererId == reply.charaId)]) {
      return chara[chara.findIndex((v) => v.refererId == reply.charaId)];
    } else {
      // refreshcharaList();
      return "";
    }
  };
  const postchara = checkChara();

  const rid = reply.rid;
  const love = reply.love;
  const text = reply.message;
  const setText = (value) => {
    setStateDataData({ ...reply, message: value });
  };
  const editMode = getStateDataEdit(rid);
  const setEditMode = (state) => {
    setStateDataEdit(state, rid);
  };
  const editMessage = getStateDataEditMessage(rid);
  const setEditMessage = (value) => {
    setStateDataEditMessage(value, rid);
  };
  const creator = reply.creator;
  const { auth } = useApp();

  const handleDelete = async () => {
    const token = await auth.currentUser.getIdToken();
    if (reply.imageUrl) {
      const path = getpathfromUrl(reply.imageUrl);
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
  };

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love.includes(auth.currentUser.uid)) {
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
        // setLove(love.filter((v,i)=>v !== auth.currentUser.uid))
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
        // setLove([...love, auth.currentUser.uid])
      }
    }
  };

  return (
    <Flex
      borderRadius={5}
      bg={"gray.100"}
      mt={2}
      p={1}
      boxShadow={"base"}
      w={"100%"}
    >
      {/* <Center m={1}>
        <VStack spacing={0} mt={2} >
          <Box w={'22px'} borderColor={'#636363'} height={'50'} borderLeftWidth={3} ></Box>
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
        bg={"white"}
        p={2}
        // boxShadow={'"0 0 2px #000000"'}
        boxShadow={"base"}
        w={"100%"}
        direction={"column"}
        float={"right"}
        borderRadius={10}
      >
        <Flex w={"100%"}>
          <Avatar
            mr={2}
            rounded={"100%"}
            h={45}
            w={45}
            src={postchara.name ? postchara.photoURL : creator.photoURL}
            name={
              postchara.name ? postchara.name : creator?.displayName || "Dummy"
            }
          />
          <VStack w={"100%"} spacing={0}>
            <Box
              fontSize={18}
              w={"100%"}
              onClick={
                postchara.name
                  ? () => {}
                  : creator
                  ? () => router.push("../../profile/" + creator?.uid)
                  : () => {}
              }
              cursor={"pointer"}
            >
              {postchara.name ? postchara.name : creator.displayName || "Dummy"}
            </Box>
            <Flex w={"100%"} fontSize={14} color={"gray.400"}>
              <Box
                onClick={
                  postchara.name && creator
                    ? () => router.push("../../profile/" + creator?.uid)
                    : () => {}
                }
                cursor={"pointer"}
              >
                {postchara.name ? creator?.displayName : ""}
              </Box>
              <Spacer />
              <Box float={"right"}>
                {reply.timestamp
                  ? parseDate(reply.timestamp)
                  : "01/01/1970:00.00"}
              </Box>
            </Flex>
            <Divider mb={2} />

            <HStack w={"100%"} pt={1}>
              {reply.mention?.length > 0 && (
                <Text fontSize={14} color={"gray.400"}>
                  ได้กล่าวถึง
                </Text>
              )}
              {reply.mention?.map((tag) => (
                <Tag color={"black"} bg={"gray.200"}>
                  {tag.name}
                </Tag>
              ))}
            </HStack>

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

                <HStack
                  mt={2}
                  spacing={4}
                  w={"100%"}
                  fontSize={14}
                  color={"GrayText"}
                  p={1}
                  boxShadow={"base"}
                  bg={"gray.100"}
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
                    width={"40%"}
                    fontSize={16}
                    fontWeight={"light"}
                    boxShadow={"base"}
                    variant="solid"
                    onClick={HandleLove}
                    bg={"white"}
                    h={30}
                  >
                    {reply.love.length}
                  </Button>
                  <Box w={"100%"}></Box>
                </HStack>
              </Flex>
            </Flex>
          </VStack>

          <Menu>
            <MenuButton ml={1} h={10} w={10}>
              <IconButton
                size={"sm"}
                icon={<DotsThreeVertical size={15} />}
                rounded={"full"}
              />
            </MenuButton>
            <MenuList>
              {auth.currentUser.uid == reply.uid ? (
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
