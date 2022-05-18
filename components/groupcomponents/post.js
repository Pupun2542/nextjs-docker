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
  Input
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  Eye,
  DotsThreeVertical,
} from "phosphor-react";
import { GroupComment } from "./comment";

export const GroupPost = ({ post }) => {
  return (
    <Flex mt={3} p={2} boxShadow={"base"} bg={"white"} borderRadius={10}>
      <Box w={"6%"}>
        <Center mr={2} rounded={"100%"} h={42} w={42} bg={"gray.500"}>
          I
        </Center>
      </Box>
      <Box pl={2} pr={2} w={"90%"}>
        <HStack spacing={4}>
          <Box>Name Character</Box>

          <Tag variant="solid" colorScheme="gray">
            Day 1
          </Tag>

          <Tag variant="solid" colorScheme="gray">
            Cut scene
          </Tag>
        </HStack>

        <HStack spacing={4} fontSize={14} color={"GrayText"}>
          <Box>Name profile</Box>
          <Box>Timestamp</Box>
        </HStack>

        <Divider mb={2} />

        <Box>
          "สวัสดีชาวโลก เรามาอย่างสันติ" เขาเอ่ยออกมาด้วยความสนุกสนาน
          โดยไม่อ่านบรรยากาศใด ๆ
          และแน่นอนว่าเขาเองก็มาพร้อมกับชายที่หน้าตาเหมือนกับเขาด้วยเช่นเดียวกัน
        </Box>

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
          <Button
            leftIcon={<Eye />}
            color="black"
            width={"40%"}
            fontSize={16}
            fontWeight={"light"}
            boxShadow={"base"}
            variant="solid"
          >
            100
          </Button>
        </HStack>

        <GroupComment/>

        <Flex mt={2}>
          <Box w={"8%"} mr={1}>
            <Center mr={2} rounded={"100%"} h={42} w={42} bg={"gray.500"}>
              I
            </Center>
          </Box>
          <Input placeholder="Basic usage" w={"100%"} />
        </Flex>
      </Box>
      <IconButton rounded={"full"} icon={<DotsThreeVertical size={28} />} />
    </Flex>
  );
};
