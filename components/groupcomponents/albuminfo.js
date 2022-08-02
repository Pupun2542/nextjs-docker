import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Spinner,
  AspectRatio,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  Center,
  Button,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { ChatCenteredText, Eye, Heart } from "phosphor-react";
import React, { useState } from "react";
import { useApp } from "../../src/hook/local";
import axios from "axios";

const Albuminfo = ({ data, chara, gid }) => {
  const [modalImage, setModalImage] = useState("");
  const images = [...data.mediaList];
  const thumbnail = images.shift();
  const [love, setLove] = useState(data.love ? data.love : []);
  const { auth } = useApp();

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love.includes(auth.currentUser.uid)) {
      setLove(love.filter((v, i) => v !== auth.currentUser.uid));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/album/${data.aid}/unlove`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status !== 200) {
        alert("เกิดข้อผิดพลาดกับระบบ กรุณาแจ้งทีมงาน");
      }
    } else {
      setLove([...love, auth.currentUser.uid]);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/album/${data.aid}/love`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status !== 200) {
        alert("เกิดข้อผิดพลาดกับระบบ กรุณาแจ้งทีมงาน");
      }
    }
  };

  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Text fontSize={30} textAlign={"center"}>
          {data.name}
        </Text>
      </Box>
      {data.caid && (
        <>
          <Box
            fontSize={"xl"}
            display={data.caid ? "initial" : "none"}
            textAlign={"center"}
          >
            <Text display={"inline-block"} mr={2}>
              Album of
            </Text>

            <Text display={"inline-block"} fontStyle={chara[data.caid]? "normal" : "italic"} >{chara[data.caid]?.name || "ตัวละครที่ถูกลบไปแล้ว"}</Text>
          </Box>

          <HStack justifyContent={"center"}>
            <Tag
              bg={"royalblue"}
              textColor={"white"}
              display={"inline-block"}
              py={1}
              px={2}
              borderRadius={5}
              mx={2}
              w={"auto"}
              fontSize={"14"}
            >
              ตัวละคร
            </Tag>
          </HStack>
        </>
      )}

      <Box>
        <Text py={5} whiteSpace={"pre-line"} textAlign={"center"}>
          {data.description}
        </Text>
      </Box>
      <Divider />
      {images?.length > 0 && (
        <Grid
          width={"95%"}
          templateColumns="repeat(4, 1fr)"
          gap={3}
          bg={"white"}
          p={5}
          boxShadow={"base"}
          borderRadius={10}
          mt={5}
        >
          <GridItem colSpan={2} rowSpan={2}>
            <AspectRatio ratio={1 / 1}>
              <Image
                cursor={"pointer"}
                src={thumbnail.url}
                fallback={<Spinner />}
                objectFit={"contain !important"}
                boxShadow={"base"}
                loading={"lazy"}
                onClick={() => setModalImage(thumbnail.url)}
              />
            </AspectRatio>
            <Text textAlign={"center"}>{thumbnail.desc}</Text>
          </GridItem>
          {images.map((img) => (
            <GridItem colSpan={1} rowSpan={1}>
              <AspectRatio ratio={1 / 1}>
                <Image
                  cursor={"pointer"}
                  src={img.url}
                  fallback={<Spinner />}
                  objectFit={"contain !important"}
                  boxShadow={"base"}
                  loading={"lazy"}
                  onClick={() => setModalImage(img.url)}
                />
              </AspectRatio>
              <Text textAlign={"center"}>{img.desc}</Text>
            </GridItem>
          ))}
        </Grid>
      )}

      <HStack
        mt={2}
        spacing={4}
        w={"100%"}
        fontSize={14}
        color={"GrayText"}
        p={1}
        boxShadow={"base"}
        bg={"#F3F5F8"}
        borderRadius={5}
      >
        <Button
          leftIcon={
            <Heart
              size={18}
              weight={love.includes(auth.currentUser.uid) ? "fill" : "regular"}
            />
          }
          color={love.includes(auth.currentUser.uid) ? "#EA4545" : "black"}
          width={"35%"}
          fontSize={16}
          fontWeight={"light"}
          boxShadow={"base"}
          variant="solid"
          onClick={HandleLove}
          bg={"white"}
          h={30}
        >
          <Text color={"gray.500"}>{love.length}</Text>
        </Button>
        <Button
          leftIcon={<ChatCenteredText />}
          color="black"
          width={"35%"}
          fontSize={16}
          fontWeight={"light"}
          boxShadow={"base"}
          variant="solid"
          //   onClick={onToggle}
          bg={"white"}
          h={30}
        >
          <Text color={"gray.500"}>
            {/* {data.comment > comment?.length ? data.comment : comment?.length} */}
            0
          </Text>
        </Button>
        <Box w={"100%"}></Box>
        <Center
          color="black"
          width={"35%"}
          fontSize={16}
          fontWeight={"light"}
          variant="solid"
          h={30}
          borderRadius={5}
          _hover={{ bg: "gray.200" }}
        >
          <Eye />
          {/* {post.view} */}
        </Center>
      </HStack>
      <Modal size={"2xl"} isOpen={modalImage} onClose={() => setModalImage("")}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody>
            <Image src={modalImage} height="90%" width="90%"></Image>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Albuminfo;
