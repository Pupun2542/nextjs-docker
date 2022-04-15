import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Chats } from "phosphor-react";

export default function ChatBox() {
  return (
    <IconButton
      position="fixed"
      bottom={3}
      right={3}
      background="#343434"
      rounded={100}
      color={'white'}
      w={16}
      h={16}
      justifyContent={"center"}
      alignContent={'center'}
      icon={<Chats size={48} />}
      _hover={{
        backgroundColor:'#4D4D88'
      }}
    />
  );
}
