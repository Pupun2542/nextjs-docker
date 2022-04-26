import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import CustomNavbar from '../components/navbar';
import styles from "../styles/about.module.css" ;
import Head from 'next/head';
import {Box, Flex, Image, Spacer, VStack, Heading, Center, Stack, Text, HStack} from '@chakra-ui/react'

function about() {
  return (
    <>
        <Head>
          <link rel="shortcut icon" href="favicon.ico"></link>
          <title> Comuthor | รายชื่อทีมงาน </title>
        </Head>
    <Box color="FFFFFF">
      <CustomNavbar />
      <Center>
        <Box w="1500" boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' fontFamily={'Mitr'} >
        <Text fontFamily={'Mitr'} fontSize="40px" align="center" fontWeight='bold' paddingTop={10} > About us </Text>
        <Text fontFamily={'Mitr'} fontSize="20px" align="center" > รายชื่อทีมงาน </Text>
        <Container>
      <Row>
        <Box>
          <Flex direction={['column', 'row']} 
            p={10} 
            m={10} 
            boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' 
            w={1200}
            borderRadius={10}
            align="center"
          >
            <Box paddingRight={100} paddingLeft={50} width={500} >
              <Image src='ManiaS.png' height={100}  width={100} />
              <Text fontFamily={'Mitr'} fontSize="16px"> ManiaS </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Co-founder Concept and Graphic Designer (UX&UI) </Text>
            </Box>
              <Box paddingRight={100} width={500} paddingLeft={100} >
              <Image src='daruma.png' height={100}  width={100} />
              <Text fontFamily={'Mitr'} fontSize="16px"> Mr.Daruma </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Co-founder and Front-end Developer </Text>
            </Box>
            <Box paddingRight={100} width={500} paddingLeft={100} >
              <Image src='Yuu.png' height={100}  width={100} />
              <Text fontFamily={'Mitr'} fontSize="16px"> Niflheimea-Project </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Project Manager </Text>
            </Box>
          </Flex>
          </Box>
      </Row>
      <Row>
        <Box>
          <Flex direction={['column', 'row']} 
            p={10} 
            m={10} 
            boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' 
            w={1200}
            borderRadius={10}
            align="center"
          >
            <Box paddingRight={100} paddingLeft={50} width={500} >
              <Image src='pun.png' height={100}  width={100} />
              <Text fontFamily={'Mitr'} fontSize="16px"> WeFailedTheRodina </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Back-end Developer </Text>
            </Box>
              <Box paddingRight={100} width={500} paddingLeft={100} >
              <Image src='CV.jpg' height={100}  width={100} borderRadius="full" />
              <Text fontFamily={'Mitr'} fontSize="16px"> CreatorVerse Official </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Project Adviser </Text>
            </Box>
            <Box paddingRight={50} width={500} paddingLeft={100} >
              <Image src='UncertD.png' height={100}  width={100}  borderRadius="full" />
              <Text fontFamily={'Mitr'} fontSize="16px"> UncertD </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Developer </Text>
            </Box>
          </Flex>
          </Box>
      </Row>
      <Row>
        <Box>
          <Flex direction={['column', 'row']} 
            p={10} 
            m={10} 
            boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' 
            w={1200}
            borderRadius={10}
            align="center"
          >
            <Box paddingRight={100} paddingLeft={50} width={500} >
              <Image src='Tar.png' height={100}  width={100} />
              <Text fontFamily={'Mitr'} fontSize="16px"> Kasayama </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Developer and Graphic Designer (UX&UI) </Text>
            </Box>
              <Box paddingRight={100} width={500} paddingLeft={100} >
              <Image src='natthara.png' height={110}  width={110} borderRadius="full" />
              <Text fontFamily={'Mitr'} fontSize="16px"> Nxttharx </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Developer </Text>
            </Box>
            <Box paddingRight={50} width={500} paddingLeft={100} >
              <Image src='Comuthor1.png' height={100}  width={100}  borderRadius="full" />
              <Text fontFamily={'Mitr'} fontSize="16px"> คุณจันทร์ </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Graphic Designer </Text>
            </Box>
          </Flex>
          </Box>
      </Row>
      <Row>
        <Box>
          <Flex direction={['column', 'row']} 
            p={10} 
            m={10} 
            boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' 
            w={1200}
            borderRadius={10}
            align="center"
          >
            <Box paddingRight={100} paddingLeft={50} width={500} >
              <Image src='khwan.png' height={100}  width={100} />
              <Text fontFamily={'Mitr'} fontSize="16px"> kawakhwan </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Graphic Designer (UX&UI) </Text>
            </Box>
              <Box paddingRight={100} width={500} paddingLeft={100} >
              <Image src='Comuthor1.png' height={110}  width={110} />
              <Text fontFamily={'Mitr'} fontSize="16px"> คุณมะเหมี่ยว </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> Developer </Text>
            </Box>
            <Box paddingRight={50} width={500} paddingLeft={100} >
              {/* <Image src='Comuthor1.png' height={100}  width={100}  borderRadius="full" />
              <Text fontFamily={'Mitr'} fontSize="16px"> คุณไอซ์ </Text>
              <Text fontFamily={'Mitr'} fontSize="16px"> เห็นใน Doc ประชุม </Text> */}
            </Box>
          </Flex>
          </Box>
      </Row>
          </Container>
          </Box>
      </Center>
    </Box>
    </>
  );
}

export default about;

{/* <Row className={styles.padhome}>
<Col>
  <div className={styles.picabout}><img src="ManiaS.png" height={150} width={150}></img></div>
</Col>
<Col>
  <div className={styles.text1}> ManiaS </div>
  <div className={styles.text2}> Founder / Concept Design </div>
</Col>
<Col>
<div className={styles.picabout}><img src="daruma.png" height={150} width={150}></img></div>
</Col>
<Col>
  <div className={styles.text1}> Mr.Daruma-Tan </div>
  <div className={styles.text2}> Founder  / Developer </div>
</Col>
</Row>

<Row className={styles.padhome}>
<Col>
  <div className={styles.picabout}><img src="Rose.png" height={150} width={150}></img></div>
</Col>
<Col>
  <div className={styles.text1}> Rose : Niflheimea </div>
  <div className={styles.text2}> Project Manager </div>
</Col>
<Col>
<div className={styles.picabout}><img src="comuthor1.png" height={150} width={150}></img></div>
</Col>
<Col>
  <div className={styles.text1}> CreatorVerse Official </div>
  <div className={styles.text2}> Project Adviser </div>
</Col>
</Row>

<Row className={styles.padhome}>
<Col>
  <div className={styles.picabout}><img src="comuthor1.png" height={150} width={150}></img></div>
</Col>
<Col>
  <div className={styles.text1}> WeFails </div>
  <div className={styles.text2}> Developer </div>
</Col>
<Col>
<div className={styles.picabout}><img src="comuthor1.png" height={150} width={150}></img></div>
</Col>
<Col>
  <div className={styles.text1}> แงวอยู่ทุกที่ </div>
  <div className={styles.text2}> Developer </div>
</Col>
</Row>

<Row className={styles.padhome}>
<Col>
  <div className={styles.picabout}><img src="Tar.png" height={150} width={150}></img></div>
</Col>
<Col>
  <div className={styles.text1}> Kasayama </div>
  <div className={styles.text2}> Developer </div>
</Col>
<Col>
<div className={styles.picabout}><img src="nxtthara.png" height={150} width={150}></img></div>
</Col>
<Col>
  <div className={styles.text1}> Nxttharx </div>
  <div className={styles.text2}> Developer </div>
</Col>
</Row> */}
