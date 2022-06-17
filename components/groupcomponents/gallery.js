import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../../src/hook/local";
import { Box, Center, Flex, Image, useDisclosure, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, SimpleGrid } from "@chakra-ui/react";

const Gallery = ({ gid }) => {
  const { auth } = useApp();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [gallery, setGallery] = useState([]);
  console.log(gallery);
  useEffect(() => {
    const fetchGallery = async () => {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/media`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setGallery(res.data);
      }
    };
    fetchGallery();
  }, [gid]);

  return (
    <Flex flexWrap={"wrap"}
    // justifyContent={'center'}
    >
      {gallery.length > 0 &&
        gallery.map((img) => (
          <SimpleGrid
            width={'auto'}
            height={'auto'}
            marginBottom={5}
            boxShadow={'base'}
            margin={2}
            cursor={'pointer'}
            borderRadius={10}
            onClick={onOpen}
          >
            <Image
              src={img.url}
              width={240}
              height={225}
              objectFit={"contain"}
            />
          </SimpleGrid>


        ))}

      <Modal size={'7xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody>
            โชว์ทีละภาพ
          </ModalBody>

        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Gallery;
