import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../../src/hook/local";
import {
  Box,
  Center,
  Flex,
  Image,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Button,
  Divider,
  Tabs,
  TabPanels,
  TabPanel,
  Spinner,
  Text,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { CreateAlbumForm } from "./CreateAlbumForm";

const Gallery = ({ gid, mychara }) => {
  const { auth } = useApp();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalImage, setModalImage] = useState("");
  const [gallery, setGallery] = useState([]);
  const [album, setAlbum] = useState([]);
  const [tabindex, setTabindex] = useState(0);
  const [isCreateAlbOpen, setCreateAlbOpen] = useState(false);
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
    if (res.status === 200) {
      setGallery(res.data);
    }
  };
  const fetchAlbum = async () => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/album/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      setAlbum(res.data);
    }
  };

  useEffect(() => {
    if (tabindex == 0) {
      fetchGallery();
    } else {
      // fetchAlbum();
    }
  }, [gid]);

  return (
    <Box>
      <Box
        bg={"white"}
        borderRadius={10}
        boxShadow={"base"}
        display={isCreateAlbOpen ? "none" : "initial"}
      >
        <Flex justifyContent={"space-between"} pt={2} pb={2} pl={5} pr={5}>
          <Box color={"white"}>
            <Button
              onClick={() => setTabindex(0)}
              mr={5}
              bg={tabindex == 0 ? "#4C4D88" : "#9999AF"}
              _hover={{ color: "white" }}
            >
              Picture
            </Button>
            <Button
              onClick={() => setTabindex(1)}
              bg={tabindex == 1 ? "#4C4D88" : "#9999AF"}
              _hover={{ color: "white" }}
            >
              Album
            </Button>
          </Box>
          {tabindex == 0 && (
            <Button
              bg={"#FBBC43"}
              borderWidth={2}
              borderColor={"black"}
              borderRadius={10}
            >
              Add Picture
            </Button>
          )}
          {tabindex == 1 && (
            <Button
              bg={"#FBBC43"}
              borderWidth={2}
              borderColor={"black"}
              borderRadius={10}
              onClick={() => setCreateAlbOpen(true)}
            >
              Add Albums
            </Button>
          )}
        </Flex>
        <Divider />
        <Tabs index={tabindex}>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={3} rowGap={3}>
                {gallery.length > 0 &&
                  gallery.map((img, k) => (
                    <Image
                      key={k}
                      cursor={"pointer"}
                      src={img.url}
                      width={225}
                      height={225}
                      objectFit={"contain"}
                      borderRadius={10}
                      boxShadow={"base"}
                      loading={"lazy"}
                      onClick={() => setModalImage(img.url)}
                    />
                  ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={3} rowGap={3}>
                {gallery.length > 0 &&
                  album.map((alb, k) => (
                    <Box key={k}>
                      <Image
                        cursor={"pointer"}
                        src={alb.medialist[0].url}
                        fallback={<Spinner />}
                        width={225}
                        height={225}
                        objectFit={"contain"}
                        borderRadius={10}
                        boxShadow={"base"}
                        loading={"lazy"}
                      />
                      <Text>{alb.name}</Text>
                    </Box>
                  ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <CreateAlbumForm
        onClose={() => setCreateAlbOpen(false)}
        isOpen={isCreateAlbOpen}
        mychara={mychara}
        gid={gid}
        setAlb={(data) => setAlbum(...album, data)}
      />

      <Modal size={"7xl"} isOpen={modalImage} onClose={() => setModalImage("")}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody>
            <Image src={modalImage} height="90%" width="90%"></Image>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Gallery;
