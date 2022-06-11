import React, { useState } from 'react'
import {
  Box,
  Text,
  Image,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Flex,
  Center,
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { Heart, DotsThreeVertical } from "phosphor-react"
import { useApp } from '../../src/hook/local';

export const Replypost = ({replydoc}) => {
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const {auth} = useApp();
  console.log(replydoc)
  const HandleLove = () => {};
  return (
    <Flex>
      <VStack spacing={0} mt={5} mr={5} >
        <Box w={'22px'} borderColor={'#636363'} height={'50'} borderLeftWidth={3} ></Box>
        <Box
          borderColor={'#636363'}
          borderBottomLeftRadius={10}
          borderBottomStyle={'solid'}
          borderBottomWidth={3}
          borderLeftWidth={3}
          height={'45px'}
          w={'22px'}
          borderLeftStyle={'solid'}
        ></Box>
      </VStack>

      <Flex
        width="100%"
        borderRadius={10}
        boxShadow="0 0 2px #000000"
        marginTop="10px"
      >

        <Center flexGrow={1} w={75} h={70} m={2.5}>
          <Image m={2.5} maxW={70} rounded={"full"} src={replydoc.creator.photoURL} />
        </Center>

        <Flex flexDir="column" w={440} flexGrow={10} p={2.5}>
          <Flex justifyContent="space-between">
            <Text fontSize={20}>
              {replydoc.creator.displayName ? replydoc.creator.displayName : "placeholder"}
            </Text>
            <Text fontSize={10} mt={3} color={"GrayText"}>
              {replydoc.timestamp
                ? parseDate(replydoc.timestamp)
                : "01/01/1970:00.00"}
              {/* {console.log(doc.data().timestamp)} */}
              {/* 01/01/1970:00.00 */}
            </Text>
          </Flex>

          <Divider />
          {editMode ? (
            // <InputGroup>
            <Input
              onKeyDown={(e) => {
                // console.log(e.key)
                if (e.key == "Enter" && !e.shiftKey) {
                  // console.log('message sent')
                  handleEdit();
                } else if (e.key == "Escape") {
                  setEditMode(false);
                }
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              width="100%"
              placeholder="Write Something"
              height="45px"
              backgroundColor="gray.100"
              mb={2.5}
            />
          ) : (
            //  <InputRightElement>
            //   <IconButton
            //     paddingTop={1}
            //     h={15}
            //     w={11}
            //     borderRadius={100}
            //     onClick={handleFile}
            //     icon={<ImageSquare size={32} weight="bold" />}
            //   />
            // </InputRightElement>
            // </InputGroup>
            <Box m={1} minW={440} w={"100%"} maxW={440} fontSize={14}>
              <Text>{replydoc.message ? replydoc.message : ""}</Text>
            </Box>
          )}

          <Box>
            <Button onClick={HandleLove}>
              <Box>
                <Heart
                  size={16}
                  color={"red"}
                  weight={
                    replydoc.love.includes(auth.currentUser.uid)
                      ? "fill"
                      : "regular"
                  }
                />
              </Box>

              <Box p={1}>{replydoc.love ? replydoc.love.length : "0"}</Box>
            </Button>
          </Box>
        </Flex>

        <Menu>
          <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
            <DotsThreeVertical size={30} />
          </MenuButton>
          <MenuList>
            {auth.currentUser.uid == replydoc.userId ? (
              <>
                <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </>
            ) : (
              <MenuItem>Report</MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}
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
  return formatted2;
};