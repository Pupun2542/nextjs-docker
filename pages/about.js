import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import CustomNavbar from '../components/navbar';

function about() {
  return (
      <div>
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
                    Commu Author
                  </Col>
                  </Row>
                  <Row>
                  <Col>
                    Programmer
                  </Col>
                  <Col>
                    Commu Author
                  </Col>
                  </Row>
                  
              </Row>
          </Container>
      </div>
  );
}

export default about;
