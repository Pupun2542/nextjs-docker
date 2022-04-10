import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../src/config/firebase.config";
import CustomNavbar from "../components/navbar";
import { Container, Row, Col, SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Nav from "../components/newnav";
import { 
  Box, 
  Center, 
  Flex, 
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

export default function Home() {
  return (

    <Box bg={'#FFFFFF'}>
      <Head>
        <link rel="shortcut icon" href="favicon.ico"></link>
        <title>Comuthor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <CustomNavbar />

      <Flex>
        <Spacer />
        <VStack w={1000} boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' fontFamily={'Mitr'}>
          <Flex>
            <Box w={400} m={5}>
                <Spacer minH={30}/>
                <Heading fontFamily={'Mitr'} fontSize={48} fontWeight={'bold'}>Comuthor</Heading>
                <Box fontSize={24} fontWeight={600}>เว็บไซต์คอมมูนิตี้โรลเพลย์เพื่อส่วนรวม</Box>
                <Box pl={8} pt={2}>
                  แพล็ตฟอร์มสำหรับผู้สร้างสรรค์ผลงานประกอบการเล่น
                </Box>
                <Box>บทบาทสมมติ โดยมีระบบช่วยเหลือ สำหรับผู้ใช้งาน มีการจัดเก็บข้อมูลภายในคอมมูนิตี้ได้สะดวก เรียบร้อย เป็นระบบ ภายในเว็บไซต์เดียว</Box>
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
                      > 
                      Register !
                    </Button>
                  <Spacer />
                </Flex>
                
            </Box>
            
            <Center h={400} w={400} m={5} borderRadius={1000} shadow={'inner'} bg={'#FDFDFD'}>
              <Center h={350} w={350} borderRadius={1000} shadow={'inner'} bg={'#F5F5F5'}>
                <Center h={315} w={315} borderRadius={1000} bg={'#E7E7E7'} shadow={'inner'}>
                  <img src="Comuthor1.png" height={350} width={350}></img>
                </Center>
              </Center>
            </Center>
          </Flex>

          <VStack 
            p={10} 
            m={10} 
            boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' 
            w={825}
            borderRadius={10}>
          
            <Flex>
              <Tag   outlineColor={'#FBBC43'} color={'tomato'} borderRadius={10} mr={5} mt={2} size={'sm'} h={5}>
                New
              </Tag>
              <Center fontSize={24} fontWeight={600}>Patch 0.5</Center>
            </Flex>
            
            
            <Center fontWeight={400} fontSize={16}>ประกาศอัพเดทครั้งใหม่! ปรับปรุงแก้ไขสีและรูปแบบของเว็บไซต์ รวมถึงเพิ่มเติมในส่วนของข้อมูลคอมมูนิตี้</Center>
            
            <Spacer />

            <Flex w={550}>
              
              <VStack 
                p={5} 
                bg={'FDFDFD'} 
                boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                borderRadius={10}
                w={170}
              >
                <Center bg={'#6768AB'} color={'#FFC75A'} borderRadius={100} h={42} w={42}><UsersThree size={32}/></Center>
                <Center fontWeight={500} fontSize={18}>Community</Center>
                <Center fontWeight={400} fontSize={14}>โปรโมทและเข้าชม</Center>
                <Center fontWeight={400} fontSize={14}>คอมมูนิตี้ได้ที่นี่</Center>
              </VStack>

              <Spacer />

              <VStack 
                p={5} 
                bg={'FDFDFD'} 
                boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                borderRadius={10}
                w={170}
              >
                <Center bg={'#6768AB'} color={'#FFC75A'} borderRadius={100} h={42} w={42}><Bell size={32}/></Center>
                <Center fontWeight={500} fontSize={18}>Notification</Center>
                <Center fontWeight={400} fontSize={14}>coming soon..</Center>
                {/* <Center fontWeight={400} fontSize={14}>และประกาศข่าวสาร</Center> */}
              </VStack>

              <Spacer />

              <VStack 
                p={5} 
                bg={'FDFDFD'} 
                boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                borderRadius={10}
                w={170}
              >
                <Center bg={'#6768AB'} color={'#FFC75A'} borderRadius={100} h={42} w={42}><Chats size={32}/></Center>
                <Center fontWeight={500} fontSize={18}>Chat</Center>
                <Center fontWeight={400} fontSize={14}>กำลังทดสอบระบบ</Center>
                {/* <Center fontWeight={400} fontSize={14}>ในคอมมูและส่วนตัว</Center> */}
              </VStack>

            </Flex>


            {/* <Center maxW={750}>
               <Flex  >
                <VStack 
                  bg={'FDFDFD'} 
                  minW={190}
                >
                  <Center color={'#6768AB'}><UserList size={100}/></Center>
                  <Center fontWeight={600} fontSize={24}>Vote</Center>
                  <Center fontWeight={400} fontSize={14}>สามารถสร้างโพลโหวต</Center>
                  <Center fontWeight={400} fontSize={14}>ภายในคอมมูนิตี้</Center>
                </VStack>

                <Spacer />

                <VStack 
                  bg={'FDFDFD'} 
                  borderRadius={10}
                  minW={210}
                >
                  <Center color={'#6768AB'}><UserCirclePlus size={100} /></Center>
                  <Center fontWeight={600} fontSize={24}>Create Character</Center>
                  <Center fontWeight={400} fontSize={14}>ระบบการจัดการตัวละคร</Center>
                  <Center fontWeight={400} fontSize={14}>จัดสร้างและจัดการสตอรี่</Center>
                </VStack>

                <Spacer />

                <VStack 
                  bg={'FDFDFD'} 
                  borderRadius={10}
                  minW={190}
                >
                  <Center color={'#6768AB'}><MagnifyingGlass size={100} /></Center>
                  <Center fontWeight={600} fontSize={24}>Search</Center>
                  <Center fontWeight={400} fontSize={14}>สามารถค้นหา</Center>
                  <Center fontWeight={400} fontSize={14}>ได้ตามความสนใจ</Center>
                </VStack>

                <Spacer />

                <VStack 
                  bg={'FDFDFD'} 
                  borderRadius={10}
                  minW={190}
                >
                  <Center color={'#6768AB'}><PushPin size={100} /></Center>
                  <Center fontWeight={600} fontSize={24}>Pin</Center>
                  <Center fontWeight={400} fontSize={14}>ปักหมุด</Center>
                  <Center fontWeight={400} fontSize={14}>รับการแจ้งเตือน</Center>
                </VStack>
              </Flex> 
            </Center> */}
            
          </VStack >

          <Spacer />
          <Spacer />
          <VStack 
            p={10} 
            m={10} 
            boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' 
            w={825}
            borderRadius={10}>
  
            <Center fontSize={24} fontWeight={600}>แผนการพัฒนาเว็บไซต์</Center>
            
            <Center fontWeight={400} fontSize={16}>ในอนาคตอันใกล้นี้พวกเราจะทำให้เว็บไซต์ Comuthor</Center>
            <Center fontWeight={400} fontSize={16}>กลายเป็นพื้นที่ที่ทุก ๆ ท่านสามารถเล่นและมีปฏิสัมพันธ์กันภายในคอมมูได้</Center>
            
            <Spacer />

            <Flex >
              
              <Center maxW={750}>
                <Flex  >
                  <VStack 
                    bg={'FDFDFD'} 
                    minW={190}
                  >
                    <Center color={'#6768AB'}><Sword size={100}/></Center>
                    <Center fontWeight={400} fontSize={14}>ระบบจัดการการต่อสู้</Center>
                    <Center fontWeight={400} fontSize={14}>ได้อย่างราบรื่นและสมดุล</Center>
                  </VStack>

                  <Spacer />

                  <VStack 
                    bg={'FDFDFD'} 
                    borderRadius={10}
                    minW={210}
                  >
                    <Center color={'#6768AB'}><Chats size={100} /></Center>
                    <Center fontWeight={400} fontSize={14}>การพูดคุยโต้ตอบ</Center>
                    <Center fontWeight={400} fontSize={14}>ภายในเว็บไซต์และคอมมูนิตี้</Center>
                  </VStack>

                  <Spacer />

                  <VStack 
                    bg={'FDFDFD'} 
                    borderRadius={10}
                    minW={190}
                  >
                    <Center color={'#6768AB'}><Megaphone size={100} /></Center>
                    <Center fontWeight={400} fontSize={14}>การประกาศประชาสัมพันธ์</Center>
                    <Center fontWeight={400} fontSize={14}>และแจ้งเตือนที่ดีภายในเว็บไซต์</Center>
                  </VStack>

                  <Spacer />

                  <VStack 
                    bg={'FDFDFD'} 
                    borderRadius={10}
                    minW={190}
                  >
                    <Center color={'#6768AB'}><UserCirclePlus size={100} /></Center>
                    <Center fontWeight={400} fontSize={14}>ระบบการจัดการตัวละคร</Center>
                    <Center fontWeight={400} fontSize={14}>จัดสร้างและจัดการสตอรี่</Center>
                  </VStack>

                  
                </Flex> 
              </Center>

            </Flex>
            
          </VStack >

          <Spacer />

          <Center fontSize={20} fontWeight={400}>ช่องทางติดตามข่าวสาร</Center>

          <Spacer />

          <Flex w={600}>
            <VStack 
              p={5} 
              bg={'FDFDFD'} 
              boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
              borderRadius={10}
              w={250}
            >
              <Center><FacebookLogo size={100} /></Center>
              <Center fontWeight={500} fontSize={18}>Facebook Fanpage</Center>
              <Center fontWeight={400} fontSize={14}>Comuthor</Center>
              {/* <Center fontWeight={400} fontSize={14}>ในคอมมูและส่วนตัว</Center> */}
            </VStack>
            <Spacer />
            <VStack 
              p={5} 
              bg={'FDFDFD'} 
              boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
              borderRadius={10}
              w={250}
            >
              <Center><DiscordLogo size={100}/></Center>
              <Center fontWeight={500} fontSize={18}>Discord</Center>
              <Center fontWeight={400} fontSize={14}>Comuthor Community</Center>
              {/* <Center fontWeight={400} fontSize={14}>ในคอมมูและส่วนตัว</Center> */}
            </VStack>

          </Flex>

          <Spacer />
          <Spacer />

          <Center fontWeight={400} fontSize={18}>ขอขอบคุณทุก ๆ ท่านที่ให้ความสนใจเว็บไซต์ของพวกเราด้วยนะ</Center>
          <Center fontWeight={400} fontSize={18}>พวกเราจะพยายามพัฒนาเว็บไซต์นี้กันอย่างสุดความสามารถเลยล่ะ !</Center>
          <Spacer />
          <Spacer />
        </VStack>

        <Spacer />
      </Flex>
      <Footer></Footer>
    </Box>
  );
}
