import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Image,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { UploadGroupCommentImage } from "../../src/services/filestoreageservice";
import axios from "axios";
import { Commentpost } from "./groupcomment";
import { useCollection } from "react-firebase-hooks/firestore";

export const Commentsection = ({ gid, commenters, commentcount }) => {
  let commenter = commenters;
  const { app, auth, db } = useApp();
  const q = query(
    collection(db, "group", gid, "comments"),
    orderBy("timestamp", "desc")
  );
  const [snapshot, loading, error] = useCollection(q);
  // const [replyState, setReplyState] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const inputFileRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMessage = async () => {
    const token = await auth.currentUser.getIdToken();
    let imageURL = "";
    if (image) {
      imageURL = await UploadGroupCommentImage(
        image,
        auth.currentUser.uid,
        gid
      );
    }
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}/comment/create`,
      {
        message: message,
        imageURL: imageURL,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setMessage("");
    setImage(null);
  };
  const handleUploadFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleFile = () => {
    inputFileRef.current.click();
  };
  const handleImagePaste = (e) => {
    if (e.clipboardData.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.clipboardData.files[0]);
    }
  };
  return (
    <Box
      marginLeft="100px"
      marginRight="100px"
      marginTop="20px"
      marginBottom="50px"
      fontFamily={"Mitr"}
    >
      <Text fontSize={32} fontWeight={"bold"}>
        ความคิดเห็น - [{commentcount}]
      </Text>
      <Box>
        <InputGroup>
          <Textarea
            resize="none"
            minHeight={11}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !e.shiftKey) {
                handleMessage();
              }
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            width="100%"
            placeholder="Write Something"
            height="45px"
            backgroundColor="gray.100"
            onPaste={handleImagePaste}
          />
          <InputRightElement>
            <IconButton
              paddingTop={1}
              h={15}
              w={11}
              borderRadius={100}
              onClick={handleFile}
              icon={<ImageSquare size={32} weight="bold" />}
            />
          </InputRightElement>
        </InputGroup>
        <Input
          type="file"
          id="file"
          ref={inputFileRef}
          display="none"
          onChange={(e) => handleUploadFile(e)}
        />
        {image ? (
          <Box pos={"relative"}>
            <Image
              src={image}
              width="250px"
              height="250px"
              onClick={() => setModalOpen(true)}
              objectFit="cover"
            />
            <IconButton
              icon={<X size={16} color="black" />}
              position="absolute"
              top={0}
              left={200}
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent" }}
              onClick={() => setImage(null)}
            ></IconButton>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              size="md"
            >
              <ModalOverlay
                bg="blackAlpha.100"
                opacity="40%"
                backdropBlur="6px"
              />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Image src={image} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        ) : (
          <></>
        )}
      </Box>

      {snapshot.docs.map((doc, k) => (
        <Commentpost cdoc={doc.data()} id={id} key={k} />
      ))}
    </Box>
  );
};
