import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../../src/hook/local";
import { Box, Flex, Image } from "@chakra-ui/react";

const Gallery = ({ gid }) => {
  const { auth } = useApp();
  const [gallery, setGallery] = useState([]);
  console.log(gallery);
  useEffect(() => {
    const fetchGallery = async () => {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/media`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setGallery(res.data);
      }
    };
    fetchGallery();
  }, [gid]);

  return (
    <Flex flexWrap={"wrap"}>
      {gallery.length > 0 &&
        gallery.map((img) => (
          <Box width={192} height={192} marginBottom={5}>
            <Image src={img.url} width={192} height={192} objectFit={"contain"} />
          </Box>
        ))}
    </Flex>
  );
};

export default Gallery;
