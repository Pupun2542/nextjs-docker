import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Chats } from "phosphor-react";

export default function ChatBox() {
  return (
    <Flex
      position="fixed"
      bottom={3}
      right={3}
      background="yellow"
      rounded={100}
      w={16}
      h={16}
      justifyContent={"center"}
      alignContent={'center'}
    >
      <Chats size={48} />
    </Flex>
  );
}
