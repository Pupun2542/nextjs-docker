import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import "../src/config/firebase.config";
import style from "../styles/navbar.module.css";
import { useRouter } from "next/router";

function CustomNavbar() {
  const app = getApp();
  const auth = getAuth(app);
  const router = useRouter();
  const [showgroup, setShowgroup] = useState(false);

  const Loadthumbnail = () => {
    const [user, loading, error] = useAuthState(auth);
    if (user) {
      return (
        <div className="ms auto">
          <NavDropdown
            title={
              <span className={style.ThumbnailTextStyle}>
                <Image
                  src={user.photoURL}
                  alt="profile picture"
                  width={40}
                  height={40}
                  className={style.Thumbnailimg}
                ></Image>
                {user.displayName}
              </span>
            }
            id="basic-nav-dropdown"
            menuVariant="dark"
            className={style.dropdown}
          >
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      );
    }
    if (loading) {
      return <div>loading user</div>;
    }
    return (
      <Button variant="primary" href="/login" className={style.bntlogin}>
        Login
      </Button>
    );
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="/" className={style.navmargin}>
        <span className={style.NavTextColor}>Comuthor</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown
            title={
              <img
                src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2FGroup1616.png?alt=media&token=a07238ec-3d03-4851-88d5-8642111506c0"
                height={50}
                width={50}
                className={style.icon}
              ></img>
            }
          >
            <NavDropdown.Item href="/creategroup">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2FCreateCommu1616.png?alt=media&token=516e1afb-5447-4c4a-82d3-6fbe6d51a310"
                height={50}
                width={50}
              ></img>
              {/* <p>สร้างคอมมู</p> */}
            </NavDropdown.Item>
            <NavDropdown.Item href="/group">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2FGroup1616.png?alt=media&token=a07238ec-3d03-4851-88d5-8642111506c0"
                height={50}
                width={50}
              ></img>
              {/* <p>ค้นหาคอมมู</p> */}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <div className="d-flex">
          <Loadthumbnail />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
