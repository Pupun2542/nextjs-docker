import Image from "next/image";

import styles from "../styles/Home.module.css";
import "../src/config/firebase.config";
import CustomNavbar from "../components/navbar";
import Head from "next/head";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  Spacer,
  Heading,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  HStack,
  Show,
  Hide,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  Checkbox,
  Link,
} from "@chakra-ui/react"
import Footer from "../components/footer";
import {
  UsersThree,
  Chats,
  Bell,
  MagnifyingGlass,
  UserList,
  UserCirclePlus,
  PushPin,
  Sword,
  Megaphone,
  FacebookLogo,
  DiscordLogo
} from "phosphor-react";
import { useRouter } from 'next/router'
import React from "react";
import { SignIn } from "../components/signin";
import { useApp } from "../src/hook/local";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const router = useRouter();
  const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { auth } = useApp()
  const [user] = useAuthState(auth)
  return (

    <Box
      bg={'#F3F3F3'}
      justifySelf={'center'}
      textAlign={['center', 'left']}
    >
      <CustomNavbar />

      <Flex>
        <Spacer />
        <VStack bg={'white'} w={[500, 1000]} boxShadow='Base' fontFamily={'Sarabun'} marginTop={55}>
          <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            boxShadow='Base'
          >
            <Box w={400} m={5}>
              <Spacer minH={[0, 30]} />
              <Heading fontFamily={'Mitr'} fontSize={[42, 48]} fontWeight={'bold'} textAlign={['center', 'center', 'left']}>Comuthor</Heading>
              <Box fontSize={[18, 24]} fontFamily={'Mitr'} fontWeight={600} textAlign={['center', 'center', 'left']}>เว็บไซต์คอมมูนิตี้โรลเพลย์เพื่อส่วนรวม</Box>
              <Box fontFamily={'Sarabun'} pl={[0, 8]} pt={2} textAlign={['center', 'left']}>
                แพล็ตฟอร์มสำหรับผู้สร้างสรรค์ผลงานประกอบการเล่น
              </Box>
              <Box textAlign={['center', 'left']}>
                บทบาทสมมติ โดยมีระบบช่วยเหลือ สำหรับผู้ใช้งาน มีการจัดเก็บข้อมูลภายในคอมมูนิตี้ได้ <b>สะดวก เรียบร้อย เป็นระบบ</b> ภายในเว็บไซต์เดียว
              </Box>
              <Flex m={5}>
                <Spacer />
                <Button
                  bg={'#FFC75A'}
                  borderRadius={10}
                  borderWidth={3}
                  borderColor={'black'}
                  h={54}
                  w={250}
                  fontWeight={'bold'}
                  fontSize={24}
                  onClick={onOpen}
                  ref={btnRef}
                  isDisabled={user}
                >
                  Register !
                </Button>

                <Drawer
                  isOpen={isOpen}
                  placement='right'
                  onClose={onClose}
                  finalFocusRef={btnRef}
                  size={'sm'}
                >
                  <DrawerOverlay />
                  <DrawerContent mt={55}>
                    <DrawerCloseButton />
                    <DrawerHeader>Sign in</DrawerHeader>

                    <SignIn />

                  </DrawerContent>
                </Drawer>
                <Spacer />
              </Flex>

            </Box>

            <Center h={[100, 200, 400]} w={[100, 200, 400]} m={5} borderRadius={[250, 500, 1000]} shadow={'inner'} bg={'#FDFDFD'}>
              <Center h={[88, 175, 350]} w={[88, 175, 350]} borderRadius={[250, 500, 1000]} shadow={'inner'} bg={'#F5F5F5'}>
                <Center h={[79, 158, 315]} w={[79, 158, 315]} borderRadius={[250, 500, 1000]} bg={'#E7E7E7'} shadow={'inner'}>
                  <img src="Comuthor1.png" height={[350]} width={[350]}></img>
                </Center>
              </Center>
            </Center>
          </Flex>

          <VStack
            p={10}
            m={10}
            boxShadow='base'
            bg={'#FAFAFA'}
            w={[275, 413, 825]}
            borderRadius={10}>

            {/* Preview Commu Card */}

            <Flex>
              <Tag outlineColor={'#FBBC43'} bg={'white'} color={'tomato'} borderRadius={10} mr={5} mt={2} size={'sm'} h={5}>
                New
              </Tag>
              <Center fontSize={24} fontWeight={600}>Patch 1</Center>
            </Flex>

            <Center fontWeight={400} fontSize={16}>ประกาศอัพเดทครั้งใหม่! เพิ่มเติมระบบภายในคอมมูนิตี้ให้หลากหลายมากขึ้น</Center>

            <Flex maxW={550}
              align="center"
              justify={{ base: "center", md: "space-around", xl: "space-between" }}
              direction={{ base: "column-reverse", md: "row" }}
              w={'100%'}
            >
              <VStack
                p={5}
                bg={'white'}
                boxShadow='base'
                borderRadius={10}
                w={170}
                h={180}
                mt={'2.5'}
                mb={'2.5'}
              >
                <Center bg={'#6768AB'} color={'#FFC75A'} borderRadius={100} h={42} w={42}><UsersThree size={32} /></Center>
                <Center fontWeight={500} fontSize={18}><b>Community</b></Center>
                <Center fontWeight={400} fontSize={14}>โปรโมทและเข้าชม</Center>
                <Center fontWeight={400} fontSize={14}>คอมมูนิตี้ได้ที่นี่</Center>
              </VStack>

              <Spacer />

              <VStack
                p={5}
                bg={'white'}
                boxShadow='base'
                borderRadius={10}
                w={170}
                h={180}
              >
                <Center bg={'#6768AB'} color={'#FFC75A'} borderRadius={100} h={42} w={42}><Bell size={32} /></Center>
                <Center fontWeight={500} fontSize={18}><b>Notification</b></Center>
                <Center fontWeight={400} fontSize={14}>การแจ้งเตือน</Center>
                <Center fontWeight={400} fontSize={14}>และประกาศข่าวสาร</Center>
                {/* <Center fontWeight={400} fontSize={14}>และประกาศข่าวสาร</Center> */}
              </VStack>

              <Spacer />

              <VStack
                p={5}
                bg={'white'}
                boxShadow='base'
                borderRadius={10}
                w={170}
                h={180}
              >
                <Center bg={'#6768AB'} color={'#FFC75A'} borderRadius={100} h={42} w={42}><Chats size={32} /></Center>
                <Center fontWeight={500} fontSize={18}><b>Chat</b></Center>
                <Center fontWeight={400} fontSize={14}>แชทสำหรับพูดคุย</Center>
                <Center fontWeight={400} fontSize={14}>แบบส่วนตัว</Center>
                {/* <Center fontWeight={400} fontSize={14}>ในคอมมูและส่วนตัว</Center> */}
              </VStack>

            </Flex>

          </VStack >

          <Spacer />

          <VStack
            p={10}
            m={10}
            boxShadow='base'
            bg={'#FAFAFA'}
            w={[275, 413, 825]}
            borderRadius={10}
          >

            <Center fontWeight={700} fontSize={24}>แผนการพัฒนาเว็บไซต์</Center>
            <Center fontWeight={400} fontSize={16}>ในอนาคตอันใกล้นี้พวกเราทำให้เว็บไซต์ Comuthor</Center>
            <Center fontWeight={400} fontSize={16}>กลายเป็นพื้นที่ที่ทุก ๆ ท่านสามารถเล่นและมีปฏิสัมพันธ์กันภายในคอมมูได้</Center>

            <Flex
              align="center"
              justify={{ base: "center", md: "space-around", xl: "space-between" }}
              direction={{ base: "column-reverse", md: "row" }}
              w={'50%'}
            >
              {/* <VStack
                p={5}
                borderRadius={10}
              // w={170}
              // h={180}
              >
                <UserList size={100} color="#6768AB" weight="fill" />
                <Center fontWeight={'extrabold'} fontSize={22}>Vote</Center>
                <Center fontWeight={400} fontSize={14}>สามารถสร้างโพลล์โหวต</Center>
                <Center fontWeight={400} fontSize={14}>ภายในคอมมูนิตี้</Center>
              </VStack>

              <Spacer />

              <VStack
                p={5}
                borderRadius={10}
              // w={170}
              // h={180}
              >
                <UserCirclePlus size={100} color="#6768AB" weight="fill" />
                <Center fontWeight={'extrabold'} fontSize={22}>Create Character</Center>
                <Center fontWeight={400} fontSize={14}>ระบบการจัดการตัวละคร</Center>
                <Center fontWeight={400} fontSize={14}>จัดสร้างและจัดการสตอรี่</Center>
              </VStack> */}

              {/* <Spacer /> */}

              <VStack
                p={5}
                borderRadius={10}
                justifyContent='center'
              // w={170}
              // h={180}
              >
                <MagnifyingGlass size={100} color="#6768AB" weight="fill" />
                <Center fontWeight={'extrabold'} fontSize={22}>Search</Center>
                <Center fontWeight={400} fontSize={14}>สามารถค้นหา</Center>
                <Center fontWeight={400} fontSize={14}>ได้ตามความสนใจ</Center>
              </VStack>

              {/* <Spacer /> */}

              <VStack
                p={5}
                borderRadius={10}
              // w={170}
              // h={180}
              >
                <PushPin size={100} color="#6768AB" weight="fill" />
                <Center fontWeight={'extrabold'} fontSize={22}>Pin</Center>
                <Center fontWeight={400} fontSize={14}>ปักหมุด</Center>
                <Center fontWeight={400} fontSize={14}>รับการแจ้งเตือน</Center>
              </VStack>
            </Flex>

          </VStack >

          <Spacer />
          <Spacer />

          <Center fontSize={20} fontWeight={400}>ช่องทางติดตามข่าวสาร</Center>

          <Spacer />

          <Flex w={[275, 600]}
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column", md: "row" }}>

            <a target="_blank" href="https://www.facebook.com/ComuthorCorp">
              <VStack
                p={5}
                bg={'#F3F3F3'}
                boxShadow='base'
                borderRadius={10}
                w={275}
                as={"button"}
                _hover={{
                  backgroundColor: 'gray.200'
                }}
              >
                <Center>
                  <a target="_blank" href="https://www.facebook.com/ComuthorCorp" >
                    <FacebookLogo
                      size={100}
                      color="#343434"
                      as='button'
                      cursor={"pointer"}
                      weight="fill"
                    />
                  </a>

                </Center>
                <Hide below='md'>
                  <a target="_blank" href="https://www.facebook.com/ComuthorCorp">
                    <Center fontWeight={500} fontSize={18} overflow={"hidden"} >Facebook Fanpage</Center>
                  </a>

                </Hide>
                <Center
                  fontWeight={400}
                  fontSize={14}
                  as='button'
                  cursor={"pointer"}
                  onClick={() => router.push("https://www.facebook.com/ComuthorCorp")}
                >
                  Comuthor
                </Center>
              </VStack>
            </a>

            <Spacer />

            <a target="_blank" href="https://discord.com/invite/BVrwyCPEHc">
              <VStack
                p={5}
                bg={'#F3F3F3'}
                boxShadow='base'
                borderRadius={10}
                w={275}
                _hover={{
                  backgroundColor: 'gray.200'
                }}
              >
                <a target="_blank" href="https://discord.com/invite/BVrwyCPEHc">
                  <Center>
                    <a target="_blank" href="https://discord.com/invite/BVrwyCPEHc">
                      <DiscordLogo
                        size={100}
                        color="#343434"
                        weight="fill"
                        as='button'
                        cursor={"pointer"}
                      />
                    </a>

                  </Center>
                </a>

                <Hide below='md'>
                  <Center fontWeight={500} fontSize={18}>Discord</Center>
                </Hide>
                <Center fontWeight={400} as='button'
                  cursor={"pointer"}
                  onClick={() => router.push("https://discord.gg/BVrwyCPEHc")}
                  fontSize={14}>Comuthor Community</Center>

              </VStack>
            </a>


          </Flex>

          <Spacer />
          <Spacer />

          <Center fontWeight={400} fontSize={[16, 18]} textAlign={['center', 'left']}>ขอขอบคุณทุก ๆ ท่านที่ให้ความสนใจเว็บไซต์ของพวกเราด้วยนะ</Center>
          <Center fontWeight={400} fontSize={[16, 18]} textAlign={['center', 'left']}>พวกเราจะพยายามพัฒนาเว็บไซต์นี้กันอย่างสุดความสามารถเลยล่ะ !</Center>
          <Spacer />
          <Spacer />
        </VStack>

        <Spacer />
      </Flex>
      <Footer></Footer>
    </Box>
  );
}
