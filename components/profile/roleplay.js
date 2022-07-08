import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Spacer,
  VStack,
  Input,
  Wrap,
  WrapItem,
  Center,
  Text,
  NumberInput,
  NumberInputField,
  SimpleGrid,
} from "@chakra-ui/react";
import { Eye, EyeClosed } from "phosphor-react";

export const Roleplay = ({ value, onEdit, isOwner }) => {
  return (
    <Flex direction={"column"}>
      <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
        <Text>การโรลเพลย์</Text>
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
            สไตล์การเล่น
          </Box>

          <SimpleGrid columns={4} spacing={2}>
            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={195}
                >
                  <Center ml={2} mr={2}>
                    สายโรลเพลย์สั้น
                  </Center>
                  <Spacer />

                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value?.short ? value.short : 20}</Box>%
                  </Center>
                </Flex>
              </Center>
            </WrapItem>

            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={195}
                >
                  <Center ml={2} mr={2}>
                    สายโรลเพลย์ยาว
                  </Center>
                  <Spacer />
                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value?.long ? value.long : 20}</Box>%
                  </Center>
                </Flex>
              </Center>
            </WrapItem>

            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={195}
                >
                  <Center ml={2} mr={2}>
                    สายฟิคชั่น
                  </Center>
                  <Spacer />
                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value?.fic ? value.fic : 20}</Box>%
                  </Center>
                </Flex>
              </Center>
            </WrapItem>

            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={195}
                >
                  <Center ml={2} mr={2}>
                    สายเวิ่นเนื้อเรื่อง
                  </Center>
                  <Spacer />
                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value?.wen ? value.wen : 20}</Box>%
                  </Center>
                </Flex>
              </Center>
            </WrapItem>

            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={195}
                >
                  <Center ml={2} mr={2}>
                    สายวาดภาพ
                  </Center>
                  <Spacer />
                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value?.draw ? value.draw : 20}</Box>%
                  </Center>
                </Flex>
              </Center>
            </WrapItem>
          </SimpleGrid>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            แนวที่ชอบ
          </Box>

          <VStack>
            <SimpleGrid columns={5} spacing={2}>
              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      ตลก
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.fun ? value.fun : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      ดราม่า
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.drama ? value.drama : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      โรแมนซ์
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.roman ? value.roman : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      อีโรติก
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.ero ? value.ero : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={150}
                  >
                    <Center ml={2} mr={2}>
                      มิตรภาพ
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.friendship ? value.friendship : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      สยองขวัญ
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.horror ? value.horror : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      ระทึกขวัญ
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.thriller ? value.thriller : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      แอคชั่น
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.action ? value.action : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      แฟนตาซี
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.fanta ? value.fanta : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      ย้อนยุค
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.retro ? value.retro : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Flex
                    bg={"#E7E7E7"}
                    borderRadius={10}
                    p={1.5}
                    boxShadow={"base"}
                    w={155}
                  >
                    <Center ml={2} mr={2}>
                      ไซไฟ
                    </Center>
                    <Spacer />
                    <Center
                      ml={1}
                      bg={"white"}
                      pl={1}
                      pr={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={"black"}
                    >
                      <Box>{value?.sci ? value.sci : 20}</Box>%
                    </Center>
                  </Flex>
                </Center>
              </WrapItem>
            </SimpleGrid>

            <Flex w={"100%"}>
              <Wrap>
                {value?.other &&
                  value.other.split(",").map((segment) => (
                    <Box
                      p={1}
                      borderRadius={10}
                      boxShadow={"base"}
                      w={"auto"}
                      bg={"#E7E7E7"}
                    >
                      {segment.trim()}
                    </Box>
                  ))}
              </Wrap>
            </Flex>
          </VStack>
        </Flex>
      </VStack>
    </Flex>
  );
};
