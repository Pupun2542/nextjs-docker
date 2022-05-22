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
  Input,
  Textarea
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  Eye,
  DotsThreeVertical,
  ImageSquare
} from "phosphor-react";
import { GroupComment } from "./comment";

export const GroupPost = ({ post }) => {

  if (post){
    return (
      <Flex mt={3} p={2} boxShadow={"base"} bg={"white"} borderRadius={10}>
        <Box w={"6%"}>
          <Image mr={2} rounded={"100%"} h={42} w={42} src={post.creator.photoURL} />
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
            <Textarea    
              resize="none"
              minHeight={11}
              width="100%"
              placeholder="Write Something"
              height="42"
              backgroundColor="gray.100"
              // onKeyDown={(e) => {
              //   // console.log(e.key)
              //   if (e.key == "Enter" && !e.shiftKey) {
              //     // console.log('message sent')
              //     handleMessage();
              //   }
              // }}
            />
            <Box pl={2}>
              <IconButton rounded={"full"} icon={<ImageSquare size={28} />} />
            </Box>
          </Flex>
        </Box>
        <IconButton rounded={"full"} icon={<DotsThreeVertical size={28} />} />
      </Flex>
    );
  } else {
    return (
      <>ยังไม่มีโพสต์ใหม่</>
    )
    
  }
  
};
