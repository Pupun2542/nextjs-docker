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
  Avatar
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  Eye,
  DotsThreeVertical,
} from "phosphor-react";

export const GroupReply = ({ reply }) => {
  const creator = reply.creator
  return (
      <Flex mt={3} p={2} boxShadow={"base"} w={"100%"}>
        <Box w={"8%"}>
        <Avatar
            mr={2}
            rounded={"100%"}
            h={42}
            w={42}
            src={creator.photoURL}
            name={creator.displayName}
          />
        </Box>

        <Box pl={2} pr={2} w={"84.5%"}>
          <HStack spacing={4}>
            <Box ml={2}>{creator.displayName}</Box>
            <Spacer />
            <Box color={"gray.500"} fontSize={14}>
              {parseDate(reply.timestamp)}
            </Box>
          </HStack>

          <Divider />

          <Box m={2}>{reply.message}</Box>

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
              {reply.love}
            </Button>
          </HStack>
        </Box>

        <IconButton rounded={"full"} icon={<DotsThreeVertical size={28} />} />
      </Flex>
  );
};

const parseDate = (seconds) => {
  // const date = new Date(seconds._seconds * 1000);
  const date = seconds.toDate();
  const formatted = date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const spdate = formatted.split(" ");
  const formatted2 = `${spdate[0]} [${spdate[1]}]`;
  // console.log(formatted2)
  return formatted2;
  // console.log(seconds.toDate());
};
