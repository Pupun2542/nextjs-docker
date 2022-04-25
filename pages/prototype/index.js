import { AspectRatio, Box, Flex } from "@chakra-ui/react";
import React from "react";
// import style from '../../styles/embed.module.css'

export default function index() {
  return (
    <Box>
      <AspectRatio ratio={{base: 16/9, sm:3/4, md:3/4}} >
        <Box
          as="iframe"
          src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/group%2FLoTdUuxY56hUUezej34C%2Fdocuments%2F1813110648%20%E0%B8%9B%E0%B8%8F%E0%B8%B4%E0%B8%A0%E0%B8%B2%E0%B8%93%20%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%84%20406.pdf?alt=media&token=7dffb306-f988-4778-9df8-1b0fb404dfe1#toolbar=0"
          alt="demo"
          maxH={'75%'}
          maxW={'70%'}
        />
      </AspectRatio>
    </Box>
  );
}
