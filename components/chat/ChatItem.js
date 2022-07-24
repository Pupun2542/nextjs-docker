import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Avatar,
} from "@chakra-ui/react";

export const ChatItem = ({ doc, user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Flex
      flexDirection={doc.sender.uid == user.uid ? "row-reverse" : "row"}
      alignSelf={"flex-end"}
      padding="5px"
      
    >
      <Box fontFamily={"Sarabun"}>
        {doc.sender.uid == user.uid ? (
          <VStack align={'stretch'} spacing={0} float={'right'} minW={280} maxW={320} marginBottom={0}>
            <Flex justifyContent={"end"} alignContent={"center"} mb={1}>
              <Avatar src={doc.sender.photoURL} name={doc.sender.displayName} h={"36px"} w={"36px"} mr={1} />
              <Text fontSize={12} pt={"8px"}>{doc.sender.displayName}</Text>
            </Flex>
            <Box>
              {doc.text && (
                <Text
                  float={'right'}
                  fontSize={16}
                  backgroundColor={"blue.50"}
                  rounded="5"
                  fontFamily={"Sarabun"}
                  p={2}
                  w={'auto'}
                  maxW={250}
                  whiteSpace="pre-line"
                >
                  {doc.text}
                </Text>
              )}
              {doc.image && (
                <Image
                  float={'right'}
                  src={doc.image}
                  w="150px"
                  h="150px"
                  objectFit="cover"
                  onClick={() => setModalOpen(true)}
                  loading={"lazy"}
                />
              )}
            </Box>
          </VStack>

        ) : (
          <VStack float={'left'} spacing={0} align={'stretch'} minW={280} maxW={320} marginBottom={0}>
            <Flex justifyContent={"start"} alignContent={"center"} mb={1}>
              <Avatar src={doc.sender.photoURL} name={doc.sender.displayName} h={"36px"} w={"36px"} mr={1} />
              <Text fontSize={12} pt={"8px"}>{doc.sender.displayName}</Text>
            </Flex>

            <Box>
              {doc.text && (
                <Text
                  float={'left'}
                  fontSize={16}
                  backgroundColor={"red.100"}
                  rounded="5"
                  p={2}
                  width='auto'
                  maxWidth={250}
                  whiteSpace="pre-line"
                >
                  {doc.text}
                </Text>
              )}

              {doc.image && (
                <Image
                  src={doc.image}
                  w={150}
                  h={150}
                  objectFit="cover"
                  onClick={() => setModalOpen(true)}
                  loading={"lazy"}
                />
              )}
            </Box>

          </VStack>
        )}
      </Box>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <ModalOverlay bg="blackAlpha.100" opacity="40%" backdropBlur="6px" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={doc.image} sizes="2xl" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
