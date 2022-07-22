import React, { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { CaretDown, ImageSquare, X } from "phosphor-react";
import { isEmptyOrSpaces } from "../../src/services/utilsservice";
import { useApp } from "../../src/hook/local";
import { UploadGroupAlbumImage } from "../../src/services/filestoreageservice";
import { collection, doc } from "firebase/firestore";
import axios from "axios";

export const CreateAlbumForm = ({ isOpen, onClose, mychara, gid, setAlb }) => {
  const chara = Object.values(mychara);
  const [formMode, setFormMode] = useState(0);
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

  document.addEventListener("mousedown", (e) => {
    if (dropdownref.current && !dropdownref.current.contains(e.target)) {
      onCharSelectClose();
    }
  });

  const HandleSubmit = async () => {
    if (!isEmptyOrSpaces(albName)) {
      if ((formMode == 1 && selectedChar.name) || formMode == 0) {
        setLoading(true);
        const aid = doc(collection(db, "group", gid, "album"));
        let dlurl = [];
        if (selectedImage.length > 0) {
          dlurl = await Promise.all(
            selectedImage.map(async (img) => {
              const url = await UploadGroupAlbumImage(
                img.url,
                auth.currentUser.uid,
                gid,
                aid.id
              );
              const mappedImage = {
                url: url.dlurl,
                path: url.path,
                desc: albDesc,
                uid: auth.currentUser.uid,
              };
              return mappedImage;
            })
          );
        }
        const data = {
          uid: auth.currentUser.uid,
          caid: selectedChar.refererId,
          name: albName,
          type: formMode,
          description: albDesc,
          mediaList: dlurl,
        };
        const token = await auth.currentUser.getIdToken();
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/album/create/`,
          { aid: aid.id, data: data },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          setAlb(data);
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

  return (
    <Flex
      display={isOpen ? "flex" : "none"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      minHeight={"calc(100vh - 238px)"}
    >
      <Box>
        <Box bg={"white"} borderRadius={10} boxShadow={"base"} pl={5} pr={5}>
          <Text textAlign={"center"} p={5} fontSize={22} fontWeight={"bold"}>
            สร้างอัลบั้มใหม่
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
                <Button
                  minWidth="150px"
                  onClick={() => setFormMode(1)}
                  bg={formMode == 1 ? "#4C4D88" : "#9999AF"}
                  color="white"
                  _hover={{ color: "white" }}
                >
                  ตัวละคร
                </Button>
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
              >
                <IconButton
                  icon={<X />}
                  position={"absolute"}
                  onClick={() => {
                    setSelectedImage(selectedImage.filter((v, i) => i !== k));
                    uploadRef.current.value = "";
                  }}
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
                  // onClick={() => setModalImage(img.url)}
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
      <Box position={"fixed"} top={"50vh"} left={"50vw"} zIndex={9999}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    </Flex>
  );
};
