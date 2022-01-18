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
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { map } from "@firebase/util";
import "../components/caroselPreview";
// import CaroselPreview from "../components/caroselPreview";
import { useDropzone } from "react-dropzone";

export default function CreateGroup() {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth();

  const [tags, setTags] = useState([]);
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
  const [genreString, setGenreString] = useState("");
  const [privacy, setPrivacy] = useState("");

  const CaroselPreview = () => {
    const [images, setImages] = useState([]);
    const [imageurls, setImageurls] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (images.length < 1) return;
      const newImageurls = [];
      images.forEach((image) => newImageurls.push(URL.createObjectURL(image)));
      setImageurls(newImageurls);
    }, [images]);

    function onImageChange(e) {
      setImages([...e.target.files]);
    }

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    function removeImage(indexToRemove) {
      setImageurls([...tags.filter((_, index) => index !== indexToRemove)]);
    }

    return (
      <div>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className={style.carouselBackground}
        >
          {imageurls.map((imageSrc, index) => (
            <Carousel.Item key={index} className={style.carouselImage}>
              <Image src={imageSrc} width={150} height={150} />
            </Carousel.Item>
          ))}
        </Carousel>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageChange}
        ></input>
      </div>
    );
  };

  const Dropzone = () => {
    const { getRootProps, getInputProps } = useDropzone({});
    return (
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>drop image here</p>
        </div>
      </div>
    );
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");


    // const docRef = await addDoc(collection(db, "group"), {
    //   Name: communame,
    //   Creator: auth.currentUser.uid,
    //   Type: privacy,
    //   description: description, 
    //   maxplayer: maxplayer,
    //   runtime: runtime,
    //   genre: genreString.split(","),
    //   smlink: smlink,
    //   doclink: doclink,
    //   qaasklink: qaasklink,
    //   qaanslink: qaanslink,
    //   submitlink: submitlink,
    //   resultlink: resultlink,
    //   contactlink: contactlink,
    //   regDate: regDate,
    //   endDate: endDate,
    //   createAt: serverTimestamp(),
    // });
    // console.log(docRef.id);
    // setHashtagString("");
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
    setGenreString("");
    setPrivacy("");
  };

  const Hashtag = (props) => {
    const removeTags = (indexToRemove) => {
      setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = (event) => {
      if (event.target.value !== "") {
        setTags([...tags, event.target.value]);
        props.selectedTags([...tags, event.target.value]);
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
              onKeyUp={(event) =>
                event.key === "Enter" ? addTags(event) : null
              }
              placeholder="กด Enter เพื่อกำหนดแท็ค"
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
          <Col md={2}></Col>
          <Col md={8}>
            <Container>
              <form onSubmit={HandleSubmit}>
                <Row>
                  <Col>
                    <label>
                      <h4 className={style.label}>Hashtag</h4>
                    </label>
                  </Col>
                  <Col md={12}>
                    {/* <Hashtag selectedTags={selectedTags} /> */}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>
                      <h4 className={style.label}>ชื่อคอมมู</h4>
                      <input
                        type="text"
                        value={communame}
                        onChange={(e) => {
                          setCommuname(e.target.value);
                        }}
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
                        type="text"
                        value={maxplayer}
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
                        type="date"
                        value={regDate}
                        onChange={(e) => {
                          setRegDate(e.target.value);
                        }}
                      ></input>
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <h4 className={style.label}>วันที่สิ้นสุด</h4>
                      <input
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
                  <input
                    type="text"
                    value={genreString}
                    onChange={(e) => {
                      setGenreString(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงค์กลุ่มคอมมู</h4>
                  </label>
                  <input
                    type="url"
                    value={smlink}
                    onChange={(e) => {
                      setSmlink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงค์ดอค</h4>
                  </label>
                  <input
                    type="url"
                    value={doclink}
                    onChange={(e) => {
                      setDoclink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงค์ถามคำถาม</h4>
                  </label>
                  <input
                    type="url"
                    value={qaasklink}
                    onChange={(e) => {
                      setQaasklink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงค์ตอบคำถาม</h4>
                  </label>
                  <input
                    type="url"
                    value={qaanslink}
                    onChange={(e) => {
                      setQaanslink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงค์ส่งฟอร์มวิ่ง</h4>
                  </label>
                  <input
                    type="url"
                    value={submitlink}
                    onChange={(e) => {
                      setSubmitlink(e.target.value);
                    }}
                  ></input>
                </Row>
                <Row md={12}>
                  <label>
                    <h4 className={style.label}>ลิงค์ตรวจผล</h4>
                  </label>
                  <input
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
                    type="url"
                    value={contactlink}
                    onChange={(e) => {
                      setContactlink(e.target.value);
                    }}
                  ></input>
                </Row>

                <button type="submit">สร้างคอมมู</button>
              </form>
            </Container>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </div>
  );
}
