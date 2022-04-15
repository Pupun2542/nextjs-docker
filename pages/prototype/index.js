import { AspectRatio, Box, Flex } from "@chakra-ui/react";
import React from "react";
// import style from '../../styles/embed.module.css'

export default function index() {
  return (
    <Box>
      <AspectRatio ratio={{base: 16/9, sm:3/4, md:3/4}} >
        <Box
          as="iframe"
          src="https://docs.google.com/document/d/e/2PACX-1vSVzzKDmWio4L2cv5R3fp3_yvT4BstGE6HZ1WQg_fGcfb1-OZllhtrqod6KeXh-nUzjlsXvJwQxrCfQ/pub?embedded=true"
          alt="demo"
          maxH={'75%'}
          maxW={'70%'}
        />
      </AspectRatio>
    </Box>
  );
}
