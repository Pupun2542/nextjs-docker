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
import {
  limit,
  onSnapshot,
  query,
  collection,
  orderBy,
  doc
} from "firebase/firestore";
import { useApp, useUser } from "../../src/hook/local";
import { ImageSquare, X } from "phosphor-react";

export const Commentsection = ({ gid, commenters, initialcomment }) => {
  const getuser = useUser();
  const [loadlimit, setLoadlimit] = useState(20);
  const { app, auth, db } = useApp();
  const [snapshot, setSnapshot] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const inputFileRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState({});
  const [replyImage, setReplyImage] = useState({});
  const [commentEditMessage, setCommentEditMessage] = useState({});
  const [replyEditMessage, setReplyEditMessage] = useState({});
  const [commentcount, setCommentcount] = useState(initialcomment);
  const [initialcommentcount, setInitialcommentcount] = useState(initialcomment);
  const setStateReply = (id, msg) => {
    setReplyMessage({ ...replyMessage, [id]: msg });
  };
  const setStateImage = (id, msg) => {
    setReplyImage({ ...replyImage, [id]: msg });
  };
  const setStateCommentEditMessage = (id, msg) => {
    setCommentEditMessage({ ...commentEditMessage, [id]: msg });
  };
  const setStateReplyEditMessage = (id, msg) => {
    setReplyEditMessage({ ...replyEditMessage, [id]: msg });
  };
  const fetchdata = (limit) =>{
    axios.get(`${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/comment/?limit=${limit}`).then((res)=>{
      const snapshot = res.data;
      setSnapshot(snapshot)
      setInitialcommentcount(snapshot.length)
    })
  }

  useEffect(() => {
    fetchdata(loadlimit);
    setInitialcommentcount((initialcommentcount < snapshot.length? snapshot.length : initialcommentcount));

    const unsubscribe = onSnapshot(doc(db, "group", gid), (doc)=>{
      if (doc.data()){
        setCommentcount(doc.data().commentcount);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [gid, loadlimit]);

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
    await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/comment/create`,
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
    fetchdata(loadlimit);

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

  const deleteComment = (k) =>{
    const newsnap = snapshot.filter((v,i)=> i !== k);
    setSnapshot(newsnap);
  }

  const resizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  return (
    <Box
      width={"90%"}
      marginTop="20px"
      marginBottom="50px"
      fontFamily={"Sarabun"}
    >
      <Text fontSize={32}>
        ความคิดเห็น - [
        {commentcount||0}]
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
              resizeTextArea(e);
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            width="100%"
            placeholder="Write Something"
            height="45px"
            backgroundColor="white"
            fontSize={18}
            onPaste={handleImagePaste}
          />
          <InputRightElement>
            <IconButton
              size={'sm'}
              mt={1}
              mr={1}
              rounded={'full'}
              onClick={handleFile}
              icon={<ImageSquare size={18} />}
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
      {commentcount >
        initialcommentcount && (
        <Text
          decoration="underline"
          onClick={() => fetchdata(loadlimit)}
        >
          Load more
        </Text>
      )}
      {snapshot.map((doc, k) => (
        <Commentpost
          cdoc={doc}
          key={k}
          commenters={commenters}
          setrpymsg={(msg) => setStateReply(doc.cid, msg)}
          setImage={(img) => setStateImage(doc.cid, img)}
          setEditReplyMessage={setStateReplyEditMessage}
          setEditMessage={(msg)=> setStateCommentEditMessage(doc.cid, msg)}
          editMessage={commentEditMessage[doc.cid]}
          editReplyMessage={replyEditMessage}
          image={replyImage[doc.cid]}
          rpymsg={replyMessage[doc.cid]}
          onCommentDelete={()=>deleteComment(k)}
        />
      ))}
      {initialcommentcount >
        loadlimit && (
        <Text
          decoration="underline"
          onClick={() => setLoadlimit(loadlimit + 20)}
        >
          Load more
        </Text>
      )}
    </Box>
  );
};
