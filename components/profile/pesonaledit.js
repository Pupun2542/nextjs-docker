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

export const EdiePersonal = () => {
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
                <HStack>
                    <IconButton
                        icon={<Check />}
                        onClick={() => {
                            handleNameChange();
                            setEditDisplayNameMode(false);
                        }}
                    />
                    <IconButton
                        icon={<X />}
                        onClick={() => {
                            setEditDisplayNameMode(false);
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
                        ชื่อเรียก
                    </Box>

                    <Input w={'100%'} placeholder='สมมติชื่อสมชาย'></Input>

                    <IconButton ml={1} icon={hiddenState.othname ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, othname: !hiddenState.othname })} />
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

                    <Input w={'100%'} />

                    <IconButton ml={1} icon={hiddenState.gender ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, gender: !hiddenState.gender })} />
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        อายุ
                    </Box>

                    <NumberInput w={"100%"}>
                        <NumberInputField placeholder="2" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <IconButton ml={1} icon={hiddenState.age ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, age: !hiddenState.age })} />
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        อาชีพ
                    </Box>

                    <Input w={'100%'} placeholder='Last BOSS in Narnia'></Input>

                    <IconButton ml={1} icon={hiddenState.work ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, work: !hiddenState.work })} />
                </Flex>

            </VStack>
        </Flex>
    )
}