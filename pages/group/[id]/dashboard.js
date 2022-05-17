import React from 'react';
import CustomNavbar from "../../../components/navbar";

import {
  Box,
  Flex,
  Center,
  Spacer,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  HStack,
  Tag,
  IconButton,
  Button,
  Divider,
} from "@chakra-ui/react";

import {
  DotsThreeVertical,
  Info,
  Megaphone,
  Image,
  Heart,
  ChatCenteredText,
  Eye,
} from "phosphor-react";

function dashboard() {
  return (
    <Box
      overflowY={'auto'}
      // maxH={'960'}
      maxH={929}
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#727272',
          borderRadius: '24px',
        },
      }}
    >
      <CustomNavbar />

      <Flex pt={55} fontFamily={'mitr'}>
        <Spacer />

        <Box bg={'#F3F3F3'} minH={896} h={'auto'} minW={800} maxW={800} boxShadow='base'>
          <VStack spacing={0}>
            <Flex>
              <Center color={'white'} minWidth={778} pl={22} fontWeight={'700'} minH={75} fontSize={28} bg={'#6768AB'} >
                {/* [LTLEC]Land of the lustrous : Eternity cycle */}
                [123456] Name Community
              </Center>

              <Box bg={'#6768AB'} >
                <Popover bg={'#6768AB'} >
                  <PopoverTrigger>
                    <Info color='#FFC75A' size={22} weight="fill" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody maxH={500} overflowY={'auto'}
                      css={{
                        '&::-webkit-scrollbar': {
                          width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: '#727272',
                          borderRadius: '24px',
                        },
                      }}
                    >
                      Are you sure you want to have that milkshake?
                      What is Lorem Ipsum?
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                      Why do we use it?
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>

            </Flex>

            <Tabs w={'100%'} maxW={800} isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab _selected={{ color: 'white', bg: '#9A9AB0', margin: '2', borderRadius: '10' }}>Post</Tab>
                <Tab _selected={{ color: 'white', bg: '#9A9AB0', margin: '2', borderRadius: '10' }}>Gallery</Tab>
                <Tab _selected={{ color: 'white', bg: '#9A9AB0', margin: '2', borderRadius: '10' }}>Member</Tab>
                <Tab _selected={{ color: 'white', bg: '#9A9AB0', margin: '2', borderRadius: '10' }}>Setting</Tab>
              </TabList>

              <TabPanels>
                <TabPanel >
                  <Flex
                    w={'100%'}
                    bg={'white'}
                    boxShadow='base'
                    h={55}
                    borderRadius={10}
                  >
                    <Center borderRightRadius={10} bg={'#FBBC43'} w={65} transform={'auto'} scaleX={'-1'} color={'#FFFFFF'}>
                      <Megaphone size={42} />
                    </Center>

                    <Box w={'81%'} p={4}>คราวหน้าอย่า Flip อีกนะ</Box>

                    <Center w={'65'} color={'gray.500'}>เพิ่มเติม</Center>
                  </Flex>

                  <Flex mt={3} p={2} boxShadow={'base'} bg={'white'} borderRadius={10}>
                    <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>I</Center>
                    <Input placeholder='Basic usage' w={'93%'} />
                  </Flex>

                  <Flex mt={3} p={2} boxShadow={'base'} bg={'white'} borderRadius={10}>
                    <Box w={'6%'}>
                      <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>I</Center>
                    </Box>
                    <Box pl={2} pr={2} w={'90%'}>
                      <HStack spacing={4}>
                        <Box>Name Character</Box>

                        <Tag variant='solid' colorScheme='gray'>
                          Day 1
                        </Tag>

                        <Tag variant='solid' colorScheme='gray'>
                          Cut scene
                        </Tag>
                      </HStack>

                      <HStack spacing={4} fontSize={14} color={'GrayText'}>
                        <Box >Name profile</Box>
                        <Box>Timestamp</Box>
                      </HStack>

                      <Divider mb={2} />

                      <Box>"สวัสดีชาวโลก เรามาอย่างสันติ" เขาเอ่ยออกมาด้วยความสนุกสนาน โดยไม่อ่านบรรยากาศใด ๆ และแน่นอนว่าเขาเองก็มาพร้อมกับชายที่หน้าตาเหมือนกับเขาด้วยเช่นเดียวกัน</Box>

                      <Center mt={3} w={'100%'} borderRadius={10} boxShadow={'base'}>
                        <Image size={300} color="#100e0e" weight="light" />
                      </Center>

                      <HStack spacing={4} fontSize={14} color={'GrayText'} pt={2}>
                        <Button leftIcon={<Heart />} color='black' width={'40%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                          100
                        </Button>
                        <Button leftIcon={<ChatCenteredText />} color='black' width={'100%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                          100
                        </Button>
                        <Button leftIcon={<Eye />} color='black' width={'40%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                          100
                        </Button>
                      </HStack>

                      <Flex mt={3} p={2} boxShadow={'base'} w={'100%'}>

                        <Box w={'7%'}>
                          <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>
                            I
                          </Center>
                        </Box>


                        <Box pl={2} pr={2} w={'90%'}>
                          <HStack spacing={4}>
                            <Box ml={2}>Name Character</Box>
                            <Spacer />
                            <Box color={'gray.500'} fontSize={14}>Timestamp</Box>

                          </HStack>

                          <Divider />

                          <Box m={2}>"บอกแล้วว่าบ้านแตกแล้ว จบ ๆ งานเลี้ยงจบแล้ว" ชายหน้าเหมือนอีกคนเอ่ยตามออกมา พลางคว้าคอเสื้อของชายข้าง ๆ เขาให้ทำตัวสงบลง </Box>

                          <HStack spacing={4} fontSize={14} color={'GrayText'} pt={2}>
                            <Button leftIcon={<Heart />} color='black' width={'40%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                              100
                            </Button>
                            <Button leftIcon={<ChatCenteredText />} color='black' width={'100%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                              100
                            </Button>

                          </HStack>

                          <Flex mt={3} p={2} boxShadow={'base'} w={'100%'}>
                            <Box w={'8%'}>
                              <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>
                                I
                              </Center>
                            </Box>

                            <Box pl={2} pr={2} w={'84.5%'}>
                              <HStack spacing={4}>
                                <Box ml={2}>Name Character</Box>
                                <Spacer />
                                <Box color={'gray.500'} fontSize={14}>Timestamp</Box>

                              </HStack>

                              <Divider />

                              <Box m={2}>ว้าย ๆ ไอ้หมอนี่หน้าตาคุ้น ๆ แฮะ</Box>

                              <Center mt={3} w={'100%'} borderRadius={10} boxShadow={'base'}>
                                <Image size={300} color="#100e0e" weight="light" />
                              </Center>

                              <HStack spacing={4} fontSize={14} color={'GrayText'} pt={2}>
                                <Button leftIcon={<Heart />} color='black' width={'40%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                                  100
                                </Button>
                                <Button leftIcon={<ChatCenteredText />} color='black' width={'100%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                                  100
                                </Button>

                              </HStack>

                            </Box>

                            <IconButton rounded={'full'} icon={<DotsThreeVertical size={28} />} />

                          </Flex>


                          <Flex mt={2}>
                            <Box w={'8%'} mr={1}>
                              <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>
                                I
                              </Center>
                            </Box>
                            <Input placeholder='Basic usage' w={'100%'} />
                          </Flex>

                        </Box>



                        <IconButton rounded={'full'} icon={<DotsThreeVertical size={28} />} />

                      </Flex>

                      <Flex mt={3} p={2} boxShadow={'base'} w={'100%'}>

                        <Box w={'7%'}>
                          <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>
                            I
                          </Center>
                        </Box>


                        <Box pl={2} pr={2} w={'90%'}>
                          <HStack spacing={4}>
                            <Box ml={2}>Name Character</Box>
                            <Spacer />
                            <Box color={'gray.500'} fontSize={14}>Timestamp</Box>

                          </HStack>

                          <Divider />

                          <Box m={2}>"พอเถอะ อานนท์ เรามาจบงานเลี้ยงอย่างสันติเถิดหนา" </Box>

                          <Center mt={3} w={'100%'} borderRadius={10} boxShadow={'base'}>
                            <Image size={300} color="#100e0e" weight="light" />
                          </Center>

                          <HStack spacing={4} fontSize={14} color={'GrayText'} pt={2}>
                            <Button leftIcon={<Heart />} color='black' width={'40%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                              100
                            </Button>
                            <Button leftIcon={<ChatCenteredText />} color='black' width={'100%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                              100
                            </Button>

                          </HStack>

                          <Flex mt={3} p={2} boxShadow={'base'} w={'100%'}>
                            <Box w={'8%'}>
                              <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>
                                I
                              </Center>
                            </Box>

                            <Box pl={2} pr={2} w={'84.5%'}>
                              <HStack spacing={4}>
                                <Box ml={2}>Name Character</Box>
                                <Spacer />
                                <Box color={'gray.500'} fontSize={14}>Timestamp</Box>

                              </HStack>

                              <Divider />

                              <Box m={2}>"สวัสดีชาวโลก เรามาอย่างสันติ" เขาเอ่ยออกมาด้วยความสนุกสนาน โดยไม่อ่านบรรยากาศใด ๆ</Box>

                              <HStack spacing={4} fontSize={14} color={'GrayText'} pt={2}>
                                <Button leftIcon={<Heart />} color='black' width={'40%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                                  100
                                </Button>
                                <Button leftIcon={<ChatCenteredText />} color='black' width={'100%'} fontSize={16} fontWeight={'light'} boxShadow={'base'} variant='solid'>
                                  100
                                </Button>

                              </HStack>

                            </Box>

                            <IconButton rounded={'full'} icon={<DotsThreeVertical size={28} />} />

                          </Flex>


                          <Flex mt={2}>
                            <Box w={'8%'} mr={1}>
                              <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>
                                I
                              </Center>
                            </Box>
                            <Input placeholder='Basic usage' w={'100%'} />
                          </Flex>

                        </Box>



                        <IconButton rounded={'full'} icon={<DotsThreeVertical size={28} />} />

                      </Flex>

                      <Flex mt={2}>
                        <Box w={'8%'} mr={1}>
                          <Center mr={2} rounded={'100%'} h={42} w={42} bg={'gray.500'}>
                            I
                          </Center>
                        </Box>
                        <Input placeholder='Basic usage' w={'100%'} />
                      </Flex>

                    </Box>
                    <IconButton rounded={'full'} icon={<DotsThreeVertical size={28} />} />
                  </Flex>

                </TabPanel>

                <TabPanel>
                  <p>Gallery!</p>
                </TabPanel>

                <TabPanel>
                  <p>Member!</p>
                </TabPanel>

                <TabPanel>
                  <p>Setting!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>

        </Box>

        <Spacer />
      </Flex>

    </Box>
  )
}

export default dashboard