import React from "react";
import { Flex, Box, Text, VStack, Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Characard = ({ data, role, onExtend, onRemove, onEdit }) => {
    const router = useRouter();
  return (
    <Flex
      justifyContent={"space-between"}
      onClick={onExtend}
      bg={"white"}
      p={3}
      mt={3}
      borderRadius={10}
      boxShadow={"base"}
    >
      <Flex>
        <Box>
          <Avatar src={data.photoURL} height={150} width={150} />
        </Box>
        <Box ml={5}>
          <Text fontSize={"2xl"}>{data.name}</Text>
          <Text fontSize={"sm"} color={"gray.600"}>{data.parentName}</Text>
          <Text>{data.description}</Text>
        </Box>
      </Flex>
      <VStack alignContent={"space-evenly"} display="flex">
        <Button
          w="100%"
          as="a"
          target={data.docLink?"_blank": "_self"}
          href={data.docLink? data.docLink: "#"}
        >
          Info
        </Button>
        <Button
          w="100%"
          onClick={onEdit}
          display={role == "charaowner" ? "initial" : "none"}
        >
          Edit
        </Button>
        <Button
          w="100%"
          onClick={onRemove}
          display={role == "charaowner" || role == "staff" ? "initial" : "none"}
        >
          Remove
        </Button>
      </VStack>
    </Flex>
  );
};

export default Characard;
