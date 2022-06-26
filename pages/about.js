import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomNavbar from "../components/navbar";
import styles from "../styles/about.module.css";
import Head from "next/head";
import {
  Box,
  Flex,
  Image,
  Spacer,
  VStack,
  Heading,
  Center,
  Stack,
  Text,
  HStack,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import Footer from "../components/footer";
import { DiscordLogo, FacebookLogo, TwitterLogo } from "phosphor-react";
import { useRouter } from "next/router";

function about() {
  const router = useRouter();

  return (
    <Box bg={"#FFC75A"}>
      <CustomNavbar />

      <Flex justifyContent={"center"}>
        <Flex
          bg={"white"}
          w={1000}
          fontFamily={"Mitr"}
          justifyContent={"center"}
          boxShadow={"base"}
        >
          <Box bg={"#6768AB"} h={200} w={200} mt={200}></Box>

          <Flex bg={"#F3F3F3"} w={800} boxShadow={"base"} direction={"column"}>
            {/* about */}
            <Flex
              mt={200}
              bg={"#6768AB"}
              h={200}
              w={800}
              fontFamily={"Mitr"}
              p={8}
            >
              <VStack color={"white"} spacing={0}>
                <Text
                  fontSize={48}
                  fontWeight={"700"}
                  fontStyle={"normal"}
                  // lineHeight={'75px'}
                  w={"100%"}
                >
                  ABOUT US
                </Text>
                <Text
                  fontSize={38}
                  fontWeight={"400"}
                  fontStyle={"normal"}
                  // lineHeight={'75px'}
                >
                  Comuthor team
                </Text>
              </VStack>

              <Spacer />

              <Center>
                <Center
                  bg={"white"}
                  rounded={"full"}
                  boxShadow={"inset 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                  p={5}
                >
                  <Center
                    bg={"white"}
                    rounded={"full"}
                    boxShadow={"inset 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                    p={5}
                  >
                    <Center
                      bg={"#F3F3F3"}
                      rounded={"full"}
                      boxShadow={"inset 0px 4px 4px rgba(0, 0, 0, 0.25)"}
                    >
                      <Image src="Comuthor1.png" w={350} h={350} />
                    </Center>
                  </Center>
                </Center>
              </Center>
            </Flex>

            {/* <Box>Hey</Box> */}

            {/* SUPPORT */}
            <Flex
              borderRadius={10}
              mt={150}
              pt={10}
              pb={10}
              bg={"#6768AB"}
              direction={"column"}
              w={"100%"}
            >
              <Box w={"100%"} bg={"#FFC75A"} color={"#6768AB"} pl={10}>
                <Text
                  fontSize={48}
                  fontWeight={"extrabold"}
                  fontStyle={"normal"}
                  fontFamily={"Mitr"}
                >
                  SUPPORT US!
                </Text>
              </Box>

              <Center mt={5} w={"100%"}>
                <Flex
                  w={"30%"}
                  direction={"column"}
                  fontFamily={"Mitr"}
                  color={"white"}
                  justifyContent={"center"}
                >
                  <Flex w={"100%"} justifyContent={"center"}>
                    <Image src="QR11.jpg" w={150} />
                  </Flex>

                  <Flex m={2} direction={"column"} fontSize={16}>
                    <Center>ธนาคาร ไทยพาณิชย์</Center>
                    <Center>301-461713-0</Center>
                    <Center>นางสาวอินทุอร มากนุ่ม</Center>
                  </Flex>
                </Flex>

                <Center h={100}>
                  <Divider orientation="vertical" />
                </Center>

                <Flex
                  w={"30%"}
                  direction={"column"}
                  fontFamily={"Mitr"}
                  color={"white"}
                  justifyContent={"center"}
                >
                  <Flex w={"100%"} justifyContent={"center"}>
                    <Image src="logo.f8267020b29b.svg" w={150} />
                  </Flex>

                  <Flex m={2} direction={"column"} fontSize={20}>
                    <Center>Soon</Center>
                  </Flex>
                </Flex>

                <Center h={100}>
                  <Divider orientation="vertical" />
                </Center>
                <Flex
                  w={"30%"}
                  direction={"column"}
                  fontFamily={"Mitr"}
                  color={"white"}
                  justifyContent={"center"}
                >
                  <Flex w={"100%"} justifyContent={"center"}>
                    <Image src="Ko-fi_Icon_RGB_rounded.png" w={150} />
                  </Flex>

                  <Flex m={2} direction={"column"} fontSize={20}>
                    <Center>Soon</Center>
                  </Flex>
                </Flex>
              </Center>
            </Flex>

            {/* Contact */}
            <Box w={"100%"} m={5} fontWeight={700} fontSize={24}>
              Contact
            </Box>

            <SimpleGrid spacing={5} columns={3} pr={5} pl={5} pb={5}>
              <Flex
                bg={"#6768AB"}
                borderRadius={10}
                p={2}
                borderWidth={3}
                color={"white"}
                pl={5}
                borderColor={"black"}
                as={"button"}
                onClick={() => router.push("https://discord.gg/BVrwyCPEHc")}
              >
                <DiscordLogo size={60} />

                <Center h={55} pl={3} fontSize={18}>
                  Discord
                </Center>
              </Flex>

              <Flex
                bg={"#6768AB"}
                borderRadius={10}
                p={2}
                borderWidth={3}
                color={"white"}
                pl={5}
                borderColor={"black"}
                as={"button"}
                onClick={() =>
                  router.push("https://www.facebook.com/ComuthorCorp")
                }
              >
                <FacebookLogo size={60} />

                <Center h={55} pl={3} fontSize={18}>Facebook</Center>
              </Flex>

              <Flex
                bg={"#6768AB"}
                borderRadius={10}
                p={2}
                borderWidth={3}
                color={"white"}
                pl={5}
                borderColor={"black"}
                cursor={"not-allowed"}
              >
                <TwitterLogo size={60} />

                <Center h={55} pl={3} fontSize={18}>Twitter</Center>
              </Flex>
            </SimpleGrid>

            {/* Staff */}

            <Box
              w={'100%'}
              mb={5} mr={5} ml={5}
              fontWeight={700}
              fontSize={24}
            >
              Staff
            </Box>

            <SimpleGrid columns={3} p={5} spacing={10}>
              {/* ManiaS */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image src="ManiaS.png" width={100} height={100}></Image>
                  </Center>

                  <Flex direction={'column'}>
                    <Center fontSize={20} fontWeight={'extrabold'}>ManiaS</Center>
                    <Center fontSize={14}>Co-Founder</Center>
                    <Center fontSize={14}>Concept and Graphic</Center>
                    <Center fontSize={14}>Designer (UX&UI)</Center>

                  </Flex>
                </Flex>
              </Flex>
              {/* Mr.Daruma */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image src="daruma.png" height={100} width={100}></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={20} fontWeight={"extrabold"}>
                      Mr.Daruma
                    </Center>
                    <Center fontSize={14}>Co-Founder</Center>
                    <Center fontSize={14}>Frontend-Developer</Center>
                    <Center fontSize={14}>Media Production</Center>
                  </Flex>
                </Flex>
              </Flex>
              {/* pun */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image src="pun.png" height={100} width={100}></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={18} fontWeight={"extrabold"}>
                      WeFailedTheRodina
                    </Center>
                    <Center fontSize={14}>Leader Developer Team</Center>
                    <Center fontSize={14}>Back-end Developer</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                  </Flex>
                </Flex>
              </Flex>
              {/* Niflheimea */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={'100%'}>
                    <Image src='Yuu.png' height={100} width={100}></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={18} fontWeight={"extrabold"}>
                      Niflheimea Project
                    </Center>
                    <Center fontSize={14}>Project Manager</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                  </Flex>
                </Flex>
              </Flex>
              {/* CreatorVerse */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image
                      rounded={"full"}
                      src="CV.jpg"
                      height={100}
                      width={100}
                    ></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={18} fontWeight={"extrabold"}>
                      CreatorVerse Official
                    </Center>
                    <Center fontSize={14}>Project Adviser</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                  </Flex>
                </Flex>
              </Flex>
              {/* kurona */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image
                      // rounded={'full'}
                      src="UncertD.png"
                      height={100}
                      width={100}
                    ></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={18} fontWeight={"extrabold"}>
                      UncertD
                    </Center>
                    <Center fontSize={14}>Support-Developer</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                  </Flex>
                </Flex>
              </Flex>
              {/* Kasayama */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image
                      rounded={"full"}
                      src="Tar.png"
                      height={100}
                      width={100}
                    ></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={18} fontWeight={"extrabold"}>
                      Kasayama
                    </Center>
                    <Center fontSize={14}>Graphic Designer (UX&UI)</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                  </Flex>
                </Flex>
              </Flex>
              {/* natthara */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image
                      rounded={"full"}
                      src="natthara.png"
                      height={100}
                      width={100}
                    ></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={18} fontWeight={"extrabold"}>
                      Nxttharx
                    </Center>
                    <Center fontSize={14}>Apprentice</Center>
                    <Center fontSize={14}>Developer</Center>
                  </Flex>
                </Flex>
              </Flex>
              {/* Kawakhwan */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image
                      // rounded={'full'}
                      src='khwan.png'
                      height={100}
                      width={100}
                    ></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={18} fontWeight={"extrabold"}>
                      Kawakhwan
                    </Center>
                    <Center fontSize={14}>Graphic Designer (UX&UI)</Center>
                    <Center fontSize={14} color={'white'}>.</Center>
                  </Flex>
                </Flex>
              </Flex>
              {/* 7ess */}
              <Flex direction={"column"}>
                <Flex
                  bg={"white"}
                  borderRadius={10}
                  boxShadow={"base"}
                  justifyContent={"center"}
                  p={5}
                  direction={"column"}
                  h={230}
                >
                  <Center w={"100%"}>
                    <Image
                      rounded={"full"}
                      src="mm.png"
                      height={100}
                      width={100}
                    ></Image>
                  </Center>

                  <Flex direction={"column"}>
                    <Center fontSize={18} fontWeight={"extrabold"}>
                      7ess
                    </Center>
                    <Center fontSize={14}>Apprentice</Center>
                    <Center fontSize={14}>Fronend-Developer</Center>
                  </Flex>
                </Flex>
              </Flex>
            </SimpleGrid>

            <Center fontSize={"46"} p={10}>
              ขอขอบคุณทุกท่านที่สนับสนุนพวกเรา!
            </Center>
          </Flex>
          <Box bg={"#6768AB"} h={200} w={200} mt={200}></Box>
        </Flex>
      </Flex>

      <Footer />
    </Box>
  );
}

export default about;
