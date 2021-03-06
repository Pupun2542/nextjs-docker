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
        short: value && value.short !== undefined && value.short !== null ? value.short : 20,
        long: value && value.long !== undefined && value.long !== null ? value.long : 20,
        fic: value && value.fic !== undefined && value.fic !== null ? value.fic : 20,
        wen: value && value.wen !== undefined && value.wen !== null ? value.wen : 20,
        draw: value && value.draw !== undefined && value.draw !== null ? value.draw : 20,
        fun: value && value.fun !== undefined && value.fun !== null ? value.fun : 20,
        drama: value && value.drama !== undefined && value.drama !== null ? value.drama : 20,
        roman: value && value.roman !== undefined && value.roman !== null ? value.roman : 20,
        ero: value && value.ero !== undefined && value.ero !== null ? value.ero : 20,
        friendship: value && value.friendship !== undefined && value.friendship !== null ? value.friendship : 20,
        horror: value && value.horror !== undefined && value.horror !== null ? value.horror : 20,
        thriller: value && value.thriller !== undefined && value.thriller !== null ? value.thriller : 20,
        action: value && value.action !== undefined && value.action !== null ? value.action : 20,
        fanta: value && value.fanta !== undefined && value.fanta !== null ? value.fanta : 20,
        retro: value && value.retro !== undefined && value.retro !== null ? value.retro : 20,
        sci: value && value.sci !== undefined && value.sci !== null ? value.sci : 20,
        other: value?.other ? value.other : "",
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
        sci, setSci,
        other, setOther
    } = useRoleplayEditState(initalvalue)

    return (
        <Flex direction={'column'}>
            <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
                <Text>?????????????????????????????????</Text>
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
                        ????????????????????????????????????
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
                                        ?????????????????????????????????????????????
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
                                        ??????????????????????????????????????????
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
                                        ??????????????????????????????
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
                                        ?????????????????????????????????????????????????????????
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
                                        ???????????????????????????
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
                        ???????????????????????????
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
                                        <Center ml={2} mr={2}>?????????</Center>
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
                                        <Center ml={2} mr={2}>??????????????????</Center>
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
                                        <Center ml={2} mr={2}>?????????????????????</Center>
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
                                        <Center ml={2} mr={2}>?????????????????????</Center>
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
                                        <Center ml={2} mr={2}>?????????????????????</Center>
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
                                        <Center ml={2} mr={2}>????????????????????????</Center>
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
                                        <Center ml={2} mr={2}>???????????????????????????</Center>
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
                                        <Center ml={2} mr={2}>?????????????????????</Center>
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
                                        <Center ml={2} mr={2}>?????????????????????</Center>
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
                                        <Center ml={2} mr={2}>?????????????????????</Center>
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
                                        <Center ml={2} mr={2}>????????????</Center>
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

                        <Input placeholder="??????????????? ?????????????????????????????????????????????????????? ????????????????????????????????? ',' " value={other} onChange={(e)=> setOther(e.target.value)} />
                    </VStack>

                </Flex>

            </VStack>
        </Flex>
    )
}