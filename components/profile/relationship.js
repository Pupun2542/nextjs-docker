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
} from "@chakra-ui/react";

export const Relationship = ({ value, config, onEdit, isOwner }) => {
  return (
    <Flex direction={"column"}>
      <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
        <Text>ความสัมพันธ์ตัวละคร</Text>
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
            สายที่เล่น
          </Box>

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
                        สายที่เล่น
                    </Box>

                    <Wrap>
                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        Heroto Love
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.heroto !== undefined && value.heroto !== null ? value.heroto : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        Boy Love
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.blove !== undefined && value.blove !== null ? value.blove : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        Girl Love
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.glove !== undefined && value.glove !== null ? value.glove : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        No Love
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.nlove !== undefined && value.nlove !== null ? value.nlove : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={250}
                                >
                                    <Center title="Friend with Benefit" ml={2} mr={2}>
                                        Friend with Benefit
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.fwb !== undefined && value.fwb !== null ? value.fwb : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        Friend Zone
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.fz !== undefined && value.fz !== null ? value.fz : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={250}
                                >
                                    <Center title="Friend with Benefit" ml={2} mr={2}>
                                        One Night Stand
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.onenight !== undefined && value.onenight !== null ? value.onenight : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>
                    </Wrap>
                </Flex>
              </Center>
            </WrapItem>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        สายที่ไม่เล่น
                    </Box>
                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            {value?.noplay && !config?.noplay ? value.noplay : ""}
                        </Box>
                    </Center>
                </Flex>
              </Center>
            </WrapItem>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        โพสิชั่น
                    </Box>

                    <Wrap>
                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Top
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.top !== undefined && value.top !== null ? value.top : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Bottom
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.bottom !== undefined && value.bottom !== null ? value.bottom : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Switch
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.switchs !== undefined && value.switchs !== null ? value.switchs : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Submissive
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.submissive !== undefined && value.submissive !== null ? value.submissive : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>

                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Dominant
                                    </Center>
                                    <Spacer />
                                    <Center ml={1} bg={'white'} pl={1} pr={1} borderRadius={10} borderWidth={1} borderColor={'black'}>
                                        <Box>{value && value.dominant !== undefined && value.dominant !== null ? value.dominant : 20}</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>
                    </Wrap>
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
                  w={250}
                >
                  <Center ml={2} mr={2}>
                    No Love
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
                    <Box>{value?.nlove ? value.nlove : 20}</Box>%
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
                  w={250}
                >
                  <Center title="Friend with Benefit" ml={2} mr={2}>
                    Friend with Benefit
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
                    <Box>{value?.fwb ? value.fwb : 20}</Box>%
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
                  w={250}
                >
                  <Center ml={2} mr={2}>
                    Friend Zone
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
                    <Box>{value?.fz ? value.fz : 20}</Box>%
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
                  w={250}
                >
                  <Center title="Friend with Benefit" ml={2} mr={2}>
                    One Night Stand
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
                    <Box>{value?.onenight ? value.onenight : 20}</Box>%
                  </Center>
                </Flex>
              </Center>
            </WrapItem>
          </Wrap>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"} display={value?.noplay ? "flex" : "none"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            สายที่ไม่เล่น
          </Box>
          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.noplay ? value.noplay : ""}
            </Box>
          </Center>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            โพสิชั่น
          </Box>

          <Wrap>
            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={185}
                >
                  <Center ml={2} mr={2}>
                    Top
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
                    <Box>{value?.top ? value.top : 20}</Box>%
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
                  w={185}
                >
                  <Center ml={2} mr={2}>
                    Bottom
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
                    <Box>{value?.bottom ? value.bottom : 20}</Box>%
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
                  w={185}
                >
                  <Center ml={2} mr={2}>
                    Switch
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
                    <Box>{value?.switchs ? value.switchs : 20}</Box>%
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
                  w={185}
                >
                  <Center ml={2} mr={2}>
                    Submissive
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
                    <Box>{value?.submissive ? value.submissive : 20}</Box>%
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
                  w={185}
                >
                  <Center ml={2} mr={2}>
                    Dominant
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
                    <Box>{value?.dominant ? value.dominant : 20}</Box>%
                  </Center>
                </Flex>
              </Center>
            </WrapItem>
          </Wrap>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"} display={value?.taste ? "flex" : "none"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            รสนิยม
          </Box>

          <Center w={"100%"} borderRadius={10} bg={"gray.300"} p={1} h={12}>
            <Box w={"100%"} borderRadius={10} bg={"white"} p={2} h={10}>
              {value?.taste ? value.taste : "หนูรักตัวเอง"}
            </Box>
          </Center>
        </Flex>
      </VStack>
    </Flex>
  );
};
