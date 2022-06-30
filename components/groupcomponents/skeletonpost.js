import React from 'react'
import { Flex, Box, VStack, HStack, Skeleton, SkeletonCircle, SkeletonText, Divider, Spacer } from '@chakra-ui/react';

export const Skeletonpost = () => {
  return (
    <Flex
    mt={3}
    p={2}
    boxShadow={"base"}
    bg={"white"}
    borderRadius={10}
    direction={"column"}
  >
    <Flex w={"100%"}>
      <SkeletonCircle
        mr={2}
        rounded={"100%"}
        h={50}
        w={50}
      />
      <VStack w={"100%"} spacing={0}>
        <Box w={"100%"}>
          <Skeleton height={18} />
        </Box>
        <Flex w={"100%"} fontSize={14} color={"gray.400"}>
          <Box>
            <Skeleton h={14} />
          </Box>
          <Spacer />
          <Box float={"right"}>
            <Skeleton h={14} />
          </Box>
        </Flex>
        <Divider />
      </VStack>
    </Flex>

    <Flex p={2} pl={55} pr={55} direction={"column"}>
        <Box w={"100%"} fontSize={16}>
          <SkeletonText noOfLines={6} spacing={4} />
        </Box>
    </Flex>
    <VStack w={"100%"} spacing={0}>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        w={"100%"}
        pl={55}
        pr={55}
      >
        <HStack
          spacing={4}
          w={"100%"}
          fontSize={14}
          color={"GrayText"}
          pt={2}
        >
            <Skeleton height={16} width={"40%"} />
            <Skeleton height={16} width={"100%"} />
            <Skeleton height={16} width={"40%"} />
        </HStack>
      </Flex>
    </VStack>
  </Flex>
  )
}
