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
} from "@chakra-ui/react";
import useConditionEditState from "../../src/hook/useConditionEditState";

export const Editcondition = ({ value, onFinish, onRefresh, config }) => {
    const initalvalue = {
        doit: value?.doit?value.doit: "",
        dontit: value?.dontit?value.dontit: "",
        pobia: value?.pobia?value.pobia: "",
        demand: value?.demand?value.demand: 1,
        ref: value?.ref?value.ref: 1,
        condition: value?.condition?value.condition: 1,
        othercondition: value?.othercondition?value.othercondition: "",
    }
    const { doit, getDoit, dontit, getDontit, pobia, getPobia, demand, getDemand, ref, getRef, condition, getCondition, othercondition, getOthercondition, commit } = useConditionEditState(initalvalue);
    // const initialconfig = {
    //     doit: config?.doit?config.doit:false,
    //     dontit: config?.dontit?config.dontit:false,
    //     pobia: config?.pobia?config.pobia:false,
    //     othercondition: config?.othercondition ? config.othercondition:false,
    // }

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>เงื่อนไข</Text>
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
                        สิ่งที่ทำได้
                    </Box>

                    <Input placeholder="กรอกข้อมูลตรงนี้" value={getValue("doit")} onChange={(e)=>setValue("doit", e.target.value)}/>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        สิ่งที่ไม่ควรทำ
                    </Box>

                    <Input placeholder="กรอกข้อมูลตรงนี้" value={getValue("dontit")} onChange={(e)=>setValue("dontit", e.target.value)}/>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        โฟเบีย
                    </Box>

                    <Input placeholder="กรอกข้อมูลตรงนี้" value={getValue("pobia")} onChange={(e)=>setValue("pobia", e.target.value)}/>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        การทวงโรล
                    </Box>

                    <RadioGroup pt={2} w={'100%'} value={getValue("demand")} onChange={(e)=>setValue("demand", e)}>
                        <Stack direction='row'>
                            <Radio value='1' colorScheme='purple'>สะดวกใจ</Radio>
                            <Radio value='2' colorScheme='purple'>ไม่สะดวกใจ</Radio>
                        </Stack>
                    </RadioGroup>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        การอ้างอิงตัวละคร
                    </Box>

                    <RadioGroup pt={2} w={'100%'} value={getValue("demand")} onChange={(e)=>setValue("demand", e)}>
                        <Stack direction='row'>
                            <Radio value='1' colorScheme='purple'>สะดวกใจ</Radio>
                            <Radio value='2' colorScheme='purple'>ขออนุญาตก่อน</Radio>
                            <Radio value='3' colorScheme='purple'>ไม่สะดวกใจ</Radio>
                        </Stack>
                    </RadioGroup>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"} value={getValue("demand")} onChange={(e)=>setValue("demand", e.target.value)}>
                        เงื่อนไขการมีปฏิสัมพันธ์
                    </Box>

                    <Flex float={'left'} pt={2} w={'100%'}>
                        <SimpleGrid columns={2}>
                            <Checkbox value='1' colorScheme='purple'>ต้องการให้แจ้งก่อนโดยตรง</Checkbox>
                            <Checkbox value='2' colorScheme='purple'>ไม่ต้องการเปิดเผยความสัมพันธ์หน้าไมค์</Checkbox>
                            <Checkbox value='3' colorScheme='purple'>สามารถปล่อยตามสถานการณ์</Checkbox>
                            <Checkbox value='4' colorScheme='purple'>ไม่ใช้คำหยาบคาย</Checkbox>
                            <Checkbox value='5' colorScheme='purple'>ไม่รับเจ้าของตัวละครที่เป็นเพศชาย</Checkbox>
                            <Checkbox value='6' colorScheme='purple'>ไม่รับเจ้าของตัวละครที่เป็นเพศหญิง</Checkbox>
                        </SimpleGrid>
                    </Flex>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        เงื่อนไขอื่น ๆ
                    </Box>

                    <Input placeholder="กรอกข้อมูลตรงนี้" value={getValue("othercondition")} onChange={(e)=>setValue("othercondition", e.target.value)}/>
                </Flex>
            </VStack>
        </Flex>
    )
}