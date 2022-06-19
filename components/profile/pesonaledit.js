import React, { useEffect, useState } from "react";
import {
    Flex,
    Box,
    Spacer,
    VStack,
    Stack,
    IconButton,
    Radio,
    RadioGroup,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper,
    Input,
    Text,
    HStack
} from "@chakra-ui/react";
import { Eye, EyeClosed, Check, X } from "phosphor-react";
import usePersonalEditState from "../../src/hook/usePersonalEditState";

export const EditPersonal = ({onFinish, value, config, onRefresh}) => {
    const initalvalue = {
        othername: value?.othername?value.othername: "",
        gender: value?.gender?value.gender:1,
        othergender: value?.othergender?value.othergender:"",
        age: value?.age?value.age:0,
        work: value?.work?value.work:""
    };
    const initialconfig = {
        othername: config?.othername?config.othername:false,
        gender: config?.othername?config.gender:false,
        age: config?.othername?config.age:false,
        work: config?.othername?config.work:false,
    };
    const { getValue, getConfig, setValue, setConfig, commit } = usePersonalEditState(initalvalue, initialconfig);

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>ข้อมูลส่วนตัว</Text>
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
                        ชื่อเรียก
                    </Box>

                    <Input w={'100%'} placeholder='สมมติชื่อสมชาย' value={getValue("othername")} onChange={(e)=>setValue("othername", e.target.value)} ></Input>

                    <IconButton ml={1} icon={getConfig("othername") ? <EyeClosed /> : <Eye />} onClick={() => setConfig("othername", !getConfig("othername"))} />
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        เพศ
                    </Box>

                    <RadioGroup pt={2} w={'100%'} value={getValue("gender")} onChange={(e)=>setValue("gender", e)}>
                        <Stack direction='row'>
                            <Radio value='1' w={'25%'} colorScheme='purple'>ชาย</Radio>
                            <Radio value='2' w={'25%'} colorScheme='purple'>หญิง</Radio>
                            <Radio value='3' w={'25%'} colorScheme='purple'>ไม่ระบุ</Radio>
                            <Radio value='4' w={'25%'} colorScheme='purple'>อื่น ๆ </Radio>
                        </Stack>
                    </RadioGroup>

                    <Input w={'100%'} placeholder='สมมติชื่อสมชาย' value={getValue("othergender")} onChange={(e)=>setValue("othergender", e.target.value)} />

                    <IconButton ml={1} icon={getConfig("gender") ? <EyeClosed /> : <Eye />} onClick={() => setConfig("gender", !getConfig("gender"))} />
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        อายุ
                    </Box>

                    <NumberInput w={"100%"} value={getValue("age")} onChange={(e)=>setValue("age", parseInt(e))}>
                        <NumberInputField placeholder="2" min={0} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <IconButton ml={1} icon={getConfig("age") ? <EyeClosed /> : <Eye />} onClick={() => setConfig("age", !getConfig("age"))} />
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        อาชีพ
                    </Box>

                    <Input w={'100%'} placeholder='Last BOSS in Narnia' value={getValue("work")} onChange={(e)=>setValue("work", e.target.value)}></Input>

                    <IconButton ml={1} icon={getConfig("work") ? <EyeClosed /> : <Eye />} onClick={() => setConfig("work", !getConfig("work"))}/>
                </Flex>

            </VStack>
        </Flex>
    )
}