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

export const Condition = () => {

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>เงื่อนไข</Text>
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
                        สิ่งที่ทำได้
                    </Box>
                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            ทุกอย่างเลยค้าบ
                        </Box>
                    </Center>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        สิ่งที่ไม่ควรทำ
                    </Box>
                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            อย่าทิ้งกันเลยนะ
                        </Box>
                    </Center>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        โฟเบีย
                    </Box>
                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            เรื่องเศร้า
                        </Box>
                    </Center>
                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        การทวงโรล
                    </Box>
                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            <RadioGroup w={'100%'}>
                                <Stack direction='row'>
                                    <Radio value='1' colorScheme='purple'>สะดวกใจ</Radio>
                                    <Radio value='2' colorScheme='purple'>ไม่สะดวกใจ</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                    </Center>

                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        การอ้างอิงตัวละคร
                    </Box>
                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            <RadioGroup w={'100%'}>
                                <Stack direction='row'>
                                    <Radio value='1' colorScheme='purple'>สะดวกใจ</Radio>
                                    <Radio value='2' colorScheme='purple'>ขออนุญาตก่อน</Radio>
                                    <Radio value='3' colorScheme='purple'>ไม่สะดวกใจ</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                    </Center>

                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        เงื่อนไขการมีปฏิสัมพันธ์
                    </Box>

                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={'auto'}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={'auto'}>
                            <Flex float={'left'} w={'100%'}>
                                <SimpleGrid columns={2}>
                                    <Checkbox value='1' colorScheme='purple'>ต้องการให้แจ้งก่อนโดยตรง</Checkbox>
                                    <Checkbox value='2' colorScheme='purple'>ไม่ต้องการเปิดเผยความสัมพันธ์หน้าไมค์</Checkbox>
                                    <Checkbox value='3' colorScheme='purple'>สามารถปล่อยตามสถานการณ์</Checkbox>
                                    <Checkbox value='4' colorScheme='purple'>ไม่ใช้คำหยาบคาย</Checkbox>
                                    <Checkbox value='5' colorScheme='purple'>ไม่รับเจ้าของตัวละครที่เป็นเพศชาย</Checkbox>
                                    <Checkbox value='6' colorScheme='purple'>ไม่รับเจ้าของตัวละครที่เป็นเพศหญิง</Checkbox>
                                </SimpleGrid>
                            </Flex>
                        </Box>
                    </Center>

                </Flex>

                <Flex pl={3} pr={2} w={"100%"}>
                    <Box pt={2} h={10} maxWidth={135} w={"100%"}>
                        เงื่อนไขอื่น ๆ
                    </Box>
                    <Center w={'100%'} borderRadius={10} bg={'gray.300'} p={1} h={12}>
                        <Box w={'100%'} borderRadius={10} bg={'white'} p={2} h={10}>
                            Blah Bla bla
                        </Box>
                    </Center>
                </Flex>
            </VStack>
        </Flex>
    )
}