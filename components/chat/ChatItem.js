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

export const ChatItem = ({ doc, user, members }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [userDetail, setUserDetail] = useState({})
  console.log("member", members);
  console.log("doc", doc.data())
  const sender = members.find((v) => v.uid == doc.data().senderId);
  console.log("sender", sender);

  if (sender) {
    return (
      <Flex
        flexDirection={sender.uid == user.uid ? "row-reverse" : "row"}
        alignSelf={"flex-end"}
        padding="5px"
      // maxH={500}
      >
        <Box fontFamily={"Mitr"}>
          {sender.uid == user.uid ? (
            <VStack align={'stretch'} float={'right'} minW={280} maxW={320} marginBottom={0}>
              <Box>
                <Text float={'right'} fontSize={12}>{sender.displayName}</Text>
              </Box>
              <Box>
                {doc.data().text && (
                  <Text
                    float={'right'}
                    fontSize={16}
                    backgroundColor={"blue.100"}
                    rounded="5"
                    fontFamily={"Mitr"}
                    p={2}
                    w={250}
                  >
                    {doc.data().text}
                  </Text>
                )}
                {doc.data().image && (
                  <Image
                    src={doc.data().image}
                    w="150px"
                    h="150px"
                    objectFit="cover"
                    onClick={() => setModalOpen(true)}
                  />
                )}
              </Box>
            </VStack>

          ) : (
            <Box minW={280} maxW={320} marginBottom={5}>
              <Text fontSize={12}>{sender.displayName}</Text>
              {doc.data().text && (
                <Text
                  fontSize={16}
                  fontFamily="Mitr"
                  backgroundColor={"red.200"}
                  rounded="5"
                  p={2}
                >
                  {doc.data().text}
                </Text>
              )}

              {doc.data().image && (
                <Image
                  src={doc.data().image}
                  w={250}
                  h={250}
                  objectFit="cover"
                  onClick={() => setModalOpen(true)}
                />
              )}
            </Box>
          )}
        </Box>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="md">
          <ModalOverlay bg="blackAlpha.100" opacity="40%" backdropBlur="6px" />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Image src={doc.data().image} sizes="2xl" />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    );
  }
  return <></>
};
