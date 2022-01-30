import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import style from "../styles/banner.module.css";
import Dropzone from "react-dropzone";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";

export default function UploadImageModal({setBannerBlob, BannerBlob}) {

  const [show, setShow] = useState(false);
  const [image, setImage] = useState(BannerBlob);
  const [cropmodal, setCropmodal] = useState(false);
  const [previewmodal, setpreviewmodal] = useState(false);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      maxFiles: 1,
    });

  if (fileRejections.length > 0) {
    fileRejections.map(({ file, errors }) => {
      alert(
        "ไม่สามารถอัพโหลดไฟล์ " +
          file.name +
          " เนื่องจาก " +
          errors.map((e) => e.message)
      );
    });
  }
  useEffect(()=>{
    setImage(BannerBlob);
  },[BannerBlob])
  


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
      setImage(cropper.getCroppedCanvas().toDataURL())
      setCropmodal(false);
      setBannerBlob(cropper.getCroppedCanvas().toDataURL());
    };

  return (
    <div>
      <div>
        <img
          src={image}
          width={640}
          height={360}
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
              <div className={style.dragdropArea}>Drop file here</div>
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
          <Modal.Footer><Button onClick={onCrop}>ยืนยัน</Button></Modal.Footer>
        </Modal>
    </div>
  );
}
