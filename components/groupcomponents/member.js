import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Flex,
    Text,
    HStack,
    IconButton,
    SimpleGrid,
    VStack,
} from "@chakra-ui/react"
import { Check, DotsThreeVertical, X } from "phosphor-react"

export const Member = () => {
    return (
        <Flex direction={'column'}>
            {/* Pending Zone */}
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex={1} textAlign={'left'} fontSize={20}>
                                คำขอเข้าร่วมคอมมูนิตี้
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>

                    <AccordionPanel>
                        <Flex
                            bg={'white'}
                            w={'100%'}
                            p={2}
                            borderRadius={10}
                            boxShadow={'base'}
                        >
                            <Avatar></Avatar>
                            <Text
                                w={'100%'}
                                pl={2}
                                pt={2.5}
                            >
                                Arther Wisley
                            </Text>
                            <HStack spacing={1}>
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
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <Box ml={'15px'} flex={1} textAlign={'left'} fontSize={20}>
                คำขอเข้าร่วมคอมมูนิตี้
            </Box>

            <SimpleGrid p={5} spacing={5} columns={2}>
                <Flex bg={'white'} p={'5px'} h={'80px'} borderRadius={10} boxShadow={'base'}>
                    <Avatar w={'70px'} h={'70px'}></Avatar>
                    <VStack ml={'5px'} mr={'5px'} w={'100%'}>
                        <Box
                            mt={'5px'}
                            fontSize={18}
                            textAlign={'left'}
                            width={'100%'}
                        >
                            Regulus
                        </Box>
                        <Box
                            color={'gray.400'}
                            fontSize={14}
                            textAlign={'left'}
                            width={'100%'}
                        >
                            อยากเป็นนายก ขอไปให้สุดหัวใจ
                        </Box>
                    </VStack>
                    <IconButton
                        size={'xs'}
                        rounded={'full'}
                        icon={<DotsThreeVertical />}
                    />
                </Flex>
                <Flex bg={'white'} p={'5px'} h={'80px'} borderRadius={10} boxShadow={'base'}>
                    <Avatar w={'70px'} h={'70px'}></Avatar>
                    <VStack ml={'5px'} mr={'5px'} w={'100%'}>
                        <Box
                            mt={'5px'}
                            fontSize={18}
                            textAlign={'left'}
                            width={'100%'}
                        >
                            Reynole
                        </Box>
                        <Box
                            color={'gray.400'}
                            fontSize={14}
                            textAlign={'left'}
                            width={'100%'}
                        >
                            ผู้ปกครองคนนี้ อยากสอนให้ลูกเป็นคนดี
                        </Box>
                    </VStack>
                    <IconButton
                        size={'xs'}
                        rounded={'full'}
                        icon={<DotsThreeVertical />}
                    />
                </Flex>
            </SimpleGrid>

        </Flex>
    )
}