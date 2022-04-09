import React, { useEffect, useRef, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import style from "../styles/banner.module.css";
import Dropzone from "react-dropzone";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
  Button,
  useDisclosure
} from "@chakra-ui/react";

export default function UploadImageModal({ setBannerBlob, BannerBlob }) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(BannerBlob);
  const [cropmodal, setCropmodal] = useState(false);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      maxFiles: 1,
      maxSize: 4194304,
    });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCropOpen, onOpen: onCropOpen, onClose: onCropClose } = useDisclosure();

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

      onClose();
      onCropOpen();
      // imageCropper();
    }
  }, [acceptedFiles]);

  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
    const cropped = cropper.getCroppedCanvas().toDataURL();
    console.log(cropped);
    setImage(cropped);
    onCropClose();

    setBannerBlob(cropped);
  };
  // console.log(image);
  return (
    <Box>
      <Box>
        <Image
          src={
            image
              ? image
              : "https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2Fimageplaceholder.png?alt=media&token=e3a54ee9-8d20-4471-8f4f-7157ac972757"
          }
          width={928}
          height={522}
          className={style.bannerPlaceholder}
          onClick={onOpen}
        ></Image>
      </Box>

      <Modal
        isOpen={isOpen} 
        onClose={()=>{
          onClose();
          fileRejections.pop();
          acceptedFiles.pop();
        }} 
        size='xl'
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
          Upload Image
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
          <section className={style.dropareaContainer}>
            <div {...getRootProps()} className={style.dragdropArea}>
              <input {...getInputProps()} />
              <div className={style.dragdropArea}>
                <h2>Drop image file here</h2>
                <h4>ขนาดไม่เกิน 4MB</h4>
              </div>
            </div>
          </section>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isCropOpen} 
        onClose={()=>{
          onCropClose();
          fileRejections.pop();
          acceptedFiles.pop();
        }} 
        size='xl'
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
          Crop Image
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            aspectRatio={16 / 9}
            guides={false}
            // crop={onCrop}
            ref={cropperRef}
          />
          </ModalBody>
          <ModalFooter>
          <Button onClick={onCrop}>ยืนยัน</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
