import { AspectRatio, Box, Flex } from "@chakra-ui/react";
import React from "react";
// import style from '../../styles/embed.module.css'

export default function index() {
  return (
    <Box>
      <AspectRatio ratio={{base: 16/9, sm:3/4, md:3/4}} >
        <Box
          as="iframe"
          src="https://firebasestorage.googleapis.com/v0/b/comuthor-dev.appspot.com/o/group%2FXXOJXiVjxfrcDUF87q0I%2Fdocuments%2FmainDocument.pdf?alt=media&token=5e1d0e81-a202-430b-a944-4553a062b06c#toolbar=0"
          alt="demo"
          maxH={'75%'}
          maxW={'70%'}
        />
      </AspectRatio>
    </Box>
  );
}
