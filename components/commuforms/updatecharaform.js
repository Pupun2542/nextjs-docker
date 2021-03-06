import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Input,
  Textarea,
  Text,
  VStack,
  Image,
  Circle,
  IconButton,
} from "@chakra-ui/react";
import UploadImageModal from "../universalUploadModal";
import { X } from "phosphor-react";

const Updatecharacterform = ({ onSubmit, onClose, data }) => {
  const [image, setImage] = useState(data.photoURL? data.photoURL:"");
  const [isuploadOpen, setUploadOpen] = useState(false);
  const [name, setName] = useState(data.name?data.name: "");
  const [desc, setDesc] = useState(data.description?data.description:"");
  const [docLink, setDocLink] = useState(data.docLink?data.docLink:"");
  const onCharaAdd = () => {
    onSubmit({
      name: name.trim(),
      image: image.trim(),
      docLink: docLink.trim(),
      description: desc.trim(),
    });
    onClose();
  };
  return (
    <ModalContent>
      <ModalHeader>Update Chara</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack>
          <Center
            width={"100%"}
            w="150px"
            h="150px"
            borderRadius={100}
            pos="relative"
          >
            <Image
              w="100%"
              h="100%"
              src={image}
              borderRadius={100}
              fallback={
                <Center
                  borderColor={"gray"}
                  w="100%"
                  borderRadius={100}
                  h="100%"
                  borderStyle={"solid"}
                  borderWidth={2}
                  onClick={() => setUploadOpen(true)}
                >
                  Select Image
                </Center>
              }
            />
            <IconButton
              bg="transparent"
              icon={<X size="16px" />}
              right={0}
              top={0}
              pos="absolute"
              _hover={{ background: "transparent" }}
              display={image ? "initial" : "none"}
            />
          </Center>
          <Center width={"100%"}>
            <Input
              placeholder="?????????????????????????????????"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Center>
          <Center width={"100%"}>
            <Textarea
              placeholder="???????????????????????????????????????"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Center>
          <Center width={"100%"}>
            <Text width={"20%"}>???????????????????????????</Text>
            <Input
              width={"80%"}
              value={docLink}
              onChange={(e) => setDocLink(e.target.value)}
            />
          </Center>
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          ?????????
        </Button>
        <Button onClick={onCharaAdd}>??????????????????</Button>
      </ModalFooter>
      {/* <Input
        type="file"
        id="file"
        ref={inputFileRef}
        display="none"
        onChange={(e) => handleUploadFile(e)}
      /> */}
      <UploadImageModal
        aspectRatio={1 / 1}
        isOpen={isuploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={(i) => setImage(i)}
      />
    </ModalContent>
  );
};

export default Updatecharacterform;
