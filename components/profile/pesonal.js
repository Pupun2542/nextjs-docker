import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Spacer,
  VStack,
  Stack,
  Radio,
  RadioGroup,
  Text,
  Center,
} from "@chakra-ui/react";

export const Personal = ({ onEdit, value, config, isOwner }) => {
  return (
    <Flex direction={"column"}>
      <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
        <Text>ข้อมูลส่วนตัว</Text>
        <Spacer />
        {isOwner && (
          <Text fontSize={14} mt={3} onClick={onEdit} cursor={"pointer"}>
            Edit
          </Text>
        )}
      </Flex>

      <VStack
        bg={"white"}
        width={"100%"}
        borderRadius={10}
        boxShadow={"base"}
        p={3}
        mt={2}
        mb={2}
      >
        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            ชื่อเรียก
          </Box>
          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.othername && !config?.othername
                ? value.othername
                : "ไม่มีชื่อเรียก"}
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            เพศ
          </Box>

          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              <RadioGroup w={"100%"} value={value?.gender} defaultValue="3">
                  {value?.gender == "1" && <Text>ชาย</Text>}
                  {value?.gender == "2" && <Text>หญิง</Text>}
                  {value?.gender == "3" && <Text>ไม่ระบุ</Text>}
                  {value?.gender == "4" && <Text>{value.othergender? value.othergender : "ไม่ระบุ"}</Text>}
              </RadioGroup>
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            อายุ
          </Box>

          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.age && !config?.age ? value.age : "ไม่ระบุอายุ"}
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            อาชีพ
          </Box>

          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.work && !config?.work ? value.work : "ไม่ระบุอาชีพ"}
            </Box>
          </Center>
        </Flex>
      </VStack>
    </Flex>
  );
};
