import React from "react";
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
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  Eye,
  DotsThreeVertical,
} from "phosphor-react";

export const GroupReply = ({ reply }) => {
  return (
      <Flex mt={3} p={2} boxShadow={"base"} w={"100%"}>
        <Box w={"8%"}>
          <Center mr={2} rounded={"100%"} h={42} w={42} bg={"gray.500"}>
            I
          </Center>
        </Box>

        <Box pl={2} pr={2} w={"84.5%"}>
          <HStack spacing={4}>
            <Box ml={2}>Name Character</Box>
            <Spacer />
            <Box color={"gray.500"} fontSize={14}>
              Timestamp
            </Box>
          </HStack>

          <Divider />

          <Box m={2}>ว้าย ๆ ไอ้หมอนี่หน้าตาคุ้น ๆ แฮะ</Box>

          <Center mt={3} w={"100%"} borderRadius={10} boxShadow={"base"}>
            <Image size={300} color="#100e0e" weight="light" />
          </Center>

          <HStack spacing={4} fontSize={14} color={"GrayText"} pt={2}>
            <Button
              leftIcon={<Heart />}
              color="black"
              width={"40%"}
              fontSize={16}
              fontWeight={"light"}
              boxShadow={"base"}
              variant="solid"
            >
              100
            </Button>
            <Button
              leftIcon={<ChatCenteredText />}
              color="black"
              width={"100%"}
              fontSize={16}
              fontWeight={"light"}
              boxShadow={"base"}
              variant="solid"
            >
              100
            </Button>
          </HStack>
        </Box>

        <IconButton rounded={"full"} icon={<DotsThreeVertical size={28} />} />
      </Flex>
  );
};
