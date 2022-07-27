import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  VStack,
  IconButton,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import UserSearchInput from "../groupcomponents/userSearchInput";
import { X } from "phosphor-react";

const Inviteplayerform = ({ onPendingSubmit, onClose, checklist }) => {
  const [pendingList, setPendingList] = useState([]);
  const addPendingList = (data) => {
    if (checklist.find(v=>v.uid === data.uid)) {
        alert ("มีชื่อเป็นสมาชิกอยู่แล้ว");
    } else {
        setPendingList([...pendingList, data]);
    }
    
  };
  const removePendingList = (index) => {
    const newPendingList = pendingList.filter((v, i) => i != index);
    setPendingList(newPendingList);
  };
  const onSubmit = () => {
    onPendingSubmit(pendingList);
    onClose();
  }

  return (
    <ModalContent>
      <ModalHeader>Invite Player</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <UserSearchInput onSelect={addPendingList} />
        {pendingList.map((mem, i) => (
          <Flex
            bg={"white"}
            p={"5px"}
            h={"80px"}
            borderRadius={10}
            boxShadow={"base"}
            key={i}
          >
            <Avatar
              w={"70px"}
              h={"70px"}
              src={mem.photoURL}
              name={mem.displayName}
            ></Avatar>
            <VStack ml={"5px"} mr={"5px"} w={"100%"}>
              <Box mt={"5px"} fontSize={18} textAlign={"left"} width={"100%"}>
                {mem.displayName}
              </Box>
            </VStack>
            <IconButton
              size={"xs"}
              rounded={"full"}
              icon={<X />}
              onClick={() => removePendingList(i)}
            />
          </Flex>
        ))}
        
      </ModalBody>

      <ModalFooter>

        <Button onClick={onSubmit}>ยืนยัน</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default Inviteplayerform;
