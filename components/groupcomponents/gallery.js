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
import Albuminfo from "./albuminfo";

const Gallery = ({ gid, mychara, data }) => {
  const { auth } = useApp();
  const [modalImage, setModalImage] = useState("");
  const [gallery, setGallery] = useState([]);
  const [album, setAlbum] = useState([]);
  const [tabindex, setTabindex] = useState(0);
  const [isCreateAlbOpen, setCreateAlbOpen] = useState(false);
  const [specificAlbum, setSpecificAlbum] = useState({});
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
    console.log("fetchalbum");
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
    console.log(tabindex);
    if (tabindex == 0) {
      fetchGallery();
    } else {
      fetchAlbum();
    }
  }, [gid, tabindex]);

  const editAlbum = (value) => {
    console.log(value);
    const index = album.findIndex((v)=> v.aid === value.aid);
    let newalbum = [...album];
    newalbum[index] = value;
    if (specificAlbum.aid == value.aid) {
      setSpecificAlbum({...specificAlbum, ...value});
    }
    setAlbum(newalbum);
  }

  useEffect(()=>{
    console.log(album)
  },[album])

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
              onClick={() => {
                setTabindex(0);
                setSpecificAlbum({});
              }}
              mr={5}
              bg={tabindex == 0 ? "#4C4D88" : "#9999AF"}
              _hover={{ color: "white" }}
            >
              Picture
            </Button>
            <Button
              onClick={() => {
                setTabindex(1);
                setSpecificAlbum({});
              }}
              bg={tabindex == 1 ? "#4C4D88" : "#9999AF"}
              _hover={{ color: "white" }}
            >
              Album
            </Button>
          </Box>
          {tabindex == 0 && !specificAlbum.uid && (
            <Button
              bg={"#FBBC43"}
              borderWidth={2}
              borderColor={"black"}
              borderRadius={10}
            >
              Add Picture
            </Button>
          )}
          {tabindex == 1 && !specificAlbum.uid && (
            <Button
              bg={"#FBBC43"}
              borderWidth={2}
              borderColor={"black"}
              borderRadius={10}
              onClick={() => setCreateAlbOpen(true)}
            >
              Add Album
            </Button>
          )}
          {specificAlbum.uid && specificAlbum.uid === auth.currentUser.uid && (
            <Button
              bg={"#FBBC43"}
              borderWidth={2}
              borderColor={"black"}
              borderRadius={10}
              onClick={() => setCreateAlbOpen(true)}
            >
              Edit Albums
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
              {specificAlbum.uid ? (
                <Albuminfo data={specificAlbum} chara={data.chara} gid={gid} />
              ) : (
                <SimpleGrid columns={3} rowGap={3}>
                  {gallery.length > 0 &&
                    album.map((alb, k) => (
                      <Box key={k} onClick={() => setSpecificAlbum(alb)}>
                        <Image
                          cursor={"pointer"}
                          src={alb.mediaList[0].url}
                          fallback={<Spinner />}
                          width={225}
                          height={225}
                          objectFit={"contain"}
                          borderRadius={10}
                          boxShadow={"base"}
                          loading={"lazy"}
                        />
                        <Text textAlign={"center"}>{alb.name}</Text>
                      </Box>
                    ))}
                </SimpleGrid>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {isCreateAlbOpen && (
        <>
          {specificAlbum.aid ? (
            <CreateAlbumForm
              onClose={() => setCreateAlbOpen(false)}
              mychara={mychara}
              gid={gid}
              setAlb={(data) => editAlbum(data)}
              alb={specificAlbum}
            />
          ) : (
            <CreateAlbumForm
              onClose={() => setCreateAlbOpen(false)}
              mychara={mychara}
              gid={gid}
              setAlb={(data) => setAlbum(...album, data)}
            />
          )}
        </>
      )}

      <Modal size={"2xl"} isOpen={modalImage} onClose={() => setModalImage("")}>
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
