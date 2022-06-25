import { Box, Flex, Input, Avatar, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useUserSearch from "../../src/hook/useUserSearch";

const UserSearchInput = ({ onSelect }) => {
  const { searchStr, setSearchStr, result } = useUserSearch();

  return (
    <Flex mt={5} pos="relative">
      <Input
        mr={1}
        value={searchStr}
        onChange={(e) => setSearchStr(e.target.value)}
      />
      <Flex display={result.length > 0 ? "initial" : "none"} pos="absolute" mt={10} zIndex={10000} bg="white">
        {result.map((user, index) => ( 
          <Flex
            justifyContent={"space-between"}
            mt={5}
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
