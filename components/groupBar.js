import {
  Avatar,
  Box,
  HStack,
  VStack,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UseChatManager from "../src/hook/useChatManager";

export const GroupBar = ({ id, data, user }) => {
  const router = useRouter();
  const { goToCommuGroupMessage, handleCommuGroupMessage } = UseChatManager();

  return (
    <VStack
      fontFamily={"Sarabun"}
      position={"fixed"}
      left={5}
      top={70}
      boxShadow={"base"}
      p={5}
      bg={"white"}
      rounded={10}
    >
      <HStack>
        <Avatar src={user.photoURL} name={user.displayName} />

        <Box>
          <Text>{user.displayName}</Text>
          <Flex>
            <Text mr={2}>Status:</Text>
            <Text>
              {data.isOwner ? "Owner" : data.isStaff ? "Staff" : "Player"}
            </Text>
          </Flex>
        </Box>
      </HStack>

      <Button maxW={330} w={"100%"} onClick={() => router.push(`/group/${id}`)}>
        Lobby
      </Button>
      <Button
        maxW={330}
        w={"100%"}
        onClick={() => router.push(`/group/${id}/dashboard`)}
      >
        Dashboard
      </Button>
      <Button maxW={330} w={"100%"}>
        Pin
      </Button>
      {console.log((true && true) || false)}
      {((data.isStaff && data.mainchatgroup) || !data.isStaff) && (
        <Button
          maxW={330}
          w={"100%"}
          onClick={() => goToCommuGroupMessage(data, id, user)}
        >
          Group chat
        </Button>
      )}
      {data.isStaff && !data.mainchatgroup && (
        <Button
          maxW={330}
          w={"100%"}
          onClick={() => handleCommuGroupMessage(user, id, data.name)}
        >
          Crate group chat
        </Button>
      )}
    </VStack>
  );
};
