import React, { useRef } from "react";
import style from "../../styles/create.module.css";
import { useState, useEffect } from "react";
import "../Banner";
import { useApp } from "../../src/hook/local";
import UploadImageModal from "../Banner";
import { getStorage } from "firebase/storage";

import {
  Box,
  Button,
  Flex,
  Center,
  IconButton,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Input,
  Select,
  CloseButton,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Textarea,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
  Divider,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { Plus, Hash } from "phosphor-react";
import { Regisform } from "./regisform";
import { Checkform } from "./checkform";
import axios from "axios";
import { useRouter } from "next/router";
import { AddStaffForm } from "./addStaffForm";
import {
  compressImage,
  UploadBannerImage,
  UploadBannerSquareImage,
  UploadDoc,
} from "../../src/services/filestoreageservice";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import UniversalUploadModal from "../universalUploadModal";

export const Createcommuform = ({ data, uid, gid }) => {
  const { app, auth, db } = useApp();
  const store = getStorage(app);
  const Router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCropPicOpen,
    onOpen: onCropPicOpen,
    onClose: onCropPicClose,
  } = useDisclosure();
  const inputref = useRef(null);
  const [fieldvalue, setFieldvalue] = useState({
    tag: "",
    name: "",
    maxplayer: 0,
    runtime: "",
    description: "",
    SMlink: "",
    docfile: null,
    contactlink: "",
    startDate: "",
    startDateraw: "",
    rating: "G (เหมาะสำหรับทุกวัย)",
    rule: "",
    averageTime: "",
    averageTimeUnit: "",
    type: "",
    privacy: "public",
    registrationlink: [],
    statuschecklink: [],
    creator: uid,
    staff: [],
    bannersqr: "",
  });
  const [bannerBlob, setBannerBlob] = useState(null);
  const [genre, setGenre] = useState([]);
  const [places, setPlaces] = useState([]);
  const [times, setTimes] = useState([]);
  const [tws, settws] = useState([]);
  const [staffSearch, setStaffSearch] = useState([]);
  const [staffSearchString, setStaffSearchString] = useState("");
  const [staffSearchResult, setStaffSearchResult] = useState([]);
  const [configvalue, setConfigValue] = useState({
    durationsw: true,
    Averagesw: true,
    Locationsw: true,
    Timelinesw: true,
    Ratingsw: true,
    Triggersw: true,
    Rulesw: true,
  });
  const [sqrmodal, setSqrmodal] = useState(false);
  useEffect(() => {
    if (data) {
      setFieldvalue({
        tag: data.tag,
        name: data.name,
        maxplayer: data.maxplayer,
        runtime: data.runtime,
        description: data.description,
        SMlink: data.SMlink,
        startDateraw: data.startDateRaw,
        contactlink: data.contactlink,
        startDate: data.startDate,
        rating: data.rating,
        rule: data.rule,
        averageTime: data.averageTime,
        averageTimeUnit: data.averageTimeUnit,
        type: data.type,
        privacy: data.privacy,
        creator: data.creator,
        staff: data.staff,
        registrationlink: data.registrationlink,
        statuschecklink: data.statuschecklink,
        bannersqr: data.bannersqr,
      });
      if (data.config) {
        setConfigValue({
          durationsw: data.config.durationsw ? data.config.durationsw : true,
          Averagesw: data.config.durationsw ? data.config.Averagesw : true,
          Locationsw: data.config.durationsw ? data.config.Locationsw : true,
          Timelinesw: data.config.durationsw ? data.config.Timelinesw : true,
          Ratingsw: data.config.durationsw ? data.config.Ratingsw : true,
          Triggersw: data.config.durationsw ? data.config.Triggersw : true,
          Rulesw: data.config.durationsw ? data.config.Rulesw : true,
        });
      }
      setGenre(data.genre);
      setPlaces(data.place);
      setTimes(data.times);
      settws(data.tws);
      setBannerBlob(data.banner);
    }
  }, [data]);

  useEffect(() => {
    const search = async () => {
      const snap = await getDocs(
        query(
          collection(db, "userDetail"),
          where("displayName", ">=", staffSearchString),
          where("displayName", "<", staffSearchString + "\uf8ff")
        )
      );
      if (!snap.empty) {
        setStaffSearchResult(
          snap.docs.map((doc) => ({
            uid: doc.data().uid,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
          }))
        );
      }
    };
    if (staffSearchString.length > 2) {
      search();
    }
    return () => {
      setStaffSearchResult([]);
    };
  }, [staffSearchString]);

  const Hashtag = (props) => {
    const removeTags = (indexToRemove) => {
      props.setState([
        ...props.state.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const addTags = (event) => {
      let tag = event.target.value.replace(",", "");
      tag = tag.trim();
      if (tag !== "") {
        props.setState([...props.state, tag]);
        event.target.value = "";
      }
    };
    return (
      <Box w={"100%"} h={"auto"} float={"left"}>
        <Box>
          <Box id="tags" mt={1.5} mb={1.5}>
            {props.state.map((tag, index) => (
              <HStack
                key={index}
                bg={"#6768AB"}
                color="white"
                borderRadius={10}
                pt={1}
                pb={1}
                pl={2}
                pr={2}
                float="left"
                spacing={2.5}
                mr={0.5}
                ml={0.5}
                mt={0.5}
                mb={0.5}
                fontSize={16}
                w={"auto"}
              >
                <Box>{tag}</Box>
                <CloseButton
                  onClick={() => removeTags(index)}
                  rounded={"full"}
                  bg="white"
                  color={"black"}
                  h={5}
                  w={5}
                />
              </HStack>
            ))}
            <Input
              type="text"
              onKeyUp={(event) => (event.key === "," ? addTags(event) : null)}
              onBlur={addTags}
              placeholder=" ใช้ , เพื่อแบ่งประเภท"
              w={"auto"}
              isDisabled={props.isDisabled}
              // border="hidden"
              maxW={200}
              float="left"
              mr={0.5}
              ml={1}
              mb={2}
              mt={0.5}
              fontSize={16}
              h={31}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  const parseTime = (localtime) => {
    const spdatetime = localtime.split("T");

    const timebuild = spdatetime[0] + " เวลา " + spdatetime[1];
    return timebuild;
  };

  const parseRawTime = (localtime) => {
    const spdatetime = localtime.split("T");
    const spdate = spdatetime[0].split("/");
    const sptime = spdatetime[1].split(":");

    const timebuild = new Date();
    // timebuild.setDate(spdate[0]);
    // timebuild.setMonth(spdate[1]+1);
    timebuild.setFullYear(spdate[2], spdate[1] + 1, spdate[0]);
    timebuild.setHours(sptime[0], sptime[0]);
    return timebuild;
  };

  const handleSquareSelect = async (image) => {
    const compressed = await compressImage(image, 500);
    setFieldvalue({
      ...fieldvalue,
      bannersqr: compressed,
    });
  };

  const closeImageModal = () => {
    setFieldvalue({
      ...fieldvalue,
      bannersqr: "",
    });
    onCropPicClose()
  };
  const submitImageModal = () => {
    onCropPicClose()
  };

  const HandleSubmit = async () => {
    let bannerUrl = data?.banner ? data.banner : "";
    let sqrUrl = data?.bannersqr || "";
    let docUrl = data?.doclink ? data.doclink : "";
    const token = await auth.currentUser.getIdToken();
    const groupId = gid || doc(collection(db, "group")).id;

    if (bannerBlob && !bannerBlob.startsWith("http")) {
      bannerUrl = await UploadBannerImage(bannerBlob, auth.currentUser.uid, groupId);
    } else {
      bannerUrl = bannerBlob;
    }

    if (fieldvalue.bannersqr && !fieldvalue.bannersqr.startsWith("http")) {
      sqrUrl = await UploadBannerSquareImage(fieldvalue.bannersqr, auth.currentUser.uid, groupId);
    } else {
      sqrUrl = bannerBlob;
    }

    if (fieldvalue.docfile) {
      if (fieldvalue.docfile.name.split(".").pop() == "pdf") {
        docUrl = await UploadDoc(fieldvalue.docfile, auth.currentUser.uid);
      } else {
        alert("เอกสารคอมมูต้องเป็นรูปแบบไฟล์ pdf เท่านั้น");
        return;
      }
    }
    const body = {
      ...fieldvalue,
      genre: genre,
      places: places,
      times: times,
      tws: tws,
      bannerUrl: bannerUrl,
      docUrl: docUrl,
      sqrUrl: sqrUrl,
      config: configvalue,
    };

    if (data) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${groupId}/update`,
        body,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        Router.push(`/group/${gid}`);
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${groupId}/create`,
        body,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        Router.push(`/group/${groupId}`);
      }
    }
  };

  const addRegisLink = () => {
    setFieldvalue({
      ...fieldvalue,
      registrationlink: [
        ...fieldvalue.registrationlink,
        {
          name: "",
          fromdate: "",
          todate: "",
          link: "",
        },
      ],
    });
  };

  const deleteRegisLink = (index) => {
    const newState = fieldvalue.registrationlink.filter((v, i) => index !== i);
    setFieldvalue({ ...fieldvalue, registrationlink: newState });
  };

  const setRegisLink = (index, data) => {
    const newState = fieldvalue.registrationlink.map((v, i) =>
      i == index ? data : v
    );
    setFieldvalue({ ...fieldvalue, registrationlink: newState });
  };
  const addCheckLink = () => {
    setFieldvalue({
      ...fieldvalue,
      statuschecklink: [
        ...fieldvalue.statuschecklink,
        {
          name: "",
          fromdate: "",
          todate: "",
          link: "",
        },
      ],
    });
  };

  const deleteCheckLink = (index) => {
    const newState = fieldvalue.statuschecklink.filter((v, i) => index !== i);
    setFieldvalue({ ...fieldvalue, statuschecklink: newState });
  };

  const setCheckLink = (index, data) => {
    const newState = fieldvalue.statuschecklink.map((v, i) =>
      i == index ? data : v
    );
    setFieldvalue({ ...fieldvalue, statuschecklink: newState });
  };

  const addStaff = (dat) => {
    if (
      dat.uid != auth.currentUser.uid &&
      !fieldvalue.staff.includes(dat.uid)
    ) {
      setStaffSearch([...staffSearch, dat]);
      setFieldvalue({
        ...fieldvalue,
        staff: [...fieldvalue.staff, dat.uid],
      });
      setStaffSearchResult([]);
      setStaffSearchString("");
    } else {
      alert("มีชื่ออยู่แล้ว");
    }
  };

  const deleteStaff = (index) => {
    const newState = fieldvalue.staff.filter((v, i) => index !== i);
    setFieldvalue({ ...fieldvalue, staff: newState });
    setStaffSearch(newState);
  };

  const setStaff = (index, data) => {
    const newState = fieldvalue.statuschecklink.map((v, i) =>
      i == index ? data : v
    );
    setFieldvalue({ ...fieldvalue, statuschecklink: newState });
  };

  return (
    <Flex justifyContent={"center"} bg={"#F3F5F8"}>
      <Center
        fontFamily={"Sarabun"}
        bg={"white"}
        maxW={1000}
        width={"100%"}
        boxShadow={"base"}
      >
        <Box maxW={875} width={"100%"} boxShadow={"base"}>
          <Box w={"100%"} bg={"#6768AB"} h={50}></Box>
          <Center>
            <Flex>
              <UploadImageModal
                setBannerBlob={setBannerBlob}
                BannerBlob={bannerBlob}
              />
            </Flex>
          </Center>

          <Center
            fontSize={24}
            bg={"#6768AB"}
            p={2}
            borderTopRadius={10}
            color={"white"}
          >
            <Flex>
              <Center
                //จะเป็น Real-Time จากช่องพิมพ์ชื่อย่อคอมมู
                p={2}
              >
                {fieldvalue.tag ? "[" + fieldvalue.tag + "]" : "[____]"}
              </Center>
              <Center
              //จะเป็น Real-Time จากช่องพิมพ์ชื่อคอมมู
              >
                {fieldvalue.name ? fieldvalue.name : "ชื่อคอมมูนิตี้"}
              </Center>
            </Flex>
          </Center>

          <Accordion allowMultiple bg={"#F3F5F8"}>
            <AccordionItem w={"100%"}>
              <h2>
                <AccordionButton>
                  <AccordionIcon color={"Black"} w={50} h={50} />

                  <Box fontFamily={"SarabunSB"} fontSize={27} color="Black">
                    Basic Information
                  </Box>
                </AccordionButton>
              </h2>

              <AccordionPanel color={"white"}>
                <VStack fontSize={16} color={"black"}>
                  {/* Community Name */}
                  <Flex w={"100%"}>
                    <Center w={50}></Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ชื่อคอมมูนิตี้</Text>
                          <Text color={"red"} float="left">
                            *
                          </Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
                        <Input
                          type="text"
                          value={fieldvalue.name}
                          onChange={(e) => {
                            setFieldvalue({
                              ...fieldvalue,
                              name: e.target.value,
                            });
                            // setCommuname(e.target.value);
                          }}
                          required
                          w={"100%"}
                          h={46}
                          bg={"white"}
                          placeholder={"..."}
                          fontSize={18}
                        />
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* ชื่อย่อคอมมู ความเป็นส่วนตัว */}
                  <Flex w={"100%"}>
                    <Center w={50}></Center>
                    <Flex
                      w={"50%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ชื่อย่อคอมมู</Text>
                          <Text color={"red"} float="left">
                            *
                          </Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
                        <Input
                          type="text"
                          value={fieldvalue.tag}
                          onChange={(e) => {
                            setFieldvalue({
                              ...fieldvalue,
                              tag: e.target.value,
                            });
                            // setHashtag(e.target.value);
                          }}
                          required
                          maxLength={6}
                          w={"100%"}
                          h={46}
                          bg={"white"}
                          placeholder={"ไม่เกิน 6 ตัวอักษร"}
                        />
                      </Center>
                    </Flex>

                    <Spacer minW={2} />

                    <Flex
                      w={"50%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ความเป็นส่วนตัว</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
                        <Select
                          isRequired
                          w={"100%"}
                          h={46}
                          bg={"white"}
                          color="black"
                          size="lg"
                          defaultValue={"public"}
                          value={
                            fieldvalue.privacy
                              ? fieldvalue.privacy
                              : "G (เหมาะสำหรับทุกวัย)"
                          }
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              privacy: e.target.value,
                            })
                          }
                        >
                          <option
                            style={{ backgroundColor: "White" }}
                            value={"public"}
                          >
                            สาธารณะ
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value={"private"}
                          >
                            ส่วนตัว
                          </option>
                        </Select>
                      </Center>
                    </Flex>

                    <Center w={50}></Center>
                  </Flex>

                  {/* ประเภท */}

                  <Flex w={"100%"}>
                    <Center w={50}></Center>
                    <Flex
                      w={"50%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">จำนวนผู้เล่น</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
                        <NumberInput
                          w={"100%"}
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              maxplayer: e,
                            })
                          }
                          min={0}
                          value={fieldvalue.maxplayer}
                        >
                          <NumberInputField
                            bg={"white"}
                            h={46}
                            color={"black"}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper color="black" />
                            <NumberDecrementStepper color="black" />
                          </NumberInputStepper>
                        </NumberInput>
                      </Center>
                    </Flex>

                    <Spacer minW={2} />

                    <Flex
                      w={"50%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ประเภท</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
                        <Select
                          isRequired
                          w={"100%"}
                          h={46}
                          bg={"white"}
                          color="black"
                          size="lg"
                          value={fieldvalue.type}
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              type: e.target.value,
                            })
                          }
                          defaultValue={"Slow-Life"}
                        >
                          <option
                            style={{ backgroundColor: "White" }}
                            value={"Slow-Life"}
                          >
                            Slow-Life
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value={"Vote for kill"}
                          >
                            Vote for kill
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value={"Survival"}
                          >
                            Survival
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value={"Slow-Survival"}
                          >
                            Slow-Survival
                          </option>
                        </Select>
                      </Center>
                    </Flex>

                    <Center w={50}></Center>
                  </Flex>

                  {/* หมวดหมู่ */}
                  <Flex w={"100%"}>
                    <Center w={50}></Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">หมวดหมู่</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} height="auto" position="relative">
                        <Box
                          pl={1.5}
                          pr={1.5}
                          w={"100%"}
                          h="auto"
                          minH={46}
                          bg={"white"}
                          borderRadius={10}
                        >
                          <Hashtag
                            // selectedTags={selectedTags}
                            state={genre}
                            setState={setGenre}
                          />
                        </Box>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* วันที่เริ่มเล่น */}
                  <Flex w={"100%"}>
                    <Center w={50}>
                      <Switch
                        bg={"gray.500"}
                        borderRadius={10}
                        isChecked={configvalue.durationsw}
                        onChange={() =>
                          setConfigValue({
                            ...configvalue,
                            durationsw: !configvalue.durationsw,
                          })
                        }
                      />
                    </Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">วันที่เริ่มเล่น</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
                        <Center w={"100%"}>
                          <Input
                            type="datetime-local"
                            isDisabled={!configvalue.durationsw} //แล้วก็เพิ่มตรงนี้ ชื่อตัวแปรตาม state ที่สร้าง
                            isRequired
                            h={46}
                            bg={"white"}
                            color="black"
                            w={"100%"}
                            value={fieldvalue.startDateraw}
                            onChange={(e) => {
                              const ptime = parseTime(e.target.value);
                              setFieldvalue({
                                ...fieldvalue,
                                startDate: ptime,
                                startDateraw: e.target.value,
                              });
                            }}
                          />
                        </Center>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* ระยะเวลาโดยประมาณ */}
                  <Flex w={"100%"}>
                    <Center w={50}>
                      <Switch
                        bg={"gray.500"}
                        borderRadius={10}
                        isChecked={configvalue.Averagesw}
                        onChange={() =>
                          setConfigValue({
                            ...configvalue,
                            Averagesw: !configvalue.Averagesw,
                          })
                        }
                      />
                    </Center>

                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text fontSize={16} float="left">
                            ระยะเวลา
                          </Text>
                        </Box>
                      </Box>

                      <Center w={"55%"} position="relative">
                        <Center w={"100%"}>
                          <Input
                            bg="white"
                            m={1.5}
                            borderRadius={10}
                            w={"100%"}
                            h={46}
                            color={"Black"}
                            isDisabled={!configvalue.Averagesw}
                            value={fieldvalue.averageTime}
                            onChange={
                              (e) =>
                                setFieldvalue({
                                  ...fieldvalue,
                                  averageTime: e.target.value,
                                })
                              // setAvergeTime(e.target.value)
                            }
                          />
                        </Center>
                      </Center>

                      <Center
                        pl={1.5}
                        pr={1.5}
                        borderLeftColor={"#C4C4C4"}
                        borderLeftWidth={3}
                      >
                        <Select
                          isRequired
                          h={46}
                          bg={"white"}
                          color="black"
                          size="lg"
                          isDisabled={!configvalue.Averagesw}
                          value={fieldvalue.averageTimeUnit}
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              averageTimeUnit: e.target.value,
                            })
                          }
                        >
                          <option style={{ backgroundColor: "White" }}>
                            วัน(Day)
                          </option>
                          <option style={{ backgroundColor: "White" }}>
                            เดือน(Month)
                          </option>
                          <option style={{ backgroundColor: "White" }}>
                            ปี(Year)
                          </option>
                        </Select>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* สถานที่ภายในคอมมู */}
                  <Flex w={"100%"}>
                    <Center w={50}>
                      <Switch
                        bg={"gray.500"}
                        borderRadius={10}
                        isChecked={configvalue.Locationsw}
                        onChange={() =>
                          setConfigValue({
                            ...configvalue,
                            Locationsw: !configvalue.Locationsw,
                          })
                        }
                      />
                    </Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">สถานที่ภายในคอมมู</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pr={1.5} position="relative">
                        <Center w={"100%"}>
                          <Box
                            w={"100%"}
                            h="auto"
                            minH={46}
                            bg={"white"}
                            borderRadius={10}
                            mt={0.5}
                            pl={1.5}
                          >
                            <Hashtag
                              state={places}
                              setState={setPlaces}
                              isDisabled={!configvalue.Locationsw}
                            />
                          </Box>
                        </Center>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* ยุคสมัยคอมมู */}
                  <Flex w={"100%"}>
                    <Center w={50}>
                      <Switch
                        bg={"gray.500"}
                        borderRadius={10}
                        isChecked={configvalue.Timelinesw}
                        onChange={() =>
                          setConfigValue({
                            ...configvalue,
                            Timelinesw: !configvalue.Timelinesw,
                          })
                        }
                      />
                    </Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ยุคสมัยคอมมู</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pr={1.5} position="relative">
                        <Box
                          w={"100%"}
                          h="auto"
                          minH={46}
                          bg={"white"}
                          borderRadius={10}
                          mt={0.5}
                          pl={1.5}
                        >
                          <Hashtag
                            state={times}
                            setState={setTimes}
                            isDisabled={!configvalue.Timelinesw}
                          />
                        </Box>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* ระดับของเนื้อหา */}
                  <Flex w={"100%"}>
                    <Center w={50}>
                      <Switch
                        bg={"gray.500"}
                        borderRadius={10}
                        isChecked={configvalue.Ratingsw}
                        onChange={() =>
                          setConfigValue({
                            ...configvalue,
                            Ratingsw: !configvalue.Ratingsw,
                          })
                        }
                      />
                    </Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ระดับของเนื้อหา</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
                        <Select
                          isRequired
                          w={"100%"}
                          h={46}
                          bg={"white"}
                          color="black"
                          size="lg"
                          isDisabled={!configvalue.Ratingsw}
                          value={
                            fieldvalue.rating
                              ? fieldvalue.rating
                              : "G (เหมาะสำหรับทุกวัย)"
                          }
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              rating: e.target.value,
                            })
                          }
                        >
                          <option
                            style={{ backgroundColor: "White" }}
                            value="G (เหมาะสำหรับทุกวัย)"
                          >
                            G (เหมาะสำหรับทุกวัย)
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value="PG (เด็กควรได้รับคำแนะนำ)"
                          >
                            PG (เด็กควรได้รับคำแนะนำ)
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value="PG-13 (เด็กอายุต่ำกว่า 13 ปีควรได้รับคำแนะนำ)"
                          >
                            PG-13 (เด็กอายุต่ำกว่า 13 ปีควรได้รับคำแนะนำ)
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value="R (เด็กอายุต่ำกว่า 17 ปีควรได้รับคำแนะนำ)"
                          >
                            R (เด็กอายุต่ำกว่า 17 ปีควรได้รับคำแนะนำ)
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value="NC-17 (ผู้ที่อายุต่ำกว่า 17 ปีควรไม่ควรรับชม)"
                          >
                            NC-17 (ผู้ที่อายุต่ำกว่า 17 ปีควรไม่ควรรับชม)
                          </option>
                        </Select>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* คำเตือน */}
                  <Flex w={"100%"}>
                    <Center w={50}>
                      <Switch
                        bg={"gray.500"}
                        borderRadius={10}
                        isChecked={configvalue.Triggersw}
                        onChange={() =>
                          setConfigValue({
                            ...configvalue,
                            Triggersw: !configvalue.Triggersw,
                          })
                        }
                      />
                    </Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">คำเตือน</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} position="relative">
                        <Box
                          minW={"100%"}
                          h="auto"
                          minH={46}
                          bg={"white"}
                          borderRadius={10}
                          mt={0.5}
                          pl={1.5}
                        >
                          <Hashtag
                            state={tws}
                            setState={settws}
                            isDisabled={!configvalue.Triggersw}
                          />
                        </Box>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* กฏกติกาและข้อตกลง */}
                  <Flex w={"100%"}>
                    <Center w={50}>
                      <Switch
                        bg={"gray.500"}
                        borderRadius={10}
                        isChecked={configvalue.Rulesw}
                        onChange={() =>
                          setConfigValue({
                            ...configvalue,
                            Rulesw: !configvalue.Rulesw,
                          })
                        }
                      />
                    </Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">กฏกติกาและข้อตกลง</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} position="relative">
                        <Textarea
                          type="text"
                          required
                          w={"100%"}
                          h={100}
                          bg={"white"}
                          className={style.search}
                          m={1.5}
                          isDisabled={!configvalue.Rulesw}
                          value={fieldvalue.rule}
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              rule: e.target.value,
                            })
                          }
                        />
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* คำอธิบาย */}
                  <Flex w={"100%"}>
                    <Center w={50}></Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">คำอธิบาย</Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} position="relative">
                        <Textarea
                          type="text"
                          required
                          w={"100%"}
                          h={200}
                          bg={"white"}
                          className={style.search}
                          m={1.5}
                          value={fieldvalue.description}
                          onChange={(e) => {
                            setFieldvalue({
                              ...fieldvalue,
                              description: e.target.value,
                            });
                          }}
                        />
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* PDF */}

                  <Flex w={"100%"}>
                    <Center w={50}></Center>
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow={"base"}
                      borderRadius={10}
                    >
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={"#C4C4C4"}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">เอกสารของคอมมู</Text>
                          <Text color={"red"} float="left">
                            *
                          </Text>
                        </Box>
                      </Box>

                      <Center w={"100%"} pl={1.5} pr={1.5} position="relative">
                        <Input
                          type="file"
                          ref={inputref}
                          accept="application/pdf"
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              docfile: e.target.files[0],
                            })
                          }
                          required
                          w={"100%"}
                          h={46}
                          bg={"white"}
                          padding={2}
                        />
                        <Button
                          margin={2}
                          onClick={() => {
                            setFieldvalue({
                              ...fieldvalue,
                              docfile: null,
                            });
                            inputref.current.value = "";
                          }}
                        >
                          clear
                        </Button>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {/* Registration */}

          <Accordion allowMultiple bg={"#F3F5F8"}>
            <AccordionItem w={"100%"}>
              <h2>
                <AccordionButton>
                  <AccordionIcon color={"Black"} w={50} h={50} />

                  <Box fontFamily={"SarabunSB"} fontSize={27} color="Black">
                    Registration
                  </Box>
                </AccordionButton>
              </h2>

              <AccordionPanel color={"black"}>
                <VStack>
                  <Flex w={"100%"} m={2}>
                    <Center w={50}></Center>
                    <Box>ลงทะเบียนตัวละครและอื่น ๆ</Box>
                    <Spacer />
                    <IconButton
                      colorScheme="blue"
                      aria-label="Search database"
                      icon={<Plus />}
                      rounded={"full"}
                      bg={"#72994C"}
                      size={"xs"}
                      onClick={addRegisLink}
                    />
                  </Flex>

                  {fieldvalue.registrationlink?.map((item, index) => (
                    <Regisform
                      item={item}
                      onDelete={() => deleteRegisLink(index)}
                      onChange={(data) => setRegisLink(index, data)}
                    />
                  ))}

                  <Flex w={"100%"} m={2}>
                    <Center w={50}></Center>
                    <Box>ตรวจสอบสถานะ</Box>
                    <Spacer />
                    <IconButton
                      colorScheme="blue"
                      aria-label="Search database"
                      icon={<Plus />}
                      rounded={"full"}
                      bg={"#72994C"}
                      size={"xs"}
                      onClick={addCheckLink}
                    />
                  </Flex>

                  {fieldvalue.statuschecklink?.map((item, index) => (
                    <Checkform
                      item={item}
                      onDelete={() => deleteCheckLink(index)}
                      onChange={(data) => setCheckLink(index, data)}
                    />
                  ))}

                  {/* <Center>
                    <Flex maxW={900}>
                      <Flex
                        bg={"#535353"}
                        borderRadius={10}
                        minW={"auto"}
                        minH={"auto"}
                      >
                        <Box w={238} p={4}>
                          <Box className={style.Topic2}>
                            ลิงก์ลงทะเบียนตัวละคร
                          </Box>
                        </Box>

                        <Spacer
                          borderRightColor={"white"}
                          borderRightWidth={3}
                        />

                        <Center pl={1.5} pr={1.5}>
                          <Input
                            required
                            w={650}
                            h={46}
                            bg={"white"}
                            placeholder={"สำหรับลิงก์ฟอร์มวิ่ง"}
                            className={style.search}
                            type="url"
                            value={fieldvalue.submitlink}
                            onChange={(e) => {
                              setFieldvalue({
                                ...fieldvalue,
                                submitlink: e.target.value,
                              });
                            }}
                          />
                        </Center>
                      </Flex>
                    </Flex>
                  </Center>

                  <Center>
                    <Flex maxW={900}>
                      <Flex
                        bg={"#535353"}
                        borderRadius={10}
                        minW={"auto"}
                        minH={"auto"}
                      >
                        <Box w={238} p={4}>
                          <Box className={style.Topic2}>
                            ลิงก์ตรวจสอบตัวละคร
                          </Box>
                        </Box>

                        <Spacer
                          borderRightColor={"white"}
                          borderRightWidth={3}
                        />

                        <Center pl={1.5} pr={1.5}>
                          <Input
                            required
                            w={650}
                            h={46}
                            bg={"white"}
                            placeholder={"สำหรับตรวจสอบ"}
                            className={style.search}
                            type="url"
                            value={fieldvalue.resultlink}
                            onChange={(e) => {
                              setFieldvalue({
                                ...fieldvalue,
                                resultlink: e.target.value,
                              });
                            }}
                          />
                        </Center>
                      </Flex>
                    </Flex>
                  </Center> */}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <HStack justifyContent={"center"} spacing={50} m={5}>
            {!data && (
              <Button
                onClick={onOpen}
                color={"black"}
                bg={"#FFC75A"}
                fontWeight={100}
                fontSize={20}
                h={50}
                w={180}
                p={8}
                borderWidth={3}
                borderColor={"black"}
              >
                เพิ่มผู้ดูแล
              </Button>
            )}

            <Button
              onClick={onCropPicOpen}
              color={"black"}
              bg={"#FFC75A"}
              fontWeight={100}
              fontSize={20}
              h={50}
              w={180}
              p={8}
              borderWidth={3}
              borderColor={"black"}
            >
              เพิ่มรูปแบนเนอร์
            </Button>

            <Button
              onClick={HandleSubmit}
              color={"#FBBC43"}
              bg={"#343434"}
              fontWeight={100}
              fontSize={20}
              h={50}
              w={180}
              p={8}
              borderWidth={3}
              borderColor={"black"}
            >
              {data ? "แก้ไข" : "สร้างคอมมู"}
            </Button>
          </HStack>
        </Box>
      </Center>

      {/* modal Administator */}

      <Modal
        size={"xl"}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent fontFamily={"Mitr"}>
          <ModalHeader>จัดการผู้ดูแล</ModalHeader>
          <ModalCloseButton rounded={"full"} />
          <ModalBody>
            <Flex w={"100%"}>
              <Avatar
                w={70}
                h={70}
                rounded={"full"}
                bg={"green.100"}
                src={
                  data && Object.values(data.creator)[0].photoURL
                    ? Object.values(data.creator)[0].photoURL
                    : auth.currentUser?.photoURL
                }
                // src={auth.currentUser.photoURL}
                name={
                  data && Object.values(data.creator)[0].displayName
                    ? Object.values(data.creator)[0].displayName
                    : auth.currentUser?.displayName
                }
              />
              <Box mt={3} w={"83%"}>
                <Text fontSize={18} w={"100%"} maxW={350} ml="2">
                  {data?.creator
                    ? Object.values(data.creator)[0].displayName
                    : auth.currentUser?.displayName}
                </Text>
                <Text ml="2">Owner</Text>
              </Box>
              <Box float={"right"} w={"3%"}>
                <Tooltip
                  float={"right"}
                  hasArrow
                  label={
                    data?.creator
                      ? Object.values(data.creator)[0]?.uid
                      : auth.currentUser?.uid
                  }
                  bg="gray.300"
                  color="black"
                >
                  <Hash />
                </Tooltip>
              </Box>
            </Flex>

            <Flex mt={5}>
              <Input
                mr={1}
                value={staffSearchString}
                onChange={(e) => setStaffSearchString(e.target.value)}
              />
              <Button bg="#FFC75A">เพิ่มผู้ดูแล</Button>
            </Flex>
            <Flex display={staffSearchResult.length > 0 ? "initial" : "none"}>
              {staffSearchResult.map((staff, index) => (
                <Flex
                  justifyContent={"space-between"}
                  mt={5}
                  onClick={() => addStaff(staff)}
                  _hover={{
                    backgroundColor: "gray.200",
                  }}
                  key={index}
                  cursor={"pointer"}
                >
                  <Avatar
                    name={staff.displayName}
                    // src={staff.photoURL}
                    mr={3}
                  />
                  <Box flexGrow={9}>
                    <Text>{staff.displayName}</Text>
                    <Text>{staff.uid}</Text>
                  </Box>
                </Flex>
              ))}
            </Flex>

            <Divider mt={2} />

            <Box mt={2} fontSize={22} fontWeight={"bold"}>
              รายชื่อผู้ดูแล
            </Box>

            {staffSearch.map((value, index) => (
              <AddStaffForm
                item={value}
                onChange={(data) => setStaff(index, data)}
                onDelete={() => deleteStaff(index)}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* modal Croppic */}

      <Modal
        blockScrollOnMount={false}
        isOpen={isCropPicOpen}
        onClose={onCropPicClose}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              w={"250px"}
              h={"250px"}
              bg={"tomato"}
              onClick={() => setSqrmodal(true)}
            >
              <Image
                src={fieldvalue.bannersqr}
                fallbackSrc={"/placeholder.png"}
                w="100%"
                h="100%"
              ></Image>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitImageModal}>
              ยืนยัน
            </Button>
            <Button variant="ghost" onClick={closeImageModal}>ปิด</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <UniversalUploadModal
        aspectRatio={1 / 1}
        isOpen={sqrmodal}
        onClose={() => setSqrmodal(false)}
        onSubmit={handleSquareSelect}
      />
    </Flex>
  );
};
