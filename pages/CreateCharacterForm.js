import React, { useState } from "react";
import CustomNavbar from "../components/navbar";
import {
    Box,
    Flex,
    Center,
    Container,
    Spacer,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    VStack,
    Input,
    Select,
    CloseButton,
    Switch,
    FormControl,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper,
    Textarea,
    Text,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Wrap,
    WrapItem,
    HStack,
    Button,
} from "@chakra-ui/react";
import Footer from "../components/footer";

import {
    Eye,
    EyeClosed
} from "phosphor-react";

export default function Home() {

    const [hiddenState, setHiddenState] = useState({
        name: false,
    })

    const breakpoints = {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    }
    
    return (

        <Box>


            <Flex justifyContent={"center"}
                bg="#F3F3F3"

            // maxH={'960'}


            >
                <CustomNavbar />

                <Center
                    pt={55}
                    fontFamily={'Sarabun'}
                    bg={'white'}
                    maxW={1000}
                    width={'100%'}
                    boxShadow={'base'}>
                    <Box
                        maxW={950}
                        width={'100%'}
                        boxShadow={'base'}
                    >
                        <Center
                            w={'100%'}
                            bg={'#6768AB'}
                            h={70}
                            fontFamily={'Mitr'}
                            fontSize='3xl'
                            color={'white'}
                            fontWeight={'extrabold'}
                        >
                            CREATE CHARACTER
                        </Center>
                        <Box p={5} pl={10} fontSize={'xl'} fontWeight={'bold'}>Picture Gallery</Box>
                        <Center>
                            <Flex
                                maxW={900}
                                w={'100%'}
                            >
                                <Spacer />
                                <Center
                                    maxW={900}
                                    w='100%'
                                    bg={'tomato'}
                                    h={'300'}
                                    m={1}
                                >
                                    Picture Zone
                                </Center>
                                <Spacer />
                            </Flex>
                        </Center>

                        <Center
                            fontSize={24}
                            bg={'#6768AB'}
                            p={2}
                            borderTopRadius={10}
                            color={"white"}
                            fontWeight='extrabold'
                        >
                            Information
                        </Center>

                        <Accordion allowMultiple bg={'#F3F3F3'}>
                            <AccordionItem w={'100%'}>
                                <h2>
                                    <AccordionButton>
                                        <AccordionIcon color={"Black"} w={50} h={50} />

                                        <Box
                                            theme={'theme'}
                                            color="Black"
                                            fontWeight={'bold'}
                                            fontSize={22}
                                        >
                                            Basic Information
                                        </Box>
                                    </AccordionButton>
                                </h2>

                                <AccordionPanel color={"black"}>
                                    <VStack>

                                        {/* ชื่อ */}

                                        <Flex
                                            maxW={800}
                                            minW={300}
                                            bg={'white'}
                                            w={'100%'}
                                            borderRadius={10}
                                            boxShadow={'base'}
                                            justifyContent={'center'}
                                        >
                                            <Box
                                                p={3}
                                                w={'20%'}
                                                borderRightColor={'GrayText'}
                                                borderRightWidth={2}
                                                minW={55}
                                            >
                                                ชื่อ
                                            </Box>
                                            <Center p={1} w={'75%'}><Input placeholder='ชื่อ-นามสกุล' disabled={hiddenState.name} /></Center>
                                            <IconButton m={1} aria-label='Search database' icon={hiddenState.name ? <EyeClosed /> : <Eye />} onClick={() => setHiddenState({ ...hiddenState, name: !hiddenState.name })} />
                                        </Flex>

                                        {/* ชื่ออื่น ๆ */}

                                        <Flex
                                            maxW={800}
                                            minW={300}
                                            bg={'white'}
                                            w={'100%'}
                                            borderRadius={10}
                                            boxShadow={'base'}
                                            justifyContent={'center'}
                                        >
                                            <Box
                                                p={3}
                                                w={'20%'}
                                                borderRightColor={'GrayText'}
                                                borderRightWidth={2}
                                                minW={55}
                                            >
                                                ชื่ออื่น ๆ
                                            </Box>
                                            <Center p={1} w={'75%'}><Input placeholder='ชื่อ-นามสกุลในภาษาอื่น' /></Center>
                                            <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                        </Flex>

                                        {/* ชื่อเล่น */}

                                        <Flex
                                            maxW={800}
                                            minW={300}
                                            bg={'white'}
                                            w={'100%'}
                                            m={2}
                                            borderRadius={10}
                                            boxShadow={'base'}
                                            justifyContent={'center'}
                                        >
                                            <Box
                                                p={3}
                                                w={'20%'}
                                                borderRightColor={'GrayText'}
                                                borderRightWidth={2}
                                                minW={55}
                                            >
                                                ชื่อเล่น
                                            </Box>
                                            <Center p={1} w={'75%'}><Input placeholder='ชื่อเล่น ฉายา' /></Center>
                                            <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                        </Flex>

                                        {/* ชื่อปลอม */}

                                        <Flex
                                            maxW={800}
                                            minW={300}
                                            bg={'white'}
                                            w={'100%'}
                                            m={2}
                                            borderRadius={10}
                                            boxShadow={'base'}
                                            justifyContent={'center'}
                                        >
                                            <Box
                                                p={3}
                                                w={'20%'}
                                                borderRightColor={'GrayText'}
                                                borderRightWidth={2}
                                                minW={55}
                                            >
                                                ชื่อปลอม
                                            </Box>
                                            <Center p={1} w={'75%'}><Input placeholder='ชื่อปลอม *หากมี*' /></Center>
                                            <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                        </Flex>

                                        {/* อายุ และ เพศ */}

                                        <Flex
                                            maxW={800}
                                            minW={300}
                                            w={'100%'}
                                            m={2}
                                            borderRadius={10}
                                            justifyContent={'center'}
                                            direction={{ base: 'column', md: "row" }}
                                        >
                                            <Flex
                                                boxShadow={'base'}
                                                w={{ base: '400', md: "800" }}
                                                borderRadius={10}
                                                bg={'white'}
                                                minW={55}
                                            >
                                                <Box
                                                    p={3}
                                                    w={'45%'}
                                                    borderRightColor={'GrayText'}
                                                    borderRightWidth={2}
                                                >
                                                    อายุ
                                                </Box>
                                                <Center p={1} w={'50%'}>
                                                    <NumberInput
                                                        defaultValue={1}
                                                    >
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Center>
                                                <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                            </Flex>


                                            <Spacer />

                                            <Flex
                                                bg={'white'}
                                                borderRadius={10}
                                                maxW={392}
                                                w={{ base: '400', md: "800" }}
                                                boxShadow={'base'}
                                            >
                                                <Box
                                                    p={3}
                                                    w={'45%'}
                                                    borderRightColor={'GrayText'}
                                                    borderRightWidth={2}
                                                    minW={55}
                                                >
                                                    เพศ
                                                </Box>
                                                <Center p={1} w={'50%'}><Input placeholder='เพศสภาพ' /></Center>
                                                <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                            </Flex>
                                        </Flex>

                                        {/* สถานที่เกิด */}

                                        <Flex
                                            maxW={800}
                                            minW={300}
                                            bg={'white'}
                                            w={'100%'}
                                            m={2}
                                            borderRadius={10}
                                            boxShadow={'base'}
                                            justifyContent={'center'}
                                        >
                                            <Box
                                                p={3}
                                                w={'20%'}
                                                borderRightColor={'GrayText'}
                                                borderRightWidth={2}
                                                minW={55}
                                            >
                                                สถานที่เกิด
                                            </Box>
                                            <Center p={1} w={'75%'}><Input placeholder='สถานที่' /></Center>
                                            <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                        </Flex>

                                        {/* วันเกิด */}

                                        <Flex
                                            maxW={800}
                                            minW={300}
                                            w={'100%'}
                                            m={2}
                                            borderRadius={10}
                                            justifyContent={'center'}
                                        // direction={{ base: "column-reverse", md: "row" }}
                                        >
                                            <Flex
                                                boxShadow={'base'}
                                                maxW={'264'}
                                                w={'100%'}
                                                borderRadius={10}
                                                bg={'white'}
                                                minW={55}
                                            >
                                                <Box
                                                    p={3}
                                                    w={'43%'}
                                                    borderRightColor={'GrayText'}
                                                    borderRightWidth={2}
                                                >
                                                    อายุ
                                                </Box>
                                                <Center p={1} w={'50%'}>
                                                    <NumberInput
                                                        defaultValue={1}
                                                        maxw={70}
                                                        w={'100%'}
                                                        min={1}
                                                        max={31}
                                                    >
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Center>
                                                <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                            </Flex>


                                            <Spacer />

                                            <Flex
                                                bg={'white'}
                                                borderRadius={10}
                                                maxW={264}
                                                w={'100%'}
                                                boxShadow={'base'}
                                            >
                                                <Box
                                                    p={3}
                                                    w={'43%'}
                                                    borderRightColor={'GrayText'}
                                                    borderRightWidth={2}
                                                    minW={55}
                                                >
                                                    เดือน
                                                </Box>
                                                <Select p={1} placeholder='Select option'>
                                                    <option value='option1'>Option 1</option>
                                                    <option value='option2'>Option 2</option>
                                                    <option value='option3'>Option 3</option>
                                                </Select>
                                                <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                            </Flex>

                                            <Spacer />

                                            <Flex
                                                bg={'white'}
                                                borderRadius={10}
                                                maxW={264}
                                                w={'100%'}
                                                boxShadow={'base'}
                                            >
                                                <Box
                                                    p={3}
                                                    w={'43%'}
                                                    borderRightColor={'GrayText'}
                                                    borderRightWidth={2}
                                                    minW={55}
                                                >
                                                    เพศ
                                                </Box>
                                                <Center p={1} w={'50%'}><Input placeholder='เพศสภาพ' /></Center>
                                                <IconButton m={1} aria-label='Search database' icon={<Eye />} />
                                            </Flex>
                                        </Flex>
                                        <Center bg={'lavender'}>f</Center>


                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        {/* Registration */}

                        <Accordion allowMultiple bg={'#F3F3F3'}>
                            <AccordionItem w={'100%'}>
                                <h2>
                                    <AccordionButton>
                                        <AccordionIcon color={"Black"} w={50} h={50} />

                                        <Box color="Black">
                                            Registration
                                        </Box>
                                    </AccordionButton>
                                </h2>

                                <AccordionPanel color={"black"}>
                                    <VStack>

                                        <Flex w={'100%'} m={2}>
                                            <Center w={50}></Center>
                                            <Box>ลงทะเบียนตัวละครและอื่น ๆ</Box>
                                            <Spacer />
                                            <IconButton
                                                colorScheme='blue'
                                                aria-label='Search database'
                                                // icon={<Plus />}
                                                rounded={'full'}
                                                bg={'#72994C'}
                                                size={'xs'}
                                            // onClick={addRegisLink}
                                            />
                                        </Flex>

                                        <Flex w={'100%'} m={2}>
                                            <Center w={50}></Center>
                                            <Box>ตรวจสอบสถานะ</Box>
                                            <Spacer />
                                            <IconButton
                                                colorScheme='blue'
                                                aria-label='Search database'
                                                // icon={<Plus />}
                                                rounded={'full'}
                                                bg={'#72994C'}
                                                size={'xs'}
                                            // onClick={addCheckLink}
                                            />
                                        </Flex>

                                        {/* {fieldvalue.statuschecklink?.map((item, index) => (
                                        <Checkform item={item} onDelete={() => deleteCheckLink(index)} onChange={(data) => setCheckLink(index, data)} />
                                    ))} */}

                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <HStack justifyContent={'center'} spacing={50} m={5}>
                            <Button
                                // onClick={onOpen}
                                color={"black"}
                                bg={"#FFC75A"}
                                fontFamily="Mitr"
                                fontWeight={100}
                                fontSize={20}
                                h={50}
                                w={180}
                                p={8}
                                borderWidth={3}
                                borderColor={'black'}
                            >
                                เพิ่มผู้ดูแล
                            </Button>

                            <Button
                                // onClick={onCropPicOpen}
                                color={"black"}
                                bg={"#FFC75A"}
                                fontFamily="Mitr"
                                fontWeight={100}
                                fontSize={20}
                                h={50}
                                w={180}
                                p={8}
                                borderWidth={3}
                                borderColor={'black'}
                            >
                                เพิ่มรูปแบนเนอร์
                            </Button>

                            <Button
                                // onClick={HandleSubmit}
                                color={"#FBBC43"}
                                bg={"#343434"}
                                fontFamily="Mitr"
                                fontWeight={100}
                                fontSize={20}
                                h={50}
                                w={180}
                                p={8}
                                borderWidth={3}
                                borderColor={'black'}
                            >
                                สร้างคอมมู
                            </Button>
                        </HStack>
                    </Box>
                </Center>

                {/* modal Administator */}

                <Modal
                    size={'xl'}
                    blockScrollOnMount={false}
                // isOpen={isOpen}
                // onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent fontFamily={'Mitr'}>
                        <ModalHeader>จัดการผู้ดูแล</ModalHeader>
                        <ModalCloseButton rounded={'full'} />
                        <ModalBody>

                            <Flex w={'100%'}>
                                <Center
                                    w={70}
                                    h={70}
                                    rounded={'full'}
                                    bg={'green.100'}
                                >
                                    L
                                </Center>
                                <Box mt={3} w={'83%'}>
                                    <Text fontSize={18} w={'100%'} maxW={350} ml='2'>
                                        Luke Earthrunner
                                    </Text>
                                    <Text ml='2'>
                                        Owner
                                    </Text>
                                </Box>
                                <Box float={'right'} w={'3%'}>
                                    {/* <Tooltip float={'right'} hasArrow label='UID:...' bg='gray.300' color='black'> */}
                                    {/* <Hash /> */}
                                    {/* </Tooltip> */}
                                </Box>

                            </Flex>

                            <Flex mt={5}>
                                <Input mr={1} />
                                <Button bg='#FFC75A'>เพิ่มผู้ดูแล</Button>
                            </Flex>

                            {/* <Divider mt={2} /> */}

                            <Box mt={2} fontSize={22} fontWeight={'bold'}>
                                รายชื่อผู้ดูแล
                            </Box>

                            {/* {staffSearch.map((value, index) => {
                            (<AddStaffForm item={value} onChange={(data) => setStaff(index, data)} onDelete={() => deleteStaff(index)} />)
                        })} */}

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} >
                                บันทึก
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* modal Croppic */}

                <Modal
                    blockScrollOnMount={false}
                // isOpen={isCropPicOpen}
                // onClose={onCropPicClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontWeight='bold' mb='1rem'>
                                You can scroll the content behind the moon
                            </Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme='blue'
                                mr={3}
                            // onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button variant='ghost'>Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Flex>

            <Footer></Footer>
        </Box>

    );
}
