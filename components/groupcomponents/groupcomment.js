import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useApp, useUser } from "../../src/hook/local";

export const Commentpost = ({ cdoc, gid, commenters }) => {
  const commentdoc = cdoc.data();
  const { db, auth } = useApp();
  const [reply, setReply] = useState(undefined);
  const [loadlimit, setloadlimit] = useState(20);
  const getuser = useUser()
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "gorup", gid, "comments", cdoc.id, "replies"),
        limit(loadlimit),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs.map((doc)=>(doc.data()));
          const creators = snapshot.docs.map((doc)=>(doc.data().uid));
          
        }
      }
    );
    return () => {unsubscribe()};
  }, [id]);
  return (
    <Flex
      p={2.5}
      fontFamily={"Mitr"}
      width="100%"
      backgroundColor="#FFFFFF"
      boxShadow="0 0 2px #000000"
      borderRadius={10}
      marginTop="10px"
    >
      <Center flexGrow={1} w={75} h={70} mr={2.5}>
        <Image maxW={70} src={commentdoc.creator.thumbnail} rounded={"full"} />
      </Center>

      <Flex flexDir="column" flexGrow={10}>
        <Flex justifyContent="space-between">
          <Text fontSize={20}>
            {commentdoc.creator.displayName
              ? commentdoc.creator.displayName
              : "placeholder"}
          </Text>

          <Text fontSize={10} mt={3} color={"GrayText"}>
            {commentdoc.timestamp
              ? parseDate(commentdoc.timestamp)
              : "01/01/1970:00.00"}
          </Text>
        </Flex>

        <Divider />
        {editMode ? (
          // <InputGroup>
          <Input
            onKeyDown={(e) => {
              // console.log(e.key)
              if (e.key == "Enter" && !e.shiftKey) {
                // console.log('message sent')
                handleEdit();
              } else if (e.key == "Escape") {
                if (image != checkImage.current) {
                  setImage(checkImage.current);
                }
                setEditMode(false);
              }
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            width="100%"
            placeholder="Write Something"
            height="45px"
            backgroundColor="gray.100"
            mb={2.5}
          />
        ) : (
          //  <InputRightElement>
          //   <IconButton
          //     paddingTop={1}
          //     h={15}
          //     w={11}
          //     borderRadius={100}
          //     onClick={handleFile}
          //     icon={<ImageSquare size={32} weight="bold" />}
          //   />
          // </InputRightElement>
          // </InputGroup>
          <Box fontSize={14} minW={"625"} w={"auto"} maxW={600}>
            <Text whiteSpace="pre-line">
              {commentdoc.message ? commentdoc.message : ""}
            </Text>
          </Box>
        )}
        {/* <Input
          type="file"
          id="file"
          ref={inputFileRef}
          display="none"
          onChange={(e) => handleUploadFile(e)}
        /> */}

        {image ? (
          <>
            <Box pos={"relative"}>
              <Image
                objectFit="cover"
                src={image ? image : ""}
                width="250px"
                height="250px"
                onClick={() => setModalOpen(true)}
              />

              {/* Edit รูป */}

              {/* {editMode ? (
                <IconButton
                  icon={<X size={16} color="black" />}
                  position="absolute"
                  top={0}
                  left={200}
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent" }}
                  onClick={() => setImage(null)}
                ></IconButton>
              ) : (
                <></>
              )} */}
            </Box>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              size="md"
            >
              <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(10px) hue-rotate(90deg)"
              />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Image src={image} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <></>
        )}

        <Box>
          <Button
            mt={2}
            mr={2}
            p={2}
            w={"auto"}
            onClick={HandleLove}
            // backgroundColor={cdoc.data().love.includes(auth.currentUser.uid)? "red.400" : "white"}
            _hover={{
              backgroundColor: "gray.100",
            }}
          >
            <Box p={1}>
              <Heart
                size={16}
                color={"red"}
                weight={
                  commentdoc.love.includes(auth.currentUser.uid)
                    ? "fill"
                    : "regular"
                }
              />
            </Box>

            <Box p={1}>{commentdoc.love ? commentdoc.love.length : "0"}</Box>
          </Button>

          <Button mt={2} mr={2} onClick={onToggle}>
            <Box p={1}>
              <ChatCenteredText size={16} color="#000000" />
            </Box>

            <Box p={1}>{reply}</Box>
          </Button>
        </Box>
        {isOpen && <Reply id={id} commentId={cdoc.id} setReply={setReply} />}
      </Flex>
      <Menu>
        <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
          <DotsThreeVertical size={30} />
        </MenuButton>
        <MenuList>
          {auth.currentUser.uid == commentdoc.userId ? (
            <>
              <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </>
          ) : (
            <MenuItem>Report</MenuItem>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};
