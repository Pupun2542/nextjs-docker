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
    Select,
    Text,
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react";

export const Active = () => {

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>ความแอคทีฟ</Text>
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
                        พื้นที่เล่น
                    </Box>

                    <Wrap>
                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={190}
                                >
                                    <Center ml={2} mr={2}>
                                        หลังไมค์ (แชท)
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
                                    w={190}
                                >
                                    <Center ml={2} mr={2}>
                                        หน้าไมค์ (โพสต์)
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
                        ระยะเวลาตอบ
                    </Box>

                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            ตอบกลับทันที
                        </Box>
                    </Center>
                </Flex>
            </VStack>
        </Flex>
    )
}