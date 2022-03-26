import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import style from "../styles/banner.module.css";
import Dropzone from "react-dropzone";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";

export default function UploadImageModal({ setBannerBlob, BannerBlob }) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(BannerBlob);
  const [cropmodal, setCropmodal] = useState(false);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      maxFiles: 1,
      maxSize: 1048486,
    });

  if (fileRejections.length > 0) {
    alert("ไม่สามารถอัพโหลดไฟล์ได้");
    fileRejections.pop();
  }
  useEffect(() => {
    setImage(BannerBlob);
  }, [BannerBlob]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage(reader.result);
          }
        };
        reader.readAsDataURL(file);
      });

      setShow(false);
      setCropmodal(true);
      // imageCropper();
    }
  }, [acceptedFiles]);

  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
    const cropped = cropper.getCroppedCanvas().toDataURL();
    setImage(cropped);
    setCropmodal(false);

    setBannerBlob(cropped);
  };
  console.log(image);
  return (
    <div>
      <div>
        <img
          src={
            image
              ? image
              : "https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/group%2Fbanner%2FUploadBanner.jpg?alt=media&token=aad81eb7-7a07-4e8d-98aa-faa551116946"
          }
          width={928}
          height={522}
          className={style.bannerPlaceholder}
          onClick={() => {
            setShow(true);
          }}
        ></img>
      </div>

      <Modal
        show={show}
        fullscreen={true}
        onHide={() => {
          setShow(false);
          fileRejections.pop();
          acceptedFiles.pop();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className={style.dropareaContainer}>
            <div {...getRootProps()} className={style.dragdropArea}>
              <input {...getInputProps()} />
              <div className={style.dragdropArea}>
                <h2>Drop image file here</h2>
                <h4>ขนาดไม่เกิน 1MB</h4>
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>{/* <Button>Close</Button> */}</Modal.Footer>
      </Modal>

      <Modal
        show={cropmodal}
        fullscreen={true}
        onHide={() => setCropmodal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            aspectRatio={16 / 9}
            guides={false}
            // crop={onCrop}
            ref={cropperRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCrop}>ยืนยัน</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
