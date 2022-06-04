import React from "react";
import style from "../../styles/creategroup.module.css";
import { useState, useEffect } from "react";
import "../Banner";
import { useApp } from "../../src/hook/local";
import UploadImageModal from "../Banner";
import {
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

import {
  Box,
  Button,
  Flex,
  Center,
  IconButton,
  Container,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  VStack,
  Input,
  Select,
  CloseButton,
  Switch,
  FormControl,
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
} from "@chakra-ui/react";
import {
  CaretLeft,
  CaretRight,
  Plus,
  Minus,
  FacebookLogo,
  DiscordLogo,
  ArrowRight,
  Hash,
} from "phosphor-react";
import { Regisform } from "./regisform";
import { Checkform } from "./checkform";
import axios from "axios";
import { useRouter } from 'next/router'
import { creategroup } from "../../src/services/firestoreservice";
import { AddStaffForm } from "./addStaffForm";

export const Createcommuform = ({ data, uid }) => {
  const { app, auth, db } = useApp();
  const store = getStorage(app);
  const Router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCropPicOpen, onOpen: onCropPicOpen, onClose: onCropPicClose } = useDisclosure();
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
    rating: "",
    rule: "",
    averageTime: "",
    averageTimeUnit: "",
    type: "",
    privacy: "",
    registrationlink: [],
    statuschecklink: [],
    creator: uid,
    staff:[]
  });
  const [bannerBlob, setBannerBlob] = useState(null);
  const [genre, setGenre] = useState([]);
  const [places, setPlaces] = useState([]);
  const [times, setTimes] = useState([]);
  const [TWs, setTWs] = useState([]);
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
  useEffect(() => {
    if (data) {
      setFieldvalue({
        tag: data.tag,
        name: data.name,
        maxplayer: data.maxplayer,
        runtime: data.runtime,
        description: data.description,
        SMlink: data.SMlink,
        // docfile: data.docfile,
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
      });
      if (data.config) {
        setConfigValue({
          durationsw: (data.config.durationsw ? data.config.durationsw : true),
          Averagesw: (data.config.durationsw ? data.config.Averagesw : true),
          Locationsw: (data.config.durationsw ? data.config.Locationsw : true),
          Timelinesw: (data.config.durationsw ? data.config.Timelinesw : true),
          Ratingsw: (data.config.durationsw ? data.config.Ratingsw : true),
          Triggersw: (data.config.durationsw ? data.config.Triggersw : true),
          Rulesw: (data.config.durationsw ? data.config.Rulesw : true),
        });
      }
      setGenre(data.genre);
      setPlaces(data.place);
      setTimes(data.times);
      setTWs(data.tws);
      setBannerBlob(data.banner)
    }
  }, [data]);

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
        // props.selectedTags([...props.state, tag]);
        event.target.value = "";
      }
    };
    return (
      <Box w={'100%'} h={38} float={'left'}>
        <Box>
          <Box id="tags" mt={1}>
            {props.state.map((tag, index) => (
              <HStack
                key={index}
                bg={'#6768AB'}
                color='white'
                borderRadius={10}
                pt={1} pb={1}
                pl={2} pr={2}
                // maxW={200} 
                float='left'
                spacing={2.5}
                mr={0.5} ml={0.5}
                mt={0.5} mb={0.5}
                fontSize={16}
                w={'auto'}
              >
                <Box>{tag}</Box>
                <CloseButton
                  onClick={() => removeTags(index)}
                  rounded={'full'}
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
              placeholder=" ใช้ , เพื่อแบ่งประเภท"
              w={'auto'}
              isDisabled={props.isDisabled}
              // border="hidden"
              maxW={200}
              float='left'
              mr={0.5} ml={0.5}
              fontSize={16}
              h={31}
            />
          </Box>
        </Box>
      </Box>
    );
  }
  const parseTime = (localtime) => {
    // console.log(localtime);
    const spdatetime = localtime.split("T");

    const timebuild = spdatetime[0] + " เวลา " + spdatetime[1];
    return timebuild;
  };

  const parseRawTime = (localtime) => {
    console.log(localtime);
    const spdatetime = localtime.split("T");
    const spdate = spdatetime[0].split("/");
    const sptime = spdatetime[1].split(":");

    const timebuild = new Date();
    // timebuild.setDate(spdate[0]);
    // timebuild.setMonth(spdate[1]+1);
    timebuild.setFullYear(spdate[2], spdate[1] + 1, spdate[0]);
    timebuild.setHours(sptime[0], sptime[0]);

    console.log(timebuild);
    return timebuild;
  };

  const HandleSubmit = async () => {
    const body = {
      ...fieldvalue,
      genre: genre,
      places: places,
      times: times,
      TWs: TWs,
      bannerBlob: bannerBlob,
      config: configvalue
    }
    console.log(body)
    if (data) {

      // const res = await axios.post(`${process.env.NEXT_PUBLIC_USE_API_URL}/api/group/update/${data.id}`, body);
      // console.log(res.status)
    } else {
      if (body.bannerBlob && body.bannerBlob !== "") {
        const sp = body.bannerBlob.split(";", 1);
        const sp2 = sp[0].split(":", 1);
        const contenttype = sp2[1]

        const res = await axios.post(`${process.env.NEXT_PUBLIC_USE_API_URL}/api/store/upload`, { bannerBlob: bannerBlob }, { headers: { "content-type": contenttype } });
        console.log(res);
      }


      // creategroup(body);
      // console.log(process.env)
      // const res = await axios.post(`${process.env.NEXT_PUBLIC_USE_API_URL}/api/group/create`, body);
      // if (res.status == 200){
      //   console.log(res.data)
      //   // Router.push(res.)
      // }
    }
  }

  const addRegisLink = () => {

    setFieldvalue({
      ...fieldvalue, registrationlink: [...fieldvalue.registrationlink, {
        name: "",
        fromdate: "",
        todate: "",
        link: "",
      }]
    })
  }

  const deleteRegisLink = (index) => {
    const newState = fieldvalue.registrationlink.filter((v, i) => index !== i)
    setFieldvalue({ ...fieldvalue, registrationlink: newState })
  }

  const setRegisLink = (index, data) => {
    const newState = fieldvalue.registrationlink.map((v, i) => i == index ? data : v);
    setFieldvalue({ ...fieldvalue, registrationlink: newState })
  }
  const addCheckLink = () => {

    setFieldvalue({
      ...fieldvalue, statuschecklink: [...fieldvalue.statuschecklink, {
        name: "",
        fromdate: "",
        todate: "",
        link: "",
      }]
    })
  }

  const deleteCheckLink = (index) => {
    const newState = fieldvalue.statuschecklink.filter((v, i) => index !== i)
    setFieldvalue({ ...fieldvalue, statuschecklink: newState })
  }

  const setCheckLink = (index, data) => {
    const newState = fieldvalue.statuschecklink.map((v, i) => i == index ? data : v);
    setFieldvalue({ ...fieldvalue, statuschecklink: newState })
  }

  const addStaff = (data) => {

    setFieldvalue({
      ...fieldvalue, statuschecklink: [...fieldvalue.statuschecklink, {
        displayName: data.displayName,
        uid: data.uid,
        photoURL: photoURL,
      }]
    })
  }

  const deleteStaff = (index) => {
    const newState = fieldvalue.statuschecklink.filter((v, i) => index !== i)
    setFieldvalue({ ...fieldvalue, statuschecklink: newState })
  }

  const setStaff = (index, data) => {
    const newState = fieldvalue.statuschecklink.map((v, i) => i == index ? data : v);
    setFieldvalue({ ...fieldvalue, statuschecklink: newState })
  }

  const searchStaff = (value) =>{
    setStaffSearchString(value);
    if (value.length >= 3) {

    }
  }

  return (
    <Flex justifyContent={"center"} bg={'#F3F3F3'}>

      <Center fontFamily={'Mitr'} bg={'white'} maxW={1000} width={'100%'} boxShadow={'base'}>
        <Box maxW={875} width={'100%'} boxShadow={'base'}>
          <Box w={'100%'} bg={'#6768AB'} h={50}></Box>
          <Center>
            <Flex>
              <UploadImageModal
                setBannerBlob={setBannerBlob}
                BannerBlob={bannerBlob}
              />
            </Flex>
          </Center>

          <Center fontSize={24} bg={'#6768AB'} p={2} borderTopRadius={10} color={"white"}>
            <Flex>
              <Center
                //จะเป็น Real-Time จากช่องพิมพ์ชื่อย่อคอมมู
                p={2}
              >
                {fieldvalue.tag
                  ? "[" + fieldvalue.tag + "]"
                  : "[____]"}
              </Center>
              <Center
              //จะเป็น Real-Time จากช่องพิมพ์ชื่อคอมมู
              >
                {fieldvalue.name
                  ? fieldvalue.name
                  : "ชื่อคอมมูนิตี้"}
              </Center>
            </Flex>
          </Center>

          <Accordion allowMultiple bg={'#F3F3F3'}>
            <AccordionItem w={'100%'}>
              <h2>
                <AccordionButton>
                  <AccordionIcon color={"Black"} w={50} h={50} />

                  <Box className={style.Accordion} color="Black">
                    Basic Information
                  </Box>
                </AccordionButton>
              </h2>

              <AccordionPanel color={"white"}>
                <VStack fontSize={16} color={'black'}>

                  {/* Community Name */}
                  <Flex w={'100%'}>
                    <Center w={50}></Center>
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ชื่อคอมมูนิตี้</Text>
                          <Text color={"red"} float="left">
                            *
                          </Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pl={1.5} pr={1.5} position="relative">
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
                          w={'100%'}
                          h={46}
                          bg={"white"}
                          placeholder={"..."}
                          className={style.search}
                        />
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* ชื่อย่อคอมมู ความเป็นส่วนตัว */}
                  <Flex w={'100%'}>
                    <Center w={50}></Center>
                    <Flex w={'50%'} bg={'white'} boxShadow={'base'} borderRadius={10}>
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ชื่อย่อคอมมู</Text>
                          <Text color={"red"} float="left">
                            *
                          </Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pl={1.5} pr={1.5} position="relative">
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

                          w={'100%'}
                          h={46}
                          bg={"white"}
                          placeholder={"ไม่เกิน 6 ตัวอักษร"}
                        />
                      </Center>
                    </Flex>

                    <Spacer minW={2} />

                    <Flex w={'50%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ความเป็นส่วนตัว</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pl={1.5} pr={1.5} position="relative">
                        <Select
                          isRequired
                          w={'100%'}
                          h={46}
                          bg={"white"}
                          color="black"
                          size="lg"
                          defaultValue={"สาธารณะ"}
                          fontFamily={"Mitr"}
                        >
                          <option
                            style={{ backgroundColor: "White" }}
                            value={"สาธารณะ"}
                          >
                            สาธารณะ
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value={"ส่วนตัว"}
                          >
                            ส่วนตัว
                          </option>
                        </Select>

                      </Center>
                    </Flex>

                    <Center w={50}></Center>

                  </Flex>

                  {/* ประเภท */}

                  <Flex w={'100%'}>
                    <Center w={50}></Center>
                    <Flex w={'50%'} bg={'white'} boxShadow={'base'} borderRadius={10}>
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">จำนวนผู้เล่น</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pl={1.5} pr={1.5} position="relative">
                        <NumberInput
                          w={'100%'}
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              maxplayer: e,
                            })
                          }
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

                    <Flex w={'50%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ประเภท</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pl={1.5} pr={1.5} position="relative">
                        <Select
                          isRequired
                          w={'100%'}
                          h={46}
                          bg={"white"}
                          color="black"
                          size="lg"
                          fontFamily={"Mitr"}
                          onChange={(e) =>
                            setFieldvalue({ ...fieldvalue, type: e.target.value })
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
                  <Flex w={'100%'}>
                    <Center w={50}></Center>
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">หมวดหมู่</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} position="relative">
                        <Container
                          w={'100%'}
                          h="auto"
                          minH={46}
                          bg={"white"}
                          borderRadius={10}
                          mt={1}
                        >
                          <Hashtag
                            // selectedTags={selectedTags}
                            state={genre}
                            setState={setGenre}
                          />
                        </Container>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* วันที่เริ่มเล่น */}
                  <Flex w={'100%'}>
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
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">วันที่เริ่มเล่น</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pl={1.5} pr={1.5} position="relative">
                        <Center w={'100%'}>
                          <Input
                            type="datetime-local"
                            isDisabled={!configvalue.durationsw} //แล้วก็เพิ่มตรงนี้ ชื่อตัวแปรตาม state ที่สร้าง
                            isRequired
                            h={46}
                            bg={"white"}
                            color="black"
                            w={'100%'}
                            onChange={(e) => {
                              setFieldvalue({
                                ...fieldvalue,
                                startDate: parseTime(e.target.value),
                              });
                              setFieldvalue({
                                ...fieldvalue,
                                startDateraw: parseRawTime(
                                  e.target.value
                                ),
                              });
                            }}
                            fontFamily={"Mitr"}
                          />
                        </Center>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* ระยะเวลาโดยประมาณ */}
                  <Flex w={'100%'}>
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

                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ระยะเวลาโดยประมาณ</Text>
                        </Box>
                      </Box>

                      <Center w={'55%'} position="relative">
                        <Center w={'100%'}>
                          <Input
                            bg="white"
                            m={1.5}
                            borderRadius={10}
                            w={'100%'}
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

                      <Center pl={1.5} pr={1.5} borderLeftColor={'#C4C4C4'} borderLeftWidth={3}>
                        <Select
                          isRequired
                          h={46}
                          bg={"white"}
                          color="black"
                          size="lg"
                          isDisabled={!configvalue.Averagesw}
                          fontFamily={"Mitr"}
                          value={fieldvalue.averageTimeUnit}
                          onChange={(e) =>
                            setFieldvalue({
                              ...fieldvalue,
                              averageTimeUnit: e.target.value,
                            })
                          }
                        >
                          <option
                            style={{ backgroundColor: "White" }}
                          >
                            วัน(Day)
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                          >
                            เดือน(Month)
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                          >
                            ปี(Year)
                          </option>
                        </Select>
                      </Center>

                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* สถานที่ภายในคอมมู */}
                  <Flex w={'100%'}>
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
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">สถานที่ภายในคอมมู</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pr={1.5} position="relative">
                        <Center w={'100%'}>
                          <Container
                            w={'100%'}
                            h="auto"
                            minH={46}
                            bg={"white"}
                            borderRadius={10}
                            mt={1.5}
                          >
                            <Hashtag
                              state={places}
                              setState={setPlaces}
                              isDisabled={!configvalue.Locationsw}
                            />
                          </Container>
                        </Center>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* ยุคสมัยคอมมู */}
                  <Flex w={'100%'}>
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
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>
                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ยุคสมัยคอมมู</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pr={1.5} position="relative">
                        <Container
                          w={'100%'}
                          h="auto"
                          minH={46}
                          bg={"white"}
                          borderRadius={10}
                          mt={2}
                        >
                          <Hashtag
                            state={times}
                            setState={setTimes}
                            isDisabled={!configvalue.Timelinesw}
                          />
                        </Container>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* ระดับของเนื้อหา */}
                  <Flex w={'100%'}>
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
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ระดับของเนื้อหา</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pl={1.5} pr={1.5} position="relative">
                        <Select
                          isRequired
                          w={'100%'}
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
                            value="R-13 (เหมาะสำหรับอายุ 13 ปีขึ้นไป)"
                          >
                            R-13 (เหมาะสำหรับอายุ 13 ปีขึ้นไป)
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value="R-18 (เหมาะสำหรับอายุ 18 ปีขึ้นไป)"
                          >
                            R-18 (เหมาะสำหรับอายุ 18 ปีขึ้นไป)
                          </option>
                          <option
                            style={{ backgroundColor: "White" }}
                            value="NC-21 (ไม่เหมาะสำหรับเยาวชน)"
                          >
                            NC-21 (ไม่เหมาะสำหรับเยาวชน)
                          </option>
                        </Select>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* คำเตือน */}
                  <Flex w={'100%'}>
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
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">ระดับของเนื้อหา</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} position="relative">
                        <Container
                          minW={'100%'}
                          h="auto"
                          minH={46}
                          bg={"white"}
                          borderRadius={10}
                          mt={2}
                        >
                          <Hashtag
                            state={TWs}
                            setState={setTWs}
                            isDisabled={!configvalue.Triggersw}
                          />
                        </Container>
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                  {/* กฏกติกาและข้อตกลง */}
                  <Flex w={'100%'}>
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
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">กฏกติกาและข้อตกลง</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} position="relative">
                        <Textarea
                          type="text"
                          required
                          w={'100%'}
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
                  <Flex w={'100%'}>
                    <Center w={50}></Center>
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">คำอธิบาย</Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} position="relative">
                        <Textarea
                          type="text"
                          required
                          w={'100%'}
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

                  <Flex w={'100%'}>
                    <Center w={50}></Center>
                    <Flex w={'100%'} bg={'white'} boxShadow={'base'} borderRadius={10}>

                      <Box
                        p={4}
                        minW={180}
                        borderRightColor={'#C4C4C4'}
                        borderRightWidth={3}
                      >
                        <Box>
                          <Text float="left">เอกสารของคอมมู</Text>
                          <Text color={"red"} float="lef
                          t">
                            *
                          </Text>
                        </Box>
                      </Box>

                      <Center w={'100%'} pl={1.5} pr={1.5} position="relative">
                        <Input
                          type="text"
                          // value={fieldvalue.name}
                          // onChange={(e) => {
                          //   setFieldvalue({
                          //     ...fieldvalue,
                          //     name: e.target.value,
                          //   });
                          //   // setCommuname(e.target.value);
                          // }}
                          required
                          w={'100%'}
                          h={46}
                          bg={"white"}
                          placeholder={"..."}
                        />
                      </Center>
                    </Flex>
                    <Center w={50}></Center>
                  </Flex>

                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {/* Registration */}

          <Accordion allowMultiple bg={'#F3F3F3'}>
            <AccordionItem w={'100%'}>
              <h2>
                <AccordionButton>
                  <AccordionIcon color={"Black"} w={50} h={50} />

                  <Box className={style.Accordion} color="Black">
                    Registration
                  </Box>
                </AccordionButton>
              </h2>

              <AccordionPanel color={"black"}>
                <VStack>

                  <Flex w={'100%'} m={2}>
                    <Center w={50}></Center>
                    <Box>ลงทะเบียนตัวละครและอื่น ๆ</Box>
                    <Spacer />
                    <IconButton
                      colorScheme='blue'
                      aria-label='Search database'
                      icon={<Plus />}
                      rounded={'full'}
                      bg={'#72994C'}
                      size={'xs'}
                      onClick={addRegisLink}
                    />
                  </Flex>


                  {fieldvalue.registrationlink?.map((item, index) => (
                    <Regisform item={item} onDelete={() => deleteRegisLink(index)} onChange={(data) => setRegisLink(index, data)} />
                  ))}


                  <Flex w={'100%'} m={2}>
                    <Center w={50}></Center>
                    <Box>ตรวจสอบสถานะ</Box>
                    <Spacer />
                    <IconButton
                      colorScheme='blue'
                      aria-label='Search database'
                      icon={<Plus />}
                      rounded={'full'}
                      bg={'#72994C'}
                      size={'xs'}
                      onClick={addCheckLink}
                    />
                  </Flex>

                  {fieldvalue.statuschecklink?.map((item, index) => (
                    <Checkform item={item} onDelete={() => deleteCheckLink(index)} onChange={(data) => setCheckLink(index, data)} />
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

          <HStack justifyContent={'center'} spacing={50} m={5}>
            <Button
              onClick={onOpen}
              color={"black"}
              bg={"#FFC75A"}
              fontFamily="Mitr"
              fontWeight={100}
              fontSize={20}
              h={50}
              w={180}
              p={8}
              borderWidth={3}
              borderColor={'black'}
            >
              เพิ่มผู้ดูแล
            </Button>

            <Button
              onClick={onCropPicOpen}
              color={"black"}
              bg={"#FFC75A"}
              fontFamily="Mitr"
              fontWeight={100}
              fontSize={20}
              h={50}
              w={180}
              p={8}
              borderWidth={3}
              borderColor={'black'}
            >
              เพิ่มรูปแบนเนอร์
            </Button>

            <Button
              onClick={HandleSubmit}
              color={"#FBBC43"}
              bg={"#343434"}
              fontFamily="Mitr"
              fontWeight={100}
              fontSize={20}
              h={50}
              w={180}
              p={8}
              borderWidth={3}
              borderColor={'black'}
            >
              สร้างคอมมู
            </Button>
          </HStack>
        </Box>
      </Center>

      {/* modal Administator */}

      <Modal size={'xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={'Mitr'}>
          <ModalHeader>จัดการผู้ดูแล</ModalHeader>
          <ModalCloseButton rounded={'full'} />
          <ModalBody>

            <Flex w={'100%'}>
              <Center
                w={70}
                h={70}
                rounded={'full'}
                bg={'green.100'}
              >
                L
              </Center>
              <Box mt={3} w={'83%'}>
                <Text fontSize={18} w={'100%'} maxW={350} ml='2'>
                  Luke Earthrunner
                </Text>
                <Text ml='2'>
                  Owner
                </Text>
              </Box>
              <Box float={'right'} w={'3%'}>
                <Tooltip float={'right'} hasArrow label='UID:...' bg='gray.300' color='black'>
                  <Hash />
                </Tooltip>
              </Box>

            </Flex>

            <Flex mt={5}>
              <Input mr={1} />
              <Button bg='#FFC75A'>เพิ่มผู้ดูแล</Button>
            </Flex>

            <Divider mt={2} />

            <Box mt={2} fontSize={22} fontWeight={'bold'}>
              รายชื่อผู้ดูแล
            </Box>

            {staffSearch.map((value, index)=>{
              (<AddStaffForm item={value} onChange={(data)=> setStaff(index, data)} onDelete={()=>deleteStaff(index)} />)
            })}

            {/* <Flex mt={3}>
              <Center
                w={50}
                h={50}
                rounded={'full'}
                bg={'yellow.200'}
              >
                R
              </Center>

              <Box mt={0} w={'83%'}>
                <Text fontSize={18} w={'100%'} maxW={350} ml='2'>
                  Rudvik Stormsearch
                </Text>

                <Flex>
                  <Select variant='filled' h={25} ml={2} w={'25%'} placeholder='Staff'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>

                  <Box p={1} float={'right'} w={'3%'}>
                    <Tooltip float={'right'} hasArrow label='UID:...' bg='gray.300' color='black'>
                      <Hash />
                    </Tooltip>
                  </Box>
                </Flex>

              </Box>

              <IconButton
                rounded={'full'}
                size='xs'
                mt={3.5}
                variant='outline'
                colorScheme='teal'
                icon={<Minus />}
                _hover={{
                  bg: 'red'
                }}
              />
            </Flex> */}



          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} >
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* modal Croppic */}

      <Modal blockScrollOnMount={false} isOpen={isCropPicOpen} onClose={onCropPicClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              You can scroll the content behind the moon
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex>
  );
};
