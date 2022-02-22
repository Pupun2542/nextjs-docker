import React from "react";
import CustomNavbar from "../components/navbar";
import style from "../styles/creategroup.module.css";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "../components/Banner";
// import CaroselPreview from "../components/caroselPreview";
import { useDropzone } from "react-dropzone";
import { useApp } from "../src/hook/local";
import { UpdateUserGroup } from "../src/services/firestoreservice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import UploadImageModal from "../components/Banner";
import { UploadBannerImage } from "../src/services/filestoreageservice";
import { getBlob } from "firebase/storage";
// import { Blob } from "node:buffer";

export default function CreateGroup() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const Router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login");
    }
  }, [user, loading]);

  const getplaceholder = async () => {
    const blob = await getBlob("group/banner/UploadBanner.jpg");
    return blob;
  };

  const [tags, setTags] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [communame, setCommuname] = useState("");
  const [maxplayer, setMaxplayer] = useState("");
  const [regDate, setRegDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [smlink, setSmlink] = useState("");
  const [doclink, setDoclink] = useState("");
  const [qaasklink, setQaasklink] = useState("");
  const [qaanslink, setQaanslink] = useState("");
  const [submitlink, setSubmitlink] = useState("");
  const [resultlink, setResultlink] = useState("");
  const [contactlink, setContactlink] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [bannerBlob, setBannerBlob] = useState();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "group"), {
      Name: communame,
      Creator: auth.currentUser.uid,
      Type: privacy,
      tag: hashtag,
      description: description,
      maxplayer: maxplayer,
      runtime: runtime,
      genre: tags,
      smlink: smlink,
      doclink: doclink,
      qaasklink: qaasklink,
      qaanslink: qaanslink,
      submitlink: submitlink,
      resultlink: resultlink,
      contactlink: contactlink,
      regDate: regDate,
      endDate: endDate,
      banner: bannerBlob,
      createAt: serverTimestamp(),
    });
    // console.log(docRef.id);
    // UpdateUserGroup(auth.currentUser.uid, docRef.id);
    // const bannerurl = await UploadBannerImage(bannerBlob, docRef.id + ".jpg");
    // console.log(bannerurl);
    // updateDoc(doc(db, "group", docRef.id), {
    //   banner: bannerurl,
    // });

    // console.log(docRef.id);
    setTags([]);
    setCommuname("");
    setMaxplayer("");
    setRegDate("");
    setRuntime("");
    setEndDate("");
    setSmlink("");
    setDescription("");
    setDoclink("");
    setQaasklink("");
    setQaanslink("");
    setSubmitlink("");
    setResultlink("");
    setContactlink("");
    setPrivacy("");
    setBannerBlob("");
    Router.push("/group/" + docRef.id);
  };

  const Hashtag = (props) => {
    const removeTags = (indexToRemove) => {
      setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = (event) => {
      let tag = event.target.value.replace(",", "");
      tag = tag.trim();
      if (tag !== "") {
        setTags([...tags, tag]);
        props.selectedTags([...tags, tag]);
        event.target.value = "";
      }
    };
    return (
      <div className={style.tagsInput}>
        <div>
          <div id="tags">
            {tags.map((tag, index) => (
              <li key={index} className={style.tag}>
                <span className={style.tagTitle}>{tag}</span>
                <span
                  className={style.tagCloseIcon}
                  onClick={() => removeTags(index)}
                >
                  x
                </span>
              </li>
            ))}
            <input
              type="text"
              onKeyUp={(event) => (event.key === "," ? addTags(event) : null)}
              placeholder=" ใช้ , เพื่อแบ่งประเภท"
              className={style.input}
            />
          </div>
        </div>
      </div>
    );
  };
  const selectedTags = (tags) => {
    console.log(tags);
  };

  return (
    <div className={style.background}>
      <CustomNavbar />
      <Container className={style.frombackground}>
        {/* <CaroselPreview /> */}
        <Row>
          <Col md={0}></Col>
          <Col md={10}>
            <Container>
              <div>
                <Row>
                  <UploadImageModal
                    setBannerBlob={setBannerBlob}
                    BannerBlob={bannerBlob}
                  />
                </Row>
                <Row>
                  <Col>
                    <label>
                      <h4 className={style.label}>
                        ชื่อย่อคอมมู ไม่เกิน 4 ตัวอักษร
                      </h4>
                    </label>
                    <input
                      className={style.setDescription}
                      type="text"
                      value={hashtag}
                      onChange={(e) => {
                        setHashtag(e.target.value);
                      }}
                      required
                      maxLength="4"
                    />
                  </Col>
                  <Col md={12}></Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>
                      <h4 className={style.label}>ชื่อคอมมู</h4>
                      <input
                        className={style.setDescription}
                        type="text"
                        value={communame}
                        onChange={(e) => {
                          setCommuname(e.target.value);
                        }}
                        required
                      ></input>
                    </label>
                  </Col>
                  <Col md={6}>
                    <input
                      type="radio"
                      value="Private"
                      name="Privacy"
                      onChange={(e) => {
                        setPrivacy(e.target.value);
                      }}
                    ></input>
                    <label>
                      <h6 className={style.radio}>ส่วนตัว</h6>
                    </label>

                    <input
                      type="radio"
                      value="Public"
                      name="Privacy"
                      onChange={(e) => {
                        setPrivacy(e.target.value);
                      }}
                      checked
                    ></input>
                    <label>
                      <h6 className={style.radio}>สาธารณะ</h6>
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>
                      <h4 className={style.label}>จำนวนรับ</h4>
                      <input
                        className={style.setDescription}
                        type="number"
                        value={maxplayer}
                        name="Maxplayer"
                        onChange={(e) => {
                          setMaxplayer(e.target.value);
                        }}
                      ></input>
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <h4 className={style.label}>ระยะเวลา</h4>
                      <input
                        className={style.setDescription}
                        type="text"
                        value={runtime}
                        onChange={(e) => {
                          setRuntime(e.target.value);
                        }}
                      ></input>
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>
                      <h4 className={style.label}>วันวิ่ง</h4>
                      <input
                        className={style.setDescription}
                        type="date"
                        value={regDate}
                        onChange={(e) => {
                          setRegDate(e.target.value);
                        }}
                        required
                      ></input>
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <h4 className={style.label}>วันที่สิ้นสุด</h4>
                      <input
                        className={style.setDescription}
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      ></input>
                    </label>
                  </Col>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>คำอธิบาย</h4>
                  </label>
                  <textarea
                    className={style.setDescription}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>
                      ประเภทของคอมมู (ใช้ , ในการแบ่งคำ)
                    </h4>
                  </label>
                  <Hashtag selectedTags={selectedTags} />
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงก์กลุ่มคอมมู</h4>
                  </label>
                  <input
                    className={style.setDescription}
                    type="url"
                    value={smlink}
                    onChange={(e) => {
                      setSmlink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงก์ข้อมูลคอมมู</h4>
                  </label>
                  <input
                    className={style.setDescription}
                    type="url"
                    value={doclink}
                    onChange={(e) => {
                      setDoclink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงก์ลงทะเบียนตัวละคร</h4>
                  </label>
                  <input
                    className={style.setDescription}
                    type="url"
                    value={qaasklink}
                    onChange={(e) => {
                      setQaasklink(e.target.value);
                    }}
                  ></input>
                </Row>
                {/* <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงก์ตอบคำถาม</h4>
                  </label>
                  <input className={style.setDescription}
                    type="url"
                    value={qaanslink}
                    onChange={(e) => {
                      setQaanslink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงก์ส่งฟอร์มวิ่ง</h4>
                  </label>
                  <input className={style.setDescription}
                    type="url"
                    value={submitlink}
                    onChange={(e) => {
                      setSubmitlink(e.target.value);
                    }}
                  ></input>
                </Row> */}
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงก์ตรวจสอบผลการสมัคร</h4>
                  </label>
                  <input
                    className={style.setDescription}
                    type="url"
                    value={resultlink}
                    onChange={(e) => {
                      setResultlink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ช่องทางติดต่อ</h4>
                  </label>
                  <input
                    className={style.setDescription}
                    type="url"
                    value={contactlink}
                    onChange={(e) => {
                      setContactlink(e.target.value);
                    }}
                    required
                  ></input>
                </Row>

                <button className={style.button} onClick={HandleSubmit}>
                  สร้างคอมมู
                </button>
              </div>
            </Container>
          </Col>
          <Col md={0}></Col>
        </Row>
      </Container>
    </div>
  );
}
