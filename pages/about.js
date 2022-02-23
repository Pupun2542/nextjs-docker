import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import CustomNavbar from '../components/navbar';
import styles from "../styles/Home.module.css" ;

function about() {
  return (
      <div>
          <CustomNavbar/>
          <Container>
            <div> Project Commuthor 2022 </div>
            <div> รายชื่อทีมงาน </div>
            <Row>
              ManiaS
              Founder / Concept Design มีรูปแล้ว
            </Row>
            <Row>
              Mr.Daruma-Tan
              Founder / Developer มีรูปแล้ว
            </Row>
            <Row>
              Rose : Niflheimea
              Project Manager มีรูปแล้ว
            </Row>
            <Row>
              CreatorVerse Official
              Project Adviser ยังไม่มีรูป
            </Row>
            <Row>
              Pun
              Developer
            </Row>
            <Row>
              Kuro
              Developer
            </Row>
            <Row>
              Kasayama
              Developer มีรูปแล้ว
            </Row>
            <Row>
              Nxttharx
              Developer มีรูปแล้วว
            </Row>
          </Container>
      </div>
  );
}

export default about;
