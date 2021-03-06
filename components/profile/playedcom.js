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

export const Playedcom = ({ value, config, onEdit, isOwner }) => {

  const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }

  return (
    <Flex direction={"column"}>
      <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
        <Text>การเล่นคอมมูนิตี้</Text>
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
            ประเภทที่สนใจ
          </Box>

          <SimpleGrid columns={{ '2xl': '4', xl: '4', lg: '3', md: '3', sm: '2' }} spacing={4}>
            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={190}
                >
                  <Center ml={2} mr={2}>
                    Survival
                  </Center>
                  <Spacer />
                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    w={50}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value && value.survival !== undefined && value.survival !== null ? value.survival : 20}</Box>%
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
                  w={190}
                >
                  <Center ml={2} mr={2}>
                    Slowlife
                  </Center>
                  <Spacer />
                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    w={50}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value && value.slow !== undefined && value.slow !== null ? value.slow : 20}</Box>%
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
                  w={190}
                >
                  <Center ml={2} mr={2}>
                    Slow-Survival
                  </Center>
                  <Spacer />
                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    w={50}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value && value.slowsur !== undefined && value.slowsur !== null ? value.slowsur : 20}</Box>%
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
                  w={190}
                >
                  <Center ml={2} mr={2}>
                    Vote for Kill
                  </Center>
                  <Spacer />
                  <Center
                    ml={1}
                    bg={"white"}
                    pl={1}
                    pr={1}
                    w={50}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor={"black"}
                  >
                    <Box>{value && value.vote !== undefined && value.vote !== null ? value.vote : 20}</Box>%
                  </Center>
                </Flex>
              </Center>
            </WrapItem>
          </SimpleGrid>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            หมวดหมู่ที่สนใจ
          </Box>

          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.inter ? value.inter : "ไม่มี"}
            </Box>
          </Center>
        </Flex>
      </VStack>
    </Flex>
  );
};
