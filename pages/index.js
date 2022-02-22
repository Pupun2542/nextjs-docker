import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../src/config/firebase.config";
import CustomNavbar from "../components/navbar";
import { Container, Row, Col, SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className={styles.presentHome}>
      <CustomNavbar />
      <Container>
        <Row>
          <Col md={6}>
            <div className={styles.nameComuthor}>Comuthor</div>
            <div className={styles.texthome}>เว็บไซต์คอมมูนิตี้โรลเพลย์เพื่อส่วนรวม</div>
            <div className={styles.textother}>...............................</div>
            <Row className={styles.texthome4}>เริ่มเล่น เริ่มเขียน เริ่มสร้าง</Row>
            <Row className={styles.texthome5}>และเริ่มต้นใหม่ที่ COMUTHOR</Row>


          </Col>

          <Col md={6}>
            <div className={styles.picfeather}><img src="Comuthor1.png" height={550} width={550}></img></div>
          </Col>
        </Row>
       
       <Row className={styles.padhome}>
         <Col md ={3}>
           <div className={styles.pichome}><img src="online-community.png" height={200} width={200}></img></div>
         </Col>
         
         <Col md={9}>
            <div className={styles.texthome2}>แพลตฟอร์มสำหรับผู้สร้างสรรค์ผลงาน ประกอบการเล่นบทบาทสมมติ</div>
            <div className={styles.texthome2}>โดยมีระบบช่วยเหลือสำหรับผู้ใช้งาน มีการจัดเก็บข้อมูลภายใจคอมมูนิตี้ได้</div>
            <div className={styles.texthome2}>สะดวก เรียบร้อย เป็นระบบระเบียบอยู่ภายในเว็บไซต์เดียว</div>
         </Col>
       </Row>

       <Row className={styles.padhome}>
         <Col md={9}>
          <div className={styles.texthome3}>Comuthor หรือคอมมิวเธอร์ มาจาก Community ที่แปลว่ากลุ่มสังคม</div>
          <div className={styles.texthome3}>ซึ่งใจที่นี้คือกลุ่มสังคมโรลเพลย์ และคำว่า Author ที่หมายถึงผู้เขียน และ นักประพันธ์</div>
         </Col>

         <Col md ={3}>
           <div className={styles.pichome}><img src="chat.png" height={200} width={200}></img></div>
         </Col>
       </Row>
        
      <Row className={styles.padhome}>
        <div className={styles.textpatch}>Patch 0: Starts!</div>
        <div className={styles.textother}>ในแพทช์นี้ เราจะมาทำความรู้จักกันก่อนนะ!!</div>
        <div className={styles.textother}>ถ้าหากมีการอัพเดทใด ๆ เพิ่มเติมทางเราจะรีบประกาศให้ทุก ๆ ท่านทราบให้เร็วที่สุดเลย!</div>
        <div className={styles.textdot}>.</div>
        <div className={styles.textdot}>.</div>
        <div className={styles.textdot}>.</div>
        <div className={styles.textother}>ในตอนนี้เราได้พัฒนาระบบพื้นฐานสำหรับเว็บไซต์และระบบพื้นฐานสำหรับคอมมูนิตี้เอาไว้ดังนี้</div>
        <div className={styles.textdot}>.</div>
        <div className={styles.textdot}>.</div>

        <Row>
          <div className={styles.textHeader}>ระบบ Login และ Logout</div>
          <div className={styles.textother}>ทุก ๆ ท่านสามารถเข้าร่วมใช้งานเว็บไซต์ของเรา ได้โดยการ Sign in with Google หรือ Facebook ได้ทันที เพื่อความสะดวกสบายของผู้ใช้งานที่ไม่จำเป็นจะต้องสร้าง Account ใหม่ให้ยุ่งยาก</div>
          <div className={styles.textother}>...............................</div>
          <div className={styles.textHeader}>ระบบสร้างคอมมู และดูรายละเอียดของคอมมูต่าง ๆ</div>
          <div className={styles.textother}>แม้จะยังเป็นแค่การวางรายละเอียดของคอมมูเอาไว้ แต่ในอนาคตเราจะพัฒนาให้ทุก ๆ ท่านสามารถมีส่วนร่วมกับพวกเราได้ภายในเว็บไซต์เดียวอย่างแน่นอน ช่วยอดใจรอกันไว้หน่อยนะ!</div>
          <div className={styles.textother}>...............................</div>
          <div className={styles.textother}>ทางเราต้องขอขอบคุณทุก ๆ ท่านที่ให้ความสนใจเว็บไซต์ของพวกเราด้วยนะ! พวกเราจะพยายามพัฒนาเว็บไซต์นี้กันอย่างสุดความสามารถเลยล่ะ!</div>
          <div className={styles.textother}>...............................</div>
          <div className={styles.textother}>สามารถติดตามข่าวสารได้ที่ Page Facebook: <a href="https://www.facebook.com/ComuthorCorp" className={styles.linkcomuthor}>Comuthor</a> หรือ Discord : <a className={styles.linkcomuthor} href="https://discord.gg/K5xhJu6yM6">Comuthor Community</a></div>
          <div className={styles.textdot}>.</div>
          <div className={styles.textother2}>เรามาเริ่มเล่น เริ่มเขียน เริ่มสร้าง </div>
          <div className={styles.textother2}>และเริ่มต้นใหม่ในบ้านหลังใหม่(กำลังก่อสร้าง)พร้อม ๆ กันเถอะนะ!</div>

        </Row>

      </Row>
       
        
        {/* <Row>เริ่มเล่น เริ่มเขียน เริ่มสร้าง เริ่มต้นใหม่ที่ Comuthor</Row> */}
        {/* <Row>Patch?</Row> */}

        {/* <Row>All Feature</Row>
        <Row>
          <Row>Next Patch</Row>
          <Row>
            <Col>
            <div>
            Roleplay
            </div>
            <div>
              <img src="icon_1.svg" height={200} width={200}></img>
            </div>
            </Col>
            <Col>Function</Col>
            <Col>Q/A</Col>
            <Col>member</Col>
          </Row> */}
        {/* </Row> */}
      </Container>
    </div>
  );
}
