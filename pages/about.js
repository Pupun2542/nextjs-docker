import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import CustomNavbar from '../components/navbar';
import styles from "../styles/about.module.css";
import Head from 'next/head';
import { Box, Flex, Image, Spacer, VStack, Heading, Center, Stack, Text, HStack } from '@chakra-ui/react'
import Footer from '../components/footer';

function about() {
  return (
    <Box
      bg={'#FFC75A'}
    >
      <CustomNavbar />



      <Flex
        justifyContent={'center'}
      >
        <Flex
          bg={'white'}
          w={1000}
          h={1000}
          justifyContent={'center'}
          boxShadow={'base'}
        >
          <Box bg={'#6768AB'} h={200} w={200} mt={200}></Box>
          
          <Flex
            bg={'#F3F3F3'}
            w={800}
            boxShadow={'base'}
          >
            <Flex
              mt={200}
              bg={'#6768AB'}
              h={200}
              w={800}
            >

            </Flex>
          </Flex>
          <Box bg={'#6768AB'} h={200} w={200} mt={200}></Box>
        </Flex>
      </Flex>

      <Footer />
    </Box>
  );
}

export default about;
