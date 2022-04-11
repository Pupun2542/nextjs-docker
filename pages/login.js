import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Login.module.css";
import "../src/config/firebase.config";
import {
  SignInwithGoogle,
  SignInWithFacebook,
  SignInWithEmailAndPassword,
} from "../src/services/authservice";
import { useState } from "react";
import CustomNavbar from "../components/navbar";
import { SSRProvider } from "react-bootstrap";
import { Router, useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Head from "next/head";
import { Box, Center, Flex, Spacer, VStack, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/layout";
import {
  FacebookLogo,
  DiscordLogo,
} from "phosphor-react";
import { Model } from "tabletop";

function Login() {
  const app = getApp();
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  var mail;
  if (loading) {
    return (
      <SSRProvider>
        <CustomNavbar />
      </SSRProvider>
    );
  }
  if (user) {
    mail = user.email;
  } else {
    mail = "null";
  }
  const signInWithEmail = async () => {
    SignInWithEmailAndPassword(email, password);
  };
  const google = () => {
    SignInwithGoogle();
    router.push("/");
  };
  const facebook = () => {
    SignInWithFacebook();
    router.push("/");
  };
  return (
    <SSRProvider>
      <Head>
        <link rel="shortcut icon" href="favicon.ico"></link>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Box>
        <CustomNavbar />
        
        <Flex>
          <Flex w={960} h={889} bg={'#FFFFFF'}>
            <Spacer />
            <Box
                  bg={'#343434'}
                  h={300}
                  w={500}
                  maxH={500}
                  borderRadius={'25'}
                  fontFamily={'Mitr'}
                  shadow={'dark-lg'}
                  mt={100}
                  >
              <VStack>
                <Center>
                  <Center color={'#FFFFFF'} fontSize={40} fontWeight={1000}>
                    Sign In
                  </Center>
                </Center>

                <Center h={232} w={500} borderBottomRadius={25} bg={'gray.100'}>
                  
                  <VStack>
                    <Center
                      color={'#FBBC43'}
                      bg={'#6768AB'}
                      w={300}
                      h={46}
                      borderRadius={10}
                      onClick={google}
                      as='button'
                    >
                      Sign In with Google
                    </Center>
                    
                    <Center
                      color={'#FBBC43'}
                      bg={'#6768AB'}
                      w={300}
                      h={46}
                      borderRadius={10}
                      onClick={facebook}
                      as='button'>
                      Sign In with Facebook
                    </Center>

                    <Spacer />

                    {/* <Center
                      color={'#343434'}
                      textDecor='underline'
                      as="button"
                      onClick={onOpen}
                    >
                      ข้อตกลงการใช้งานและบริการ
                    </Center>
                    
                    <Model isOpen={onOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader> ข้อตกลงการใช้งานและบริการ</ModalHeader>
                        <ModalCloseButton />
                      </ModalContent>
                    </Model> */}
                  </VStack>
                  
                  
                </Center>
                
                
              </VStack>
              
            </Box>
            <Spacer/>
          </Flex>

          <Box w={960} h={889} bg={'#C4C4CB'}>
            <VStack>
              <Box h={100}></Box>

              <Flex>
                <Spacer w={160}/>
                <Box
                  bg={'#FFFFFF'}
                  w={800}
                  h={150}
                  borderLeftRadius={10}
                  pl={5}
                  pt={12}
                  fontFamily={'Mitr'}
                  fontSize={20}
                  color={'#343434'}
                  shadow={'dark-lg'}
                >
                  <Box>ยินดีต้อนรับกลับเข้าสู่เว็บไซต์ Comuthor อีกครั้ง</Box>
                  <Box>มาเริ่มเล่น เริ่มเขียน เริ่มสร้าง และเริ่มต้นใหม่กันเถอะ!</Box>
                </Box>
              </Flex>

              <Box>
                <Center 
                  // bg={'tomato'}
                  w={500}
                  h={200}
                  borderTopColor={'white'}
                  mt="100"
                  borderTopWidth={2}
                >
                  
                  <Center color={'#343434'}>
                    <Flex>
                      <Center>
                        <VStack m={5}>
                          <Box fontFamily={'mitr'}>Comuthor © 2022</Box>
                          <Flex>
                            <FacebookLogo size={32} />
                            <Spacer w={5} />
                            <DiscordLogo size={32} />
                          </Flex>
                        </VStack>

                      </Center>

                      <Spacer w={50}/>

                      <Center>
                        <VStack fontFamily={'Mitr'} m={5}>
                          <Box >About us</Box>
                          <Box>Guide</Box>
                        </VStack>


                      </Center>

                      <Spacer  />

                      <Center>
                        <VStack m={5} fontFamily={'Mitr'}>
                          <Box>Policy</Box>
                          <Box>Term</Box>
                        </VStack>


                      </Center>
                    </Flex>
                  </Center>
                </Center>
              </Box>

            </VStack>
            
          </Box>
        </Flex>
      </Box>

    </SSRProvider>
  );
}

export default Login;
