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
} from "@chakra-ui/react";

export const ChatItem = ({ doc, user }) => {
  const [modalOpen, setModalOpen] = useState(false);
    return (
      <Flex
        flexDirection={doc.sender.uid == user.uid ? "row-reverse" : "row"}
        alignSelf={"flex-end"}
        padding="5px"
      >
        <Box fontFamily={"Mitr"}>
          {doc.sender.uid == user.uid ? (
            <VStack align={'stretch'} spacing={0} float={'right'} minW={280} maxW={320} marginBottom={0}>
              <Box>
                <Text float={'right'} fontSize={12}>{doc.sender.displayName}</Text>
              </Box>
              <Box>
                {doc.text && (
                  <Text
                    float={'right'}
                    fontSize={16}
                    backgroundColor={"blue.100"}
                    rounded="5"
                    fontFamily={"Mitr"}
                    p={2}
                    w={'auto'}
                    maxW={250}
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
                  />
                )}
              </Box>
            </VStack>

          ) : (
            <VStack float={'left'} spacing={0} align={'stretch'} minW={280} maxW={320} marginBottom={0}>
              <Box>
                <Text fontSize={12}>{doc.sender.displayName}</Text>
              </Box>

              <Box>
                {doc.text && (
                  <Text
                  float={'left'}
                    fontSize={16}
                    fontFamily="Mitr"
                    backgroundColor={"red.100"}
                    rounded="5"
                    p={2}
                    width='auto'
                    maxWidth={250}
                  >
                    {doc.text}
                  </Text>
                )}

                {doc.image && (
                  <Image
                    src={doc.image}
                    w={250}
                    h={250}
                    objectFit="cover"
                    onClick={() => setModalOpen(true)}
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
