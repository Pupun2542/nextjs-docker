import React from 'react'
import { Box, Center, Flex, HStack, Divider, Image, Button, Spacer, IconButton, Input, Textarea } from '@chakra-ui/react'
import { Heart, ChatCenteredText, DotsThreeVertical, ImageSquare } from 'phosphor-react'
import { GroupReply } from './reply'

export const GroupComment = ({ comment }) => {
  return (
    <Flex mt={3} p={2} boxShadow={"base"} w={"100%"}>
      <Box w={"7%"}>
        <Center mr={2} rounded={"100%"} h={42} w={42} bg={"gray.500"}>
          I
        </Center>
      </Box>

      <Box pl={2} pr={2} w={"90%"}>
        <HStack spacing={4}>
          <Box ml={2}>Name Character</Box>
          <Spacer />
          <Box color={"gray.500"} fontSize={14}>
            Timestamp
          </Box>
        </HStack>

        <Divider />

        <Box m={2}>
          "บอกแล้วว่าบ้านแตกแล้ว จบ ๆ งานเลี้ยงจบแล้ว"
          ชายหน้าเหมือนอีกคนเอ่ยตามออกมา พลางคว้าคอเสื้อของชายข้าง ๆ
          เขาให้ทำตัวสงบลง{" "}
        </Box>

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

        <GroupReply />

        {/* <Flex mt={3} p={2} boxShadow={"base"} w={"100%"}>
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

              <IconButton
                rounded={"full"}
                icon={<DotsThreeVertical size={28} />}
              />
            </Flex> */}

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
  )
}
