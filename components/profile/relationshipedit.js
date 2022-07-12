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
    HStack,
    IconButton,
} from "@chakra-ui/react";
import { Check, X } from "phosphor-react";
import useRelationshipEditState from "../../src/hook/useRelationshipEditState";

export const Editrelationship = ({ value, onFinish, onRefresh }) => {
    
    const initalvalue = {
        heroto: value && value.heroto !== undefined && value.heroto !== null ? value.heroto : 20,
        blove: value && value.blove !== undefined && value.blove !== null ? value.blove : 20,
        glove: value && value.glove !== undefined && value.glove !== null ? value.glove : 20,
        nlove: value && value.nlove !== undefined && value.nlove !== null ? value.nlove : 20,
        fwb: value && value.fwb !== undefined && value.fwb !== null ? value.fwb : 20,
        fz: value && value.fz !== undefined && value.fz !== null ? value.fz : 20,
        onenight: value && value.onenight !== undefined && value.onenight !== null ? value.onenight : 20,
        noplay: value?.noplay ? value.noplay : "", //string
        top: value && value.top !== undefined && value.top !== null ? value.top : 20,
        bottom: value && value.bottom !== undefined && value.bottom !== null ? value.bottom : 20,
        switchs: value && value.switchs !== undefined && value.switchs !== null ? value.switchs : 20,
        submissive: value && value.submissive !== undefined && value.submissive !== null ? value.submissive : 20,
        dominant: value && value.dominant !== undefined && value.dominant !== null ? value.dominant : 20,
        taste: value?.taste ? value.taste: "" //string
    }
    const { heroto, setHeroto,
        blove, setBlove,
        glove, setGlove,
        nlove, setNlove,
        fwb, setFwb,
        fz, setFz,
        onenight, setOnenight,
        top, setTop,
        bottom, setBottom,
        switchs, setSwitch,
        submissive, setSubmissive,
        dominant, setDominant,
        commit } = useRelationshipEditState(initalvalue)

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>ความสัมพันธ์ตัวละคร</Text>
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
                                    <NumberInput min={0} max={100} onChange={(e)=>setHeroto(parseInt(e))} value={heroto}>
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
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        Boy Love
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setBlove(parseInt(e))} value={blove}>
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
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        Girl Love
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setGlove(parseInt(e))} value={glove}>
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
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        No Love
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setNlove(parseInt(e))} value={nlove}>
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
                                    w={250}
                                >
                                    <Center title="Friend with Benefit" ml={2} mr={2}>
                                        Friend with Benefit
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setFwb(parseInt(e))} value={fwb}>
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
                                    w={250}
                                >
                                    <Center ml={2} mr={2}>
                                        Friend Zone
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setFz(parseInt(e))} value={fz}>
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
                                    w={250}
                                >
                                    <Center title="Friend with Benefit" ml={2} mr={2}>
                                        One Night Stand
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setOnenight(parseInt(e))} value={onenight}>
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
                    </Wrap>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        สายที่ไม่เล่น
                    </Box>

                    <Input placeholder="กรอกข้อมูลตรงนี้" />
                    {/* ไม่ได้ใส่ value ให้นะคะ */}
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
                                    <NumberInput min={0} max={100} onChange={(e)=>setTop(parseInt(e))} value={top}>
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
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Bottom
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setBottom(parseInt(e))} value={bottom}>
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
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Switch
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setSwitch(parseInt(e))} value={switchs}>
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
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Submissive
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setSubmissive(parseInt(e))} value={submissive}>
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
                                    w={185}
                                >
                                    <Center ml={2} mr={2}>
                                        Dominant
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100} onChange={(e)=>setDominant(parseInt(e))} value={dominant}>
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
                    </Wrap>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        รสนิยม
                    </Box>

                    <Input placeholder="กรอกข้อมูลตรงนี้"/>
                    {/* ไม่ได้เขียนให้นะคะ */}
                </Flex>
            </VStack>
        </Flex>
    )
}