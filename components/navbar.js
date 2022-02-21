import React, {useState} from "react";
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
          <Image
            src={user.photoURL}
            alt="profile picture"
            width={40}
            height={40}
            className={style.Thumbnailimg}
          ></Image>
          <NavDropdown
            title={
              <span className={style.ThumbnailTextStyle}>
                {user.displayName}
              </span>
            }
            id="basic-nav-dropdown"
            menuVariant="dark"
            className={style.dropdown}
          >
            {/* <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider /> */}
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
          {/* <Nav.Link href="/">
              <span className={style.NavTextColor}>Home</span>
            </Nav.Link> */}
          {/*             <img src="../public/favicon.ico" height={50} width={50} onClick={()=>router.push("/")} className={style.icon}></img>
 */}            {/* <Nav.Link href="/creategroup">
              <span className={style.NavTextColor}>Create Commu</span>
            </Nav.Link> */}
            {/* <img src="Group1616.png" height={50} width={50} onClick={() => router.push("/group")} className={style.icon}></img> */}
          <NavDropdown 
            title={
                <img src="Group1616.png" height={50} width={50} onClick={()=>router.push("/group")} className={style.icon}></img >
            }
            onMouseEnter={(e)=>setShowgroup(true)}
            onMouseLeave={(e)=>setShowgroup(false)}
            show={showgroup}
          >
            <NavDropdown.Item href="/creategroup">
              <a href="/creategroup">
                <img src="CreateCommu1616.png" height={50} width={50}></img>
              </a>
            </NavDropdown.Item>
          </NavDropdown>

 
          
          <img src="Contact1616.png" height={50} width={50} onClick={() => router.push("/about")} className={style.icon2}></img>
          {/* <Nav.Link href="/group">
              <span className={style.NavTextColor}>Browse Group</span>
            </Nav.Link> */}
          {/* <Nav.Link href="/about">
              <span className={style.NavTextColor}>About us</span>
            </Nav.Link> */}
        </Nav>
        <div className="d-flex">
          <Loadthumbnail />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
