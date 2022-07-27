import { Box, Flex, Input, Avatar, Text, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useUserSearch from "../../src/hook/useUserSearch";

const UserSearchInput = ({ onSelect }) => {
  const { searchStr, setSearchStr, result } = useUserSearch();

  return (
    <Flex width={'100%'} pos="relative" mb={1.5}>
      <Center width={'100%'}>
        <Input
          bg={'#FFFFFF'}
          mr={1}
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          height={46}
        />
      </Center>

      <Flex display={result.length > 0 ? "initial" : "none"} pos="absolute" mt={45} p={1} zIndex={10000} bg="white">
        {result.map((user, index) => (
          <Flex
            justifyContent={"space-between"}
            p={1}
            borderRadius={10}
            onClick={() => {
              onSelect(user);
              setSearchStr("");
            }}
            _hover={{
              backgroundColor: "gray.200",
            }}
            key={index}
            cursor={"pointer"}
          >
            <Avatar name={user.displayName} src={user.photoURL} mr={3} />
            <Box flexGrow={9}>
              <Text>{user.displayName}</Text>
              <Text>{user.uid}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default UserSearchInput;
