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
    Text
} from "@chakra-ui/react";
import { Eye, EyeClosed } from "phosphor-react";

export const Personal = () => {
    const [gender, setGender] = useState('1')
    const [hiddenState, setHiddenState] = useState({
        othname: false,
        gender: false,
        age: false,
        work: false,
    })

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>ข้อมูลส่วนตัว</Text>
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
                        ชื่อเรียก
                    </Box>

                    <Box pt={2} h={10}>เซนครับ</Box>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        เพศ
                    </Box>

                    <RadioGroup pt={2} w={'100%'} onChange={setGender} value={gender}>
                        <Stack direction='row'>
                            <Radio value='1' w={'25%'} colorScheme='purple'>ชาย</Radio>
                            <Radio value='2' w={'25%'} colorScheme='purple'>หญิง</Radio>
                            <Radio value='3' w={'25%'} colorScheme='purple'>ไม่ระบุ</Radio>
                            <Radio value='4' w={'25%'} colorScheme='purple'>อื่น ๆ </Radio>
                        </Stack>
                    </RadioGroup>


                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        อายุ
                    </Box>

                    <Box pt={2} h={10}>24</Box>

                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        อาชีพ
                    </Box>

                    <Box pt={2} h={10}>Influ</Box>
                </Flex>

            </VStack>
        </Flex>
    )
}