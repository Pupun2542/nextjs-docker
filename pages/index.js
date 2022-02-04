import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../src/config/firebase.config";
import CustomNavbar from "../components/navbar";
import { Container, Row, Col, SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div>
      <CustomNavbar />
      <Container>
        <Row>เริ่มเล่น เริ่มเขียน เริ่มสร้าง เริ่มต้นใหม่ที่ Comuthor</Row>
        {/* <Row>Patch?</Row> */}
        <Row>All Feature</Row>
        <Row>
          <Row>Next Patch</Row>
          <Row>
            <Col>Roleplay</Col>
            <Col>Function</Col>
            <Col>Q/A</Col>
            <Col>member</Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}
