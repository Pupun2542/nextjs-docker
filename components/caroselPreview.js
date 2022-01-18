import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-bootstrap";
import style from "../styles/caroselPreview.module.css"

export default function CaroselPreview() {
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

  function removeImage(indexToRemove){
    setImageurls([...tags.filter((_, index) => index !== indexToRemove)]);
  }

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} className={style.carouselBackground}>
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
}
// function ControlledCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=First slide&bg=373940"
//           alt="First slide"
//         />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=Second slide&bg=282c34"
//           alt="Second slide"
//         />

//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=Third slide&bg=20232a"
//           alt="Third slide"
//         />

//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }
