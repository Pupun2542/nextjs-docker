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
} from "@chakra-ui/react";

export const Playedcom = () => {

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>การเล่นคอมมูนิตี้</Text>
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
                        ประเภทที่สนใจ
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
                                        Survival
                                    </Center>
                                    <Spacer />
                                    <Input
                                        fontSize={14}
                                        bg={"white"}
                                        borderRadius={10}
                                        pl={1}
                                        pr={1}
                                        pt={0.5}
                                        pb={0.5}
                                        defaultValue="100%"
                                        borderWidth={1}
                                        borderColor={'#6768AB'}
                                        w={48.5}
                                        h={25}
                                    />
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
                                        Slowlife
                                    </Center>
                                    <Spacer />
                                    <Input
                                        fontSize={14}
                                        bg={"white"}
                                        borderRadius={10}
                                        pl={1}
                                        pr={1}
                                        pt={0.5}
                                        pb={0.5}
                                        defaultValue="100%"
                                        borderWidth={1}
                                        borderColor={'#6768AB'}
                                        w={48.5}
                                        h={25}
                                    />
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
                                        Slow-Survival
                                    </Center>
                                    <Spacer />
                                    <Input
                                        fontSize={14}
                                        bg={"white"}
                                        borderRadius={10}
                                        pl={1}
                                        pr={1}
                                        pt={0.5}
                                        pb={0.5}
                                        defaultValue="100%"
                                        borderWidth={1}
                                        borderColor={'#6768AB'}
                                        w={48.5}
                                        h={25}
                                    />
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
                                        Vote for Kill
                                    </Center>
                                    <Spacer />
                                    <Input
                                        fontSize={14}
                                        bg={"white"}
                                        borderRadius={10}
                                        pl={1}
                                        pr={1}
                                        pt={0.5}
                                        pb={0.5}
                                        defaultValue="100%"
                                        borderWidth={1}
                                        borderColor={'#6768AB'}
                                        w={48.5}
                                        h={25}
                                    />
                                </Flex>
                            </Center>

                        </WrapItem>


                    </Wrap>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        สายที่ไม่เล่น
                    </Box>

                    <Input placeholder="กรอกข้อมูลตรงนี้" />
                </Flex>
            </VStack>
        </Flex>
    )
}