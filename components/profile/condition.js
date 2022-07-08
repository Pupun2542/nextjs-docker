import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Spacer,
  VStack,
  Input,
  RadioGroup,
  Stack,
  Radio,
  SimpleGrid,
  Text,
  Center,
  Checkbox,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { Check, X } from "phosphor-react";

export const Condition = ({ value, onEdit, isOwner }) => {
  return (
    <Flex direction={"column"}>
      <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
        <Text>เงื่อนไข</Text>
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
        <Flex pl={3} pr={2} w={"100%"} display={value?.doit? "flex" : "none"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            สิ่งที่ทำได้
          </Box>
          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.doit
                ? value.doit
                : ""}
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"} display={value?.dontit? "flex" : "none"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            สิ่งที่ไม่ควรทำ
          </Box>
          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.dontit
                ? value.dontit
                : ""}
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"} display={value?.phobia? "flex" : "none"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            โฟเบีย
          </Box>
          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.phobia ? value.pobia : ""}
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            การทวงโรล
          </Box>
          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.demand == "1" && <Text>สะดวกใจ</Text>}
              {value?.demand == "2" && <Text>ไม่สะดวกใจ</Text>}
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            การอ้างอิงตัวละคร
          </Box>
          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.ref == "1" && <Text>สะดวกใจ</Text>}
              {value?.ref == "2" && <Text>ขออนุญาตก่อน</Text>}
              {value?.ref == "3" && <Text>ไม่สะดวกใจ</Text>}
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"} display={value?.condition?.length > 0? "flex" : "none"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            เงื่อนไขการมีปฏิสัมพันธ์
          </Box>

          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={"auto"}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={"100%"}>
              <Flex float={"left"} w={"100%"}>
                <List>
                  {value?.condition?.includes("1") && (
                    <ListItem>
                      <ListIcon as={Check} mb={1} />
                      ต้องการให้แจ้งก่อนโดยตรง
                    </ListItem>
                  )}
                  {value?.condition?.includes("2") && (
                    <ListItem>
                      <ListIcon as={Check} mb={1} />
                      ไม่ต้องการเปิดเผยความสัมพันธ์หน้าไมค์
                    </ListItem>
                  )}
                  {value?.condition?.includes("3") && (
                    <ListItem>
                      <ListIcon as={Check} mb={1} />
                      สามารถปล่อยตามสถานการณ์
                    </ListItem>
                  )}
                  {value?.condition?.includes("4") && (
                    <ListItem>
                      <ListIcon as={Check} mb={1} />
                      ไม่ใช้คำหยาบคาย
                    </ListItem>
                  )}
                  {value?.condition?.includes("5") && (
                    <ListItem>
                      <ListIcon as={Check} mb={1} />
                      ไม่รับเจ้าของตัวละครที่เป็นเพศชาย
                    </ListItem>
                  )}
                  {value?.condition?.includes("6") && (
                    <ListItem>
                      <ListIcon as={Check} mb={1} />
                      ไม่รับเจ้าของตัวละครที่เป็นเพศหญิง
                    </ListItem>
                  )}
                </List>
              </Flex>
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"} display={value?.othercondition? "flex" : "none"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            เงื่อนไขอื่น ๆ
          </Box>
          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.othercondition
                ? value.othercondition
                : ""}
            </Box>
          </Center>
        </Flex>
      </VStack>
    </Flex>
  );
};
