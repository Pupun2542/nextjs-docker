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
    HStack,
    IconButton,

} from "@chakra-ui/react";
import { Check, X } from "phosphor-react";
import useRoleplayEditState from "../../src/hook/useRoleplayEditState";

export const Editroleplay = ({ value, onFinish, onRefresh }) => {
    const initalvalue = {
        short: value?.short ? value.short : 20,
        long: value?.long ? value.long : 20,
        fic: value?.fic ? value.fic : 20,
        wen: value?.wen ? value.wen : 20,
        draw: value?.draw ? value.draw : 20,
        fun: value?.fun ? value.fun : 20,
        drama: value?.drama ? value.drama : 20,
        roman: value?.roman ? value.roman : 20,
        ero: value?.ero ? value.ero : 20,
        friendship: value?.friendship ? value.friendship : 20,
        horror: value?.horror ? value.horror : 20,
        thriller: value?.thriller ? value.thriller : 20,
        action: value?.action ? value.action : 20,
        fanta: value?.fanta ? value.fanta : 20,
        retro: value?.retro ? value.retro : 20,
        sci: value?.sci ? value.sci : 20,
    }
    const { commit,
        short, setShort, 
        long, setLong, 
        fic, setFic, 
        wen, setWen, 
        draw, setDraw, 
        fun, setFun, 
        drama, setDrama, 
        roman, setRoman, 
        ero, setEro, 
        friendship, setFriendship, 
        horror, setHorror, 
        thriller, setThriller, 
        action, setAction, 
        fanta, setFanta, 
        retro, setRetro, 
        sci, setSci 
    } = useRoleplayEditState(initalvalue)

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>การโรลเพลย์</Text>
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

                                    <NumberInput min={0} max={100} onChange={(e)=>setShort(parseInt(e))} value={short}>
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
                                    <NumberInput min={0} max={100} onChange={(e)=>setLong(parseInt(e))} value={long} >
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
                                    <NumberInput min={0} max={100} onChange={(e)=>setFic(parseInt(e))} value={fic}>
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
                                    <NumberInput min={0} max={100} onChange={(e)=>setWen(parseInt(e))} value={wen}>
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
                                    <NumberInput min={0} max={100} onChange={(e)=>setDraw(parseInt(e))} value={draw}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setFun(parseInt(e))} value={fun}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setDrama(parseInt(e))} value={drama}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setRoman(parseInt(e))} value={roman}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setEro(parseInt(e))} value={ero}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setFriendship(parseInt(e))} value={friendship}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setHorror(parseInt(e))} value={horror}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setThriller(parseInt(e))} value={thriller}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setAction(parseInt(e))} value={action}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setFanta(parseInt(e))} value={fanta}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setRetro(parseInt(e))} value={retro}>
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
                                        <NumberInput min={0} max={100} onChange={(e)=>setSci(parseInt(e))} value={sci}>
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