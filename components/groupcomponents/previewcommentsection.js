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
import { limit, onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { useApp, useUser } from "../../src/hook/local";
import { ImageSquare } from "phosphor-react"

export const Commentsection = ({ gid, commenters, commentcount }) => {
  const getuser = useUser()
  // let commenter = commenters;
  const [loadlimit, setLoadlimit] = useState(20);
  const { app, auth, db } = useApp();
  const q = query(
    collection(db, "group", gid, "comments"),
    orderBy("timestamp", "desc"),
    limit(loadlimit)
  );
  // const [snapshot, loading, error] = useCollection(q);
  const [snapshot, setSanpshot] = useState([]);
  // const [replyState, setReplyState] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const inputFileRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    const unsubscribe = onSnapshot(q, (snapshot)=>{
      if (!snapshot.empty) {
        const creators = snapshot.docs.map((doc)=>(doc.data().uid));
        console.log(creators)
        let missing = [];
        let notmissing = [];
        creators.map((id)=>{
          if (Object.keys(commenters).includes(id)) {
            notmissing = [...notmissing, id];
          } else {
            missing = [...missing, id]
          }
        })
        console.log(missing, notmissing, commenters)
        if (missing.length > 0) {
          getuser(missing).then((found)=>{
            let foundmissing = found;
            if (Object.keys(commenters).length > 0) {
              // console.log()
              const arrcommenters  = Object.entries(commenters);
              const mappedcommenters = Object.fromEntries([arrcommenters.filter(([k, v])=>Object.keys(commenters).includes(k))])
              if (mappedcommenters) {
                foundmissing = [...foundmissing, ...Object.values(mappedcommenters)]
              }
            }
            console.log(foundmissing)
            setSanpshot(snapshot.docs.map((doc)=>({
              ...doc.data(),
              creator: foundmissing[doc.data().uid],
              cid: doc.id,
            })));
          });
        } else {
          if (Object.keys(commenters).length > 0) {
            const arrcommenters  = Object.entries(commenters);
            console.log(arrcommenters)
            const mappedcommenters = Object.fromEntries(arrcommenters.filter(([k, v])=>Object.keys(commenters).includes(k)))
            console.log(mappedcommenters)
            setSanpshot(snapshot.docs.map((doc)=>({
              ...doc.data(),
              creator: mappedcommenters[doc.data().uid],
              cid: doc.id,
            })));
          }
        }
      }
    }, (e)=>{
      console.log(e)
    })
    return ()=> {unsubscribe()};
  },[])

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

  const resizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
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
              resizeTextArea(e)
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

      {snapshot.map((doc, k) => (
        <Commentpost cdoc={doc} gid={gid} key={k} commenters={commenters} />
      ))}
      {commentcount > loadlimit&&(<Text decoration='underline' onClick={()=>setLoadlimit(loadlimit + 20)}>Load more</Text>)}
    </Box>
  );
};
