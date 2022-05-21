import React from "react";
import { Flex, Center, Box, IconButton, Text, Input, VStack } from "@chakra-ui/react";
import { ArrowRight, Minus } from "phosphor-react";

export const Regisform = ({item, onChange, onDelete}) => {
    const setState = (key, value) =>{
        onChange({
            ...item, [key]: value
        })
    }
  return (
    <>
      <Flex w={"100%"}>
        <Center w={50}>
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<Minus />}
            rounded={"full"}
            bg={"#EA4545"}
            size={"xs"}
            onClick={onDelete}
          />
        </Center>
        <Flex w={"100%"} bg={"white"} boxShadow={"base"} borderRadius={10}>
          <Box
            p={4}
            minW={180}
            borderRightColor={"#C4C4C4"}
            borderRightWidth={3}
          >
            <Box>
              <Text float="left">หัวข้อการรับสมัคร</Text>
            </Box>
          </Box>

          <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
            <Input
              type="text"
              w={"100%"}
              h={46}
              bg={"white"}
              placeholder={"ยกตัวอย่างเช่น วิ่งควายเพื่อ..."}
              value={item.name}
              onChange={(e)=>setState("name", e.target.value)}
            />
          </Center>
        </Flex>
        <Center w={50}></Center>
      </Flex>

      <Flex w={"100%"}>
        <VStack w={50} spacing={0}>
          <Box
            mt={2.5}
            h={5}
            w={3.5}
            borderLeftWidth={3}
            borderLeftColor="gray.400"
          ></Box>
          <Box
            borderBottomLeftRadius={10}
            borderLeftWidth={3}
            borderBottomWidth={3}
            borderColor="gray.400"
            h={2}
            w={3.5}
          ></Box>
        </VStack>
        <Flex w={"100%"} bg={"white"} boxShadow={"base"} borderRadius={10}>
          <Center></Center>

          <Box
            p={4}
            minW={180}
            borderRightColor={"#C4C4C4"}
            borderRightWidth={3}
          >
            <Box>
              <Text float="left">วันที่และเวลา</Text>
            </Box>
          </Box>

          <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
            <Input
              type="date"
              w={"100%"}
              h={46}
              bg={"white"}
              placeholder={"ยกตัวอย่างเช่น วิ่งควายเพื่อ..."}
              value={item.fromdate}
              onChange={(e)=>setState("fromdate", e.target.value)}
            />
          </Center>

          <Center>
            <ArrowRight size={26} color="#100e0e" weight="bold" />
          </Center>

          <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
            <Input
              type="date"
              w={"100%"}
              h={46}
              bg={"white"}
              placeholder={"ยกตัวอย่างเช่น วิ่งควายเพื่อ..."}
              value={item.todate}
              onChange={(e)=>setState("todate", e.target.value)}
            />
          </Center>
        </Flex>
        <Center w={50}></Center>
      </Flex>

      <Flex w={"100%"}>
        <VStack w={50} spacing={0}>
          <Box
            mt={2.5}
            h={5}
            w={3.5}
            borderLeftWidth={3}
            borderLeftColor="gray.400"
          ></Box>
          <Box
            borderBottomLeftRadius={10}
            borderLeftWidth={3}
            borderBottomWidth={3}
            borderColor="gray.400"
            h={2}
            w={3.5}
          ></Box>
        </VStack>
        <Flex w={"100%"} bg={"white"} boxShadow={"base"} borderRadius={10}>
          <Center></Center>

          <Box
            p={4}
            minW={180}
            borderRightColor={"#C4C4C4"}
            borderRightWidth={3}
          >
            <Box>
              <Text float="left">ลิงก์</Text>
            </Box>
          </Box>

          <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
            <Input
              type="text"
              w={"100%"}
              h={46}
              bg={"white"}
              placeholder={"www.etc.com"}
              value={item.link}
              onChange={(e)=>setState("link", e.target.value)}
            />
          </Center>
        </Flex>
        <Center w={50}></Center>
      </Flex>
    </>
  );
};
