import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import CustomNavbar from '../components/navbar';
import styles from "../styles/about.module.css" ;
import Head from 'next/head';
import {Box, Flex, Image} from '@chakra-ui/react'

function about() {
  return (
    <>
    <Head>
      <title> รายชื่อทีมงาน | Comuthor </title>
    </Head>
      <div className={styles.presentHome}>
          <CustomNavbar/>
          <Container>
            <div className={styles.nameComuthor}> Project Comuthor 2022 </div>
            <div className={styles.texttitle}> รายชื่อทีมงาน </div>
            <Row className={styles.padhome}>
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
                <div className={styles.text1}> Nxttharx : Nattharawipa </div>
                <div className={styles.text2}> Developer </div>
              </Col>
            </Row>

          </Container>
      </div>
      </>
  );
}

export default about;
