import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  Image,
  Input,
  Button,
  Flex,
  Textarea,
  VStack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useApp, useTab } from "../../src/hook/local";
import { doc, runTransaction, arrayUnion } from "firebase/firestore";
import { Minus, X } from "phosphor-react";
import { ChatItem } from "./ChatItem";
import UseChatManager from "../../src/hook/useChatManager";
import useChatRoomManager from "../../src/hook/useChatRoomManager";
import InputWithImage from "../commonComponent/InputWithImage";
import { isEmptyOrSpaces } from "../../src/services/utilsservice";

export const ChatBox = ({
  crid,
  user,
  isOpen,
  onOpen,
  onClose,
  onToggle,
  setRoomDetail,
}) => {
  // const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const messagesEndRef = useRef(null);
  const dropdownref = useRef(null);

  const {
    isOpen: isSettingOpen,
    onOpen: onSettingOpen,
    onClose: onSettingClose,
  } = useDisclosure();
  const {
    mappedRoomDetail,
    mappedMessage,
    loading,
    loadmore,
    handleSent,
    onRemove,
    handleFocus,
  } = useChatRoomManager(crid, user, onClose);
  useEffect(() => {
    setRoomDetail(mappedRoomDetail);
  }, [mappedRoomDetail]);

  useEffect(() => {
    if (!loading && mappedRoomDetail) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [mappedMessage]);

  if (typeof window !== 'undefined') {
    document.addEventListener("mousedown", (e) => {
      if (dropdownref.current && !dropdownref.current.contains(e.target)) {
        onSettingClose();
      }
    });
  }

  useEffect(() => {
    handleFocus();
  }, [crid]);

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

  const resizeTextArea = (e) => {
    if (!isEmptyOrSpaces(msg)) {
      e.target.style.height = "inherit";
      e.target.style.height = `${e.target.scrollHeight}px`;
    } else {
      e.target.style.height = "inherit";
      e.target.style.height = `42px`;
    }
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, 50)}px`;
  };

  if (!loading && mappedRoomDetail) {
    return (
      <Box
        display={"flex"}
        background="white"
        borderColor={"black"}
        borderLeftWidth={2}
        borderRightWidth={2}
        borderTopWidth={2}
        borderTopRadius={10}
        width={340}
        height={455}
        float="left"
        // marginRight={5}
        flexDirection="column"
        justifyContent="space-between"
      >
        {/* <Box width="100%"> */}
        <Flex
          bg={"gray.50"}
          justifyContent="space-between"
          borderTopRadius={10}
          id="headerbox"
          pos={"relative"}
          // alignContent={"center"}
        >
          <Image
            src={mappedRoomDetail.thumbnail}
            w={30}
            h={30}
            rounded="full"
            // float="left"
            margin={1}
          />
          <Flex
            width={"calc(100% - 112px)"}
            // marginLeft={2}
            // marginTop={2}
            fontSize={"16"}
            alignContent={"center"}
            onClick={onSettingOpen}
          >
            <Text paddingTop={"7px"}>{mappedRoomDetail.name}</Text>
          </Flex>
          <Box 
          // float="right"
          >
            <IconButton
              size={"sm"}
              onClick={onClose}
              icon={<Minus size={10} weight="bold" />}
              float={"left"}
              m={1}
              mr={-0.5}
              rounded={"full"}
            />
            <IconButton
              rounded={"full"}
              m={1}
              size={"sm"}
              onClick={onRemove}
              icon={<X size={10} weight="bold" />}
              float={"left"}
            />
          </Box>
          <VStack
            display={
              isSettingOpen && mappedRoomDetail.type === "group"
                ? "initial"
                : "none"
            }
            position={"absolute"}
            left={"45px"}
            top={"35px"}
            bg={"white"}
            boxShadow="base"
            divider={<StackDivider borderColor={"gray.200"} />}
            ref={dropdownref}
          >
            <Box>Name</Box>
            <Box>thumbnail</Box>
          </VStack>
        </Flex>

        <Box
          overflowY="auto"
          id="msgbox"
          alignSelf={"stretch"}
          flexGrow="1"
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#727272",
              borderRadius: "24px",
            },
          }}
          // alignItems="end"
          onClick={handleFocus}
        >
          {mappedMessage &&
            mappedRoomDetail &&
            Object.keys(mappedRoomDetail).length > 0 &&
            mappedMessage.map((doc, k) => (
              <ChatItem key={k} doc={doc} user={user} />
            ))}
          <div ref={messagesEndRef}></div>
        </Box>

        {image && (
          <Box pos="relative">
            <Image src={image} w={150} h={150} />
            <IconButton
              icon={<X size={16} color="black" />}
              position="absolute"
              top={0}
              left={100}
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent" }}
              onClick={() => setImage(null)}
            ></IconButton>
          </Box>
        )}

        <Flex
          flexDir="row"
          justifyContent="space-between"
          p={1}
          alignItems={"flex-end"}
        >
          <Box
            fontFamily={"Sarabun"}
            w="70%"
            marginLeft={2}
            onClick={handleFocus}
          >
            <Textarea
              resize="none"
              minHeight={11}
              width="100%"
              placeholder="Write Something"
              height="42px"
              backgroundColor="gray.100"
              value={msg}
              onKeyDown={(e) => {
                resizeTextArea(e);
                if (e.key == "Enter" && !e.shiftKey) {
                  handleSent(user.uid, msg, image);
                  setMsg("");
                  setImage("");
                }
              }}
              onChange={(e) => setMsg(e.target.value)}
              onPaste={handleImagePaste}
            />
          </Box>
          <Button
            float="right"
            marginRight={2}
            onClick={() => {
              handleSent(user.uid, msg, image);
              setMsg("");
              setImage("");
            }}
            disabled={!(msg || image)}
          >
            send
          </Button>
        </Flex>
      </Box>
    );
  }
  return <></>;
};
