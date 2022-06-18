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

export const Relationship = () => {

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>ความสัมพันธ์ตัวละคร</Text>
                <Spacer />
                <Text fontSize={14} mt={3}>Edit</Text>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>
                    </Wrap>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        สายที่ไม่เล่น
                    </Box>
                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            ไม่น่ามี
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
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
                                        <Box>20</Box>
                                        %
                                    </Center>
                                </Flex>
                            </Center>

                        </WrapItem>
                    </Wrap>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        รสนิยม
                    </Box>

                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            รักตัวเองครับ
                        </Box>
                    </Center>
                </Flex>
            </VStack>
        </Flex>
    )
}