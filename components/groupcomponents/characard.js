import React, { useEffect, useState } from "react";
import { Flex, Box, Text, VStack, Avatar, Button } from "@chakra-ui/react";
import useCharaList from "../../src/hook/useCharaList";
import { useRouter } from "next/dist/client/router";
const Characard = ({ data, role, onExtend, onRemove, onEdit }) => {
  const router = useRouter()
  const { getDetailedChara } = useCharaList({}, router.query.id);
  const [detailed, setDetailed] = useState({});
  useEffect(()=> {
    if (data) {
      getDetailedChara(data.refererId).then((res)=> {
        setDetailed(res)
      })
    }
    return () => setDetailed({})
  },[data])
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
          <Text fontSize={"sm"} color={"gray.600"}>
            {data.parentName}
          </Text>
          <Text>{data.description}</Text>
        </Box>
      </Flex>
      <VStack alignContent={"space-evenly"} display="flex">
        <Button
          w="100%"
          as="a"
          target={detailed.docLink ? "_blank" : "_self"}
          href={detailed.docLink ? data.docLink : "#"}
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
