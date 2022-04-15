import React from "react";
import { Box, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { Chats } from "phosphor-react";

export default function ChatBox() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    // console.log(isOpen)
  return (
    <Box position="fixed" right={3} bottom={0}>
      <IconButton
        background="#343434"
        rounded={100}
        bottom={3}
        color={"white"}
        w={16}
        h={16}
        justifyContent={"center"}
        alignContent={"center"}
        icon={<Chats size={48} />}
        _hover={{
          backgroundColor: "#4D4D88",
        }}
        onClick={onToggle}
      />
      <Box display={isOpen ? "flex" : "none"} background="#343434" width={500} height={550} float="left"></Box>
    </Box>
  );
}
