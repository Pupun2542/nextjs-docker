import { getApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../src/config/firebase.config";
import { Uploadprofileimg } from "../src/services/filestoreageservice";
import Image from "next/image";
import CustomNavbar from "../components/navbar";
import { Col, Container, Navbar, Row, SSRProvider } from "react-bootstrap";
import style from "../styles/profile.module.css";
import { BsPencilSquare } from "react-icons/bs";

export default function Profile() {
  const app = getApp();
  const auth = getAuth(app);

  const Router = useRouter();

  const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userEdit, setUserEdit] = useState(true);
    const [gallory, setGallory] = useState(true);
    const [name, setname] = useState("");
    if (loading) {
      return (
        <SSRProvider>
          <CustomNavbar />
        </SSRProvider>
      );
    }
    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
        </div>
      );
    }

    if (user) {
      
      // setname(user.displayName);
      try {
        user.photoURL;
      } catch (error) {
        updateProfile(user, {
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/profileimg%2Fistockphoto-1223671392-612x612.jpg?alt=media&token=2e2848e9-864f-48db-a20b-0d62022f02c6",
        });
      }
      const handleUpload = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        Uploadprofileimg(file, user.uid);
      };
      console.log(user.photoURL);

      const handleNameChange = (e) => {
        
        updateProfile(user, { displayName: e.target.value })
        .then(() => {
          console.log("change user name to ", user.displayName);
        })
        .catch((e) => {
          console.log(e);
        });
        setUserEdit(true);
      };

      return (
        <div className={style.background}>
          <SSRProvider>
            <CustomNavbar />
            <Container>
              <Row className={style.header}></Row>
              <Row className={style.profile}>
                <Col md={2}>
                  <Image
                    src={user.photoURL}
                    alt="profile picture"
                    width={150}
                    height={150}
                    className={style.profileimg}
                  ></Image>
                </Col>
                <Col md={6}>
                  {userEdit ? (
                    <div className={style.username}>
                      <h2 style={{ float: "left" }}>{user.displayName}</h2>
                      <a
                        href="#"
                        onClick={() => {
                          setUserEdit(false);
                        }}
                        className={style.a}
                      >
                        <BsPencilSquare />
                      </a>
                    </div>
                  ) : (
                    <input
                      type="text"
                      defaultValue={user.displayName}
                      onKeyUp={(e) =>
                        e.key === "Enter"
                          ? handleNameChange(e)
                          : null
                      }
                    />
                  )}
                </Col>
                <Col md={3}></Col>
              </Row>
              <Row className={style.profilenavbar}>
                <Col>
                  <a
                    href="#"
                    className={style.a}
                    onClick={() => {
                      setGallory(true);
                    }}
                  >
                    <h4 className={style.profilenavbartext}>แกลลอรี่</h4>
                  </a>
                </Col>
                <Col>
                  <a
                    href="#"
                    className={style.a}
                    onClick={() => {
                      setGallory(false);
                    }}
                  >
                    <h4 className={style.profilenavbartext}>ชั้นหนังสือ</h4>
                  </a>
                </Col>
              </Row>
              <Row className={style.mainPanel}>
                <Col md={5} xs={10} sm={10} className={style.alubum}>
                  <Row className={style.alubumHead}>
                    <h4 className={style.profilenavbartext}>อัลบั้ม</h4>
                  </Row>
                  <Row>
                    <Row className={style.alubumContent}>
                      <h6>อัลบั้มสุดสวย</h6>
                      <div className={style.imagethumbnail} />
                      <div className={style.imagethumbnail} />
                      <div className={style.imagethumbnail} />
                      <div className={style.imagethumbnail} />
                    </Row>
                    <Row className={style.alubumContent}>
                      <h6>อัลบั้มสุดหล่อ</h6>
                      <div className={style.imagethumbnail} />
                      <div className={style.imagethumbnail} />
                      <div className={style.imagethumbnail} />
                      <div className={style.imagethumbnail} />
                    </Row>
                  </Row>
                </Col>
                <Col md={5} xs={10} sm={10} className={style.Character}>
                  <Row className={style.alubumHead}>
                    <h4 className={style.profilenavbartext}>ตัวละคร</h4>
                  </Row>
                  <Row className={style.CharacterList}>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                    <Col>
                      <div className={style.characterContent} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </SSRProvider>
        </div>
      );
    }
    return Router.push("/login");
  };

  return CurrentUser();
}

// function gallory(){
//   return(
//     <div>

//     </div>
//   );
// }
