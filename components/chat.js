import React from "react";
import { Box, Flex, IconButton, useDisclosure, Center } from "@chakra-ui/react";
import { Chats } from "phosphor-react";

export default function ChatBox() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    // console.log(isOpen)
  return (
    <Flex position="fixed" right={3} bottom={3}>
      
      <Box
        display={isOpen ? "flex" : "none"} 
        background="tomato"
        width={340}
        height={455}
        float='left' 
        position='fixed'
        bottom={0}
        right={20}
        
      >
        
      </Box>

      <Center
        background="#343434"
        rounded={100}
        color={"white"}
        w={50}
        h={50}
        _hover={{
          backgroundColor: "#4D4D88",
        }}
        onClick={onToggle}>
        <Chats size={32} />
      </Center>

    </Flex>
  );
}
