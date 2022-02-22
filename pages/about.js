import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import CustomNavbar from '../components/navbar';
import styles from "../styles/Home.module.css" ;

function about() {
  return (
      <div className={styles.presentHome}>
          <CustomNavbar/>
          <Container>
              <Row>
                  Project Commuthor 2022
              </Row>
              <Row>
                  รายชื่อทีมงาน
              </Row>
              <Row>
                  <Row>
                  <Col>
                    Project Owner
                  </Col>
                  <Col>
                    Manger
                  </Col>
                  </Row>
                  <Row>
                  <Col>
                    Programmer
                  </Col>
                  <Col>
                    Apprentice
                  </Col>
                  </Row>
                  
              </Row>
          </Container>
      </div>
  );
}

export default about;
