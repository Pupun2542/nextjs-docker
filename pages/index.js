import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../src/config/firebase.config";
import CustomNavbar from "../components/navbar";
import { Container, Row, Col, SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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

export default function Home() {
  const router = useRouter();
  const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }
  return (

    <Box
      bg={'#F3F3F3'}
      justifySelf={'center'}
      textAlign={['center', 'left']}
    >
      <CustomNavbar />

      <Flex>
        <Spacer />
        <VStack bg={'white'} w={[500, 1000]} boxShadow='Base' fontFamily={'Mitr'} marginTop={55}>
          <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap">
            <Box w={400} m={5}>
              <Spacer minH={[0, 30]} />
              <Heading fontFamily={'Mitr'} fontSize={[42, 48]} fontWeight={'bold'} textAlign={['center', 'center', 'left']}>Comuthor</Heading>
              <Box fontSize={[18, 24]} fontWeight={600} textAlign={['center', 'center', 'left']}>เว็บไซต์คอมมูนิตี้โรลเพลย์เพื่อส่วนรวม</Box>
              <Box pl={[0, 8]} pt={2} textAlign={['center', 'left']}>
                แพล็ตฟอร์มสำหรับผู้สร้างสรรค์ผลงานประกอบการเล่น
              </Box>
              <Box textAlign={['center', 'left']}>
                บทบาทสมมติ โดยมีระบบช่วยเหลือ สำหรับผู้ใช้งาน มีการจัดเก็บข้อมูลภายในคอมมูนิตี้ได้<b>สะดวก เรียบร้อย เป็นระบบ</b> ภายในเว็บไซต์เดียว
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
                  onClick={() => router.push("/login")}
                >
                  Register !
                </Button>
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

            <Spacer />

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
              >
                <Center bg={'#6768AB'} color={'#FFC75A'} borderRadius={100} h={42} w={42}><UsersThree size={32} /></Center>
                <Center fontWeight={500} fontSize={18}>Community</Center>
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
                <Center fontWeight={500} fontSize={18}>Notification</Center>
                <Center fontWeight={400} fontSize={14}>coming soon..</Center>
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
                <Center fontWeight={500} fontSize={18}>Chat</Center>
                <Center fontWeight={400} fontSize={14}>กำลังทดสอบระบบ</Center>
                {/* <Center fontWeight={400} fontSize={14}>ในคอมมูและส่วนตัว</Center> */}
              </VStack>

            </Flex>

            <Flex></Flex>

          </VStack >

          <Spacer />
          <Spacer />

          <Center fontSize={20} fontWeight={400}>ช่องทางติดตามข่าวสาร</Center>

          <Spacer />

          <Flex w={[275, 600]}
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column", md: "row" }}>
            <VStack
              p={5}
              bg={'#FAFAFA'}
              boxShadow='base'
              borderRadius={10}
              w={275}
            >
              <Center><FacebookLogo size={100} color="#343434" weight="fill" /></Center>
              <Hide below='md'>
                <Center fontWeight={500} fontSize={18} overflow={"hidden"} >Facebook Fanpage</Center>
              </Hide>
              <Center
                fontWeight={400}
                fontSize={14}
              >
                Comuthor
              </Center>
            </VStack>
            <Spacer />
            <VStack
              p={5}
              bg={'#FAFAFA'}
              boxShadow='base'
              borderRadius={10}
              w={275}
            >

              <Center><DiscordLogo size={100} color="#343434" weight="fill" /></Center>
              <Hide below='md'>
                <Center fontWeight={500} fontSize={18}>Discord</Center>
              </Hide>
              <Center fontWeight={400} fontSize={14}>Comuthor Community</Center>

            </VStack>

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
