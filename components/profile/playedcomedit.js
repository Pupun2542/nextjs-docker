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
import usePlaycomEditState from "../../src/hook/usePlaycomEditState";

export const Editplayedcom = ({ value, config }) => {
    const initalvalue = {
        survival: value?.survival ? value.survival : 20,
        slow: value?.slow ? value.slow : 20,
        slowsur: value?.slowsur ? value.slowsur : 20,
        vote: value?.vote ? value.vote : 20,
        inter: value?.inter ? value.inter : ""
    }
    const { survival, setSurvival, slow, setSlow, slowsur, setSlowsur, vote, setVote, commit } = usePlaycomEditState(initalvalue)
    // const initialconfig = {
    //     inter: config?.inter ? config.inter: false
    // }

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>การเล่นคอมมูนิตี้</Text>
                <Spacer />
                <HStack>
                    <IconButton
                        icon={<Check />}
                        onClick={async() => {
                            await commit();
                            onRefresh();
                            onFinish();
                        }}
                    />
                    <IconButton
                        icon={<X />}
                        onClick={() => {
                            onFinish();
                            // setEditDisplayName("");
                        }}
                    />
                </HStack>
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

                    <SimpleGrid columns={4} spacing={4}>
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
                                        Survival
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setSurvival(parseInt(e))} value={survival}>
                                        <NumberInputField fontSize={14}
                                            bg={"white"}
                                            borderRadius={10}
                                            pl={1}
                                            pr={1}
                                            pt={0.5}
                                            pb={0.5}
                                            borderWidth={1}
                                            borderColor={'#6768AB'}
                                            w={39}
                                            h={25} />
                                    </NumberInput>
                                    <Center ml={1}>
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
                                        Slowlife
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setSlow(parseInt(e))} value={slow}>
                                        <NumberInputField fontSize={14}
                                            bg={"white"}
                                            borderRadius={10}
                                            pl={1}
                                            pr={1}
                                            pt={0.5}
                                            pb={0.5}
                                            borderWidth={1}
                                            borderColor={'#6768AB'}
                                            w={39}
                                            h={25} />
                                    </NumberInput>
                                    <Center ml={1}>
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
                                        Slow-Survival
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setSlowsur(parseInt(e))} value={slowsur}>
                                        <NumberInputField fontSize={14}
                                            bg={"white"}
                                            borderRadius={10}
                                            pl={1}
                                            pr={1}
                                            pt={0.5}
                                            pb={0.5}
                                            borderWidth={1}
                                            borderColor={'#6768AB'}
                                            w={39}
                                            h={25} />
                                    </NumberInput>
                                    <Center ml={1}>
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
                                        Vote for Kill
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setVote(parseInt(e))} value={vote}>
                                        <NumberInputField fontSize={14}
                                            bg={"white"}
                                            borderRadius={10}
                                            pl={1}
                                            pr={1}
                                            pt={0.5}
                                            pb={0.5}
                                            borderWidth={1}
                                            borderColor={'#6768AB'}
                                            w={39}
                                            h={25} />
                                    </NumberInput>
                                    <Center ml={1}>
                                        %
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

                    <Input placeholder="กรอกข้อมูลตรงนี้"/>
                    {/* ไม่ได้เขียนให้น้าาาาาา */}
                </Flex>
            </VStack>
        </Flex>
    )
}