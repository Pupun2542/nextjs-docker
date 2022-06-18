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
import { Eye, EyeClosed } from "phosphor-react";

export const Editroleplay = () => {

    return (
        <Flex direction={'column'}>

            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>การโรลเพลย์</Text>
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
                        สไตล์การเล่น
                    </Box>

                    <SimpleGrid columns={4} spacing={2}>
                        <WrapItem>
                            <Center>
                                <Flex
                                    bg={'#E7E7E7'}
                                    borderRadius={10}
                                    p={1.5}
                                    boxShadow={"base"}
                                    w={195}
                                >
                                    <Center ml={2} mr={2}>
                                        สายโรลเพลย์สั้น
                                    </Center>
                                    <Spacer />

                                    <NumberInput min={0} max={100}>
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
                                    w={195}
                                >
                                    <Center ml={2} mr={2}>
                                        สายโรลเพลย์ยาว
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100}>
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
                                    w={195}
                                >
                                    <Center ml={2} mr={2}>
                                        สายฟิคชั่น
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100}>
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
                                    w={195}
                                >
                                    <Center ml={2} mr={2}>
                                        สายเวิ่นเนื้อเรื่อง
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100}>
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
                                    w={195}
                                >
                                    <Center ml={2} mr={2}>
                                        สายวาดภาพ
                                    </Center>
                                    <Spacer />
                                    <NumberInput min={0} max={100}>
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
                        แนวที่ชอบ
                    </Box>

                    <VStack>
                        <SimpleGrid columns={5} spacing={2}>
                            <WrapItem>
                                <Center>
                                    <Flex
                                        bg={'#E7E7E7'}
                                        borderRadius={10}
                                        p={1.5}
                                        boxShadow={"base"}
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>ตลก</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>ดราม่า</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>โรแมนซ์</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>อีโรติก</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={150}
                                    >
                                        <Center ml={2} mr={2}>มิตรภาพ</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>สยองขวัญ</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>ระทึกขวัญ</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>แอคชั่น</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>แฟนตาซี</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>ย้อนยุค</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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
                                        w={155}
                                    >
                                        <Center ml={2} mr={2}>ไซไฟ</Center>
                                        <Spacer />
                                        <NumberInput min={0} max={100}>
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

                        <Input placeholder="กรอกข้อมูลตรงนี้" />
                    </VStack>

                </Flex>

            </VStack>
        </Flex>
    )
}