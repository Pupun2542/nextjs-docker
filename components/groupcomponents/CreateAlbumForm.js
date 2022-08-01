import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Divider,
  Flex,
  Input,
  Button,
  SimpleGrid,
  Textarea,
  Box,
  useDisclosure,
  Image,
  IconButton,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { CaretDown, ImageSquare, X } from "phosphor-react";
import { isEmptyOrSpaces } from "../../src/services/utilsservice";
import { useApp } from "../../src/hook/local";
import {
  deleteImage,
  UploadGroupAlbumImage,
} from "../../src/services/filestoreageservice";
import { collection, doc } from "firebase/firestore";
import axios from "axios";

export const CreateAlbumForm = ({ onClose, mychara, gid, setAlb, alb }) => {
  const chara = mychara ? Object.values(mychara) : [];
  const [formMode, setFormMode] = useState(mychara ? 1 : 0);
  const {
    isOpen: isCharSelectOpen,
    onOpen: onCharSelectOpen,
    onClose: onCharSelectClose,
    onToggle: onCharSelectToggle,
  } = useDisclosure();
  const uploadRef = useRef(null);
  const dropdownref = useRef(null);
  const [selectedChar, setSelectedchara] = useState({});
  const [selectedImage, setSelectedImage] = useState([]);
  const [albName, setAlbName] = useState("");
  const [albDesc, setAlbDesc] = useState("");
  const { auth, db } = useApp();
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState("");
  // const newImageRef = useRef(null);
  const deletedImageRef = useRef([]);

  document.addEventListener("mousedown", (e) => {
    if (dropdownref.current && !dropdownref.current.contains(e.target)) {
      onCharSelectClose();
    }
  });

  useEffect(() => {
    if (alb?.aid) {
      setSelectedImage(alb.mediaList);
      setSelectedchara(mychara[alb.caid]);
      setAlbName(alb.name);
      setAlbDesc(alb.description);
    }
    return () => {
      setSelectedImage([]);
      setSelectedchara({});
      setAlbName("");
      setAlbDesc("");
    };
  }, [alb]);

  const HandleSubmit = async () => {
    if (!isEmptyOrSpaces(albName)) {
      if ((formMode == 1 && selectedChar.name) || formMode == 0) {
        setLoading(true);
        const aid = alb?.aid
          ? alb.aid
          : doc(collection(db, "group", gid, "album")).id;
        let dlurl = [];
        if (selectedImage.length > 0) {
          dlurl = await Promise.all(
            selectedImage.map(async (img) => {
              let mappedImage;
              if (!img.url.startsWith("https://")) {
                const url = await UploadGroupAlbumImage(
                  img.url,
                  auth.currentUser.uid,
                  gid,
                  aid
                );
                mappedImage = {
                  url: url.dlurl,
                  path: url.path,
                  desc: img.desc,
                  uid: auth.currentUser.uid,
                };
              } else {
                mappedImage = {
                  url: img.url,
                  path: img.path,
                  desc: img.desc,
                  uid: img.uid,
                };
              }
              // console.log(mappedImage);
              return mappedImage;
            })
          );
        }
        const data = {
          uid: auth.currentUser.uid,
          caid: selectedChar.refererId || "",
          name: albName,
          type: formMode,
          thumbnail: 0,
          description: albDesc,
          mediaList: dlurl,
        };

        const token = await auth.currentUser.getIdToken();
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/album/${
            alb && alb.aid ? "update" : "create"
          }/`,
          { aid: aid, data: data },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          if (deletedImageRef.current.length > 0) {
            await Promise.all(
              deletedImageRef.current.map(async (ref) => {
                await deleteImage(ref);
              })
            );
          }
          setLoading(false);
          // if (!(alb && alb.aid)) {
          setAlb({ ...data, aid: aid });
          // }
          onClose();
        }
      }
    }
  };

  const handleUploadFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage([...selectedImage, { url: reader.result }]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onWriteDesc = (v, k) => {
    let newSelected = [...selectedImage];
    const edit = { ...newSelected[k], desc: v };
    newSelected[k] = edit;
    setSelectedImage(newSelected);
  };

  const onRemoveImage = (k) => {
    if (selectedImage[k].url.startsWith("https://")) {
      deletedImageRef.current = [
        ...deletedImageRef.current,
        selectedImage[k].path,
      ];
    }
    setSelectedImage(selectedImage.filter((v, i) => i !== k));
    uploadRef.current.value = "";
  };

  return (
    <Flex
      // display={isOpen ? "flex" : "none"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      minHeight={"calc(100vh - 238px)"}
    >
      <Box>
        <Box bg={"white"} borderRadius={10} boxShadow={"base"} pl={5} pr={5}>
          <Text textAlign={"center"} p={5} fontSize={22} fontWeight={"bold"}>
            {alb?.aid ? "แก้ไขอัลบั้ม" : "สร้างอัลบั้มใหม่"}
          </Text>
          <Divider />
          <Box pt={5}>
            <Text>ชื่ออัลบั้ม</Text>
            <Input
              value={albName}
              onChange={(e) => setAlbName(e.target.value)}
            />
            <Flex justifyContent={"center"} pt={5} pb={5}>
              <SimpleGrid columnGap={5} columns={2}>
                <Button
                  minWidth="150px"
                  onClick={() => setFormMode(0)}
                  bg={formMode == 0 ? "#4C4D88" : "#9999AF"}
                  color="white"
                  _hover={{ color: "white" }}
                >
                  ทั่วไป
                </Button>
                <Tooltip
                  label={"ต้องสร้างตัวละครก่อนถึงจะสร้างอัลบัมตัวละครได้"}
                  shouldWrapChildren
                  isDisabled={mychara}
                >
                  <Button
                    isDisabled={!mychara}
                    minWidth="150px"
                    onClick={() => setFormMode(1)}
                    bg={formMode == 1 ? "#4C4D88" : "#9999AF"}
                    color="white"
                    _hover={{ color: "white" }}
                  >
                    ตัวละคร
                  </Button>
                </Tooltip>
              </SimpleGrid>
            </Flex>
          </Box>
          <Flex justifyContent={"center"}>
            {formMode == 1 && (
              <Flex
                cursor={"pointer"}
                onClick={onCharSelectToggle}
                position={"relative"}
                userSelect={"none"}
                ref={dropdownref}
                mb={5}
              >
                <Box
                  borderWidth={1}
                  width={300}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  borderTopLeftRadius={5}
                  borderBottomLeftRadius={5}
                >
                  <Text position={"relative"} bottom="-4px" pl={1} pr={1}>
                    {/* {console.log(selectedChar)} */}
                    {selectedChar.name ? selectedChar.name : "เลือกตัวละคร"}
                  </Text>
                </Box>
                <Box
                  bg={"gray"}
                  borderTopRightRadius={5}
                  borderBottomRightRadius={5}
                >
                  <CaretDown size={32} />
                </Box>
                <Box
                  width={300}
                  minHeight={30}
                  position={"absolute"}
                  zIndex={33333}
                  bg={"white"}
                  display={isCharSelectOpen ? "initial" : "none"}
                  top={"32px"}
                >
                  {chara.map((char, k) => (
                    <Box
                      key={k}
                      _hover={{ bg: "#D1D1D1" }}
                      onClick={() => setSelectedchara(char)}
                    >
                      {char.name}
                      <Divider />
                    </Box>
                  ))}
                </Box>
              </Flex>
            )}
          </Flex>
          <Textarea
            mb={5}
            placeholder={"เขียนข้อความ..."}
            value={albDesc}
            onChange={(e) => setAlbDesc(e.target.value)}
          ></Textarea>
        </Box>
        <SimpleGrid columns={3} rowGap={3} mt={5} mb={5} columnGap={5}>
          {selectedImage.length > 0 &&
            selectedImage.map((img, k) => (
              <Box
                position={"relative"}
                bg={"white"}
                width={225}
                borderRadius={10}
                boxShadow={"base"}
                key={k}
              >
                <IconButton
                  icon={<X />}
                  position={"absolute"}
                  onClick={() => onRemoveImage(k)}
                  right={0}
                  bg={"transparent"}
                ></IconButton>
                <Image
                  key={k}
                  cursor={"pointer"}
                  src={img.url}
                  width={225}
                  height={225}
                  objectFit={"contain"}
                  borderTopRadius={10}
                  loading={"lazy"}
                  onClick={() => setModalImage(img.url)}
                />
                <Textarea
                  value={img.desc ? img.desc : ""}
                  onChange={(e) => onWriteDesc(e.target.value, k)}
                  maxW={225}
                  borderTopRadius={0}
                  borderWidth={0}
                  borderTopWidth={1}
                  placeholder={"คำอธิบายรูปภาพ"}
                ></Textarea>
              </Box>
            ))}
        </SimpleGrid>
      </Box>
      <Flex justifyContent={"center"}>
        <Button
          bg={"white"}
          width="150px"
          boxShadow={"base"}
          onClick={() => uploadRef.current.click()}
        >
          <ImageSquare />
          <Text ml={1}>เพิ่มรูปภาพ</Text>
        </Button>
      </Flex>

      <Box textAlign={"end"} mt={5}>
        <Button
          display={"inline-block"}
          onClick={onClose}
          bg={"#FBBC43"}
          borderWidth={2}
          borderColor={"black"}
          borderRadius={10}
          marginRight={5}
        >
          ยกเลิก
        </Button>
        <Button
          display={"inline-block"}
          onClick={HandleSubmit}
          bg={"#FBBC43"}
          borderWidth={2}
          borderColor={"black"}
          borderRadius={10}
        >
          ยืนยัน
        </Button>
      </Box>
      <Input
        ref={uploadRef}
        type="file"
        display={"none"}
        accept="image/png, image/gif, image/jpeg"
        onChange={(e) => handleUploadFile(e)}
      />
      <Box
        position={"fixed"}
        display={loading ? "initial" : "none"}
        top={"50vh"}
        left={"50vw"}
        zIndex={9999}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
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
