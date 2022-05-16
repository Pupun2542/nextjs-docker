import React from "react";
import CustomNavbar from "../components/navbar";
import style from "../styles/creategroup.module.css";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "../components/Banner";
import { useApp } from "../src/hook/local";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import UploadImageModal from "../components/Banner";
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
  Square,
  Circle,
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
} from "@chakra-ui/react";
import {
  CaretLeft,
  CaretRight,
  Plus,
  Minus,
  FacebookLogo,
  DiscordLogo,
} from "phosphor-react";

export const Createcommuform = ({ data }) => {
  const { app, auth, db } = useApp();
  const store = getStorage(app);
  const [fieldvalue, setFieldvalue] = useState({
    hashtag: "",
    communame: "",
    maxplayer: 0,
    runtime: "",
    startDate: "",
    description: "",
    smlink: "",
    docfile: null,
    qaasklink: "",
    qaanslink: "",
    submitlink: "",
    resultlink: "",
    contactlink: "",
    startdate: "",
    startdateraw: "",
    rating: "",
    rule: "",
    averagetime: "",
    averagetimeunit: "",
    type: "",
    privacy: "",
  });
  const [bannerBlob, setBannerBlob] = useState(null);
  const [genre, setGenre] = useState([]);
  const [places, setPlaces] = useState([]);
  const [times, setTimes] = useState([]);
  const [TWs, setTWs] = useState([]);
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
    if (data){
      setFieldvalue({
        hashtag: data.tag,
        communame: data.name,
        maxplayer: data.maxplayer,
        runtime: data.runtime,
        startDate: data.startDate,
        description: data.description,
        smlink: data.SMlink,
        docfile: data.docfile,
        qaasklink: data.qaasklink,
        qaanslink: data.qaanslink,
        submitlink: data.submitlink,
        resultlink: data.resultlink,
        contactlink: data.contactlink,
        startDate: data.startDate,
        rating: data.rating,
        rule: data.rule,
        averageTime: data.averageTime,
        averageTimeUnit: data.averageTimeUnit,
        type: data.type,
        privacy: data.privacy,
      });
      if (data.config){
        setConfigValue({
          durationsw: (data.config.durationsw? data.config.durationsw : true),
          Averagesw: (data.config.durationsw? data.config.Averagesw : true),
          Locationsw: (data.config.durationsw? data.config.Locationsw : true),
          Timelinesw: (data.config.durationsw? data.config.Timelinesw : true),
          Ratingsw: (data.config.durationsw? data.config.Ratingsw : true),
          Triggersw: (data.config.durationsw? data.config.Triggersw : true),
          Rulesw: (data.config.durationsw? data.config.Rulesw : true),
        });
      }
      setGenre(data.genre);
      setPlaces(data.place);
      setTimes(data.times);
      setTWs(data.tws);
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
      <Box w={150} h={38} float={'left'}>
        <Box>
          <Box id="tags">
            {props.state.map((tag, index) => (
              <Box key={index} className={style.tag} m={1.5} p={1} maxW={200} float='left'>
                <Box>{tag}</Box>
                <CloseButton
                  onClick={() => removeTags(index)}
                  rounded={50}
                  bg="white"
                  color={"black"}
                  h={22}
                  w={22}
                  m={1}
                />
              </Box>
            ))}
            <Input
              type="text"
              onKeyUp={(event) => (event.key === "," ? addTags(event) : null)}
              placeholder=" ใช้ , เพื่อแบ่งประเภท"
              w={'auto'}
              className={style.search}
              isDisabled={props.isDisabled}
              border="hidden"
              maxW={200}
              mt={1}
              float='left'
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

    const HandleSubmit = () =>{
      console.log('submit')
    }

    return (
        <Flex justifyContent={"center"}>
          {/* <Box minW={400}></Box>

          <Spacer /> */}

          <Center bg={"#D5D5D5"} MaxW={1024} marginTop={55}>
            <VStack>
              <Center>
                <Box>
                  <Center>
                    <Flex>
                      <UploadImageModal
                        setBannerBlob={setBannerBlob}
                        BannerBlob={bannerBlob}
                      />
                    </Flex>
                  </Center>

                  <Center
                    bg={"#535353"}
                    p={4}
                    borderTopRadius={10}
                    // maxW={1024}
                    color={"white"}
                  >
                    <Flex>
                      <Center
                        //จะเป็น Real-Time จากช่องพิมพ์ชื่อย่อคอมมู
                        p={2}
                        className={style.HeadingCreate2}
                      >
                        {fieldvalue.hashtag
                          ? "[" + fieldvalue.hashtag + "]"
                          : "[____]"}
                      </Center>
                      <Center
                        //จะเป็น Real-Time จากช่องพิมพ์ชื่อคอมมู
                        className={style.HeadingCreate2}
                      >
                        {fieldvalue.communame
                          ? fieldvalue.communame
                          : "ชื่อคอมมูนิตี้"}
                      </Center>
                    </Flex>
                  </Center>

                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024}>
                      <h2>
                        <AccordionButton>
                          <AccordionIcon color={"Black"} w={50} h={50} />

                          <Box className={style.Accordion} color="Black">
                            Basic Information
                          </Box>
                        </AccordionButton>
                      </h2>

                      <AccordionPanel color={"white"}>
                        <VStack>
                          {/* Community Name */}
                          <Center w={1024}>
                            <Flex bg={"#535353"} borderRadius={10} minW={900}>
                              <Box p={4} w={238}>
                                <Box className={style.Topic2} pl={0}>
                                  <Text float="left">ชื่อคอมมูนิตี้</Text>
                                  <Text color={"red"} float="left">
                                    *
                                  </Text>
                                </Box>
                              </Box>

                              <Spacer
                                borderRightColor={"white"}
                                borderRightWidth={3}
                              />

                              <Center pl={1.5} pr={1.5} position="relative">
                                <Input
                                  type="text"
                                  value={fieldvalue.communame}
                                  onChange={(e) => {
                                    setFieldvalue({
                                      ...fieldvalue,
                                      communame: e.target.value,
                                    });
                                    // setCommuname(e.target.value);
                                  }}
                                  required
                                  w={650}
                                  h={46}
                                  bg={"white"}
                                  placeholder={"..."}
                                  className={style.search}
                                />
                                {/* <Box minH={10} maxH={50} w={60} display={fieldvalue.communame ? "contents" : "none"} zIndex={50} position="absolute">
                                  <Box _hover={{backgroundColor: "lightgray"}} onClick={()=> setFieldvalue({...fieldvalue, communame: "ABCD"})}>
                                    <Text fontSize={10}>ABCD</Text>
                                    <Text fontSize={8} color="GrayText">ABCD</Text>
                                  </Box>
                                  <Box _hover={{backgroundColor: "lightgray"}} onClick={()=> setFieldvalue({...fieldvalue, communame: "DEFG"})}>
                                    <Text fontSize={10}>DEFG</Text>
                                    <Text fontSize={8} color="GrayText">DEFG</Text>
                                  </Box>
                                </Box> */}
                              </Center>
                            </Flex>
                          </Center>

                          {/* Name Tag */}
                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                              >
                                <Box p={4} w={238}>
                                  <Box className={style.Topic2} pl={0}>
                                    <Text float="left">
                                      ชื่อย่อไม่เกิน 6 ตัวอักษร
                                    </Text>
                                    <Text color={"red"} float="left">
                                      *
                                    </Text>
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Input
                                    type="text"
                                    value={fieldvalue.hashtag}
                                    onChange={(e) => {
                                      setFieldvalue({
                                        ...fieldvalue,
                                        hashtag: e.target.value,
                                      });
                                      // setHashtag(e.target.value);
                                    }}
                                    required
                                    w={130}
                                    h={46}
                                    bg={"white"}
                                    placeholder={"..."}
                                    className={style.search}
                                    maxLength={6}
                                  />
                                </Center>
                              </Flex>

                              <Spacer w={50} />

                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"10"}
                              >
                                <Box p={4} w={238}>
                                  <Box className={style.Topic2}>
                                    ความเป็นส่วนตัว
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  {/* ยังไม่มีให้เลือก */}
                                  <Select
                                    isRequired
                                    w={260}
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
                            </Flex>
                          </Center>

                          <Center>
                            <Flex maxW={900}>
                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"auto"}
                              >
                                <Box p={4} w={238}>
                                  <Box className={style.Topic2}>
                                    จำนวนผู้เล่น
                                  </Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <NumberInput
                                    w={130}
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

                              <Spacer w={50} />

                              <Flex
                                bg={"#535353"}
                                borderRadius={10}
                                minW={"10"}
                              >
                                <Box p={4} w={238}>
                                  <Box className={style.Topic2}>ประเภท</Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center pl={1.5} pr={1.5}>
                                  <Select
                                    isRequired
                                    w={260}
                                    h={46}
                                    bg={"white"}
                                    color="black"
                                    size="lg"
                                    fontFamily={"Mitr"}
                                    onChange={(e) =>
                                      setFieldvalue({ ...fieldvalue, type: e })
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
                                  <Box className={style.Topic2}>หมวดหมู่</Box>
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center>
                                  <Container
                                    minW={650}
                                    h="auto"
                                    minH={46}
                                    bg={"white"}
                                    borderRadius={10}
                                    m={1.5}
                                  >
                                    <Hashtag
                                      // selectedTags={selectedTags}
                                      state={genre}
                                      setState={setGenre}
                                    />
                                  </Container>
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>

                          <Flex w={1024}>
                            <Center w={62}>
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
                                //เพิ่ม 2 บรรทัดบน ตัวแปรให้ตรงกับที่สร้าง 1 state ต่อ 1 component
                              />
                            </Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      วันที่เริ่มเล่น
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center pl={1.5} pr={1.5}>
                                    <Input
                                      type="datetime-local"
                                      isDisabled={!configvalue.durationsw} //แล้วก็เพิ่มตรงนี้ ชื่อตัวแปรตาม state ที่สร้าง
                                      isRequired
                                      h={46}
                                      bg={"white"}
                                      color="black"
                                      w={650}
                                      onChange={(e) => {
                                        setFieldvalue({
                                          ...fieldvalue,
                                          startdate: parseTime(e.target.value),
                                        });
                                        setFieldvalue({
                                          ...fieldvalue,
                                          startdateraw: parseRawTime(
                                            e.target.value
                                          ),
                                        });
                                      }}
                                      fontFamily={"Mitr"}
                                    />
                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}>
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

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      ระยะเวลาโดยประมาณ
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Input
                                    bg="white"
                                    m={1.5}
                                    borderRadius={10}
                                    w={480}
                                    h={46}
                                    color={"Black"}
                                    isDisabled={!configvalue.Averagesw}
                                    value={fieldvalue.averagetime}
                                    onChange={
                                      (e) =>
                                        setFieldvalue({
                                          ...fieldvalue,
                                          averagetime: e.target.value,
                                        })
                                      // setAvergeTime(e.target.value)
                                    }
                                  />

                                  <Spacer
                                    borderLeftColor={"white"}
                                    borderLeftWidth={3}
                                  />

                                  <Center pl={1.5} pr={1.5}>
                                    <Select
                                      isRequired
                                      h={46}
                                      bg={"white"}
                                      color="black"
                                      size="lg"
                                      isDisabled={!configvalue.Averagesw}
                                      fontFamily={"Mitr"}
                                      value={fieldvalue.averagetimeunit}
                                      onChange={(e) =>
                                        setFieldvalue({
                                          ...fieldvalue,
                                          averagetimeunit: e.target.value,
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
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}>
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
                                      สถานที่ภายในคอมมูนิตี้
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Container
                                      minW={650}
                                      h="auto"
                                      minH={46}
                                      bg={"white"}
                                      borderRadius={10}
                                      m={1.5}
                                    >
                                      <Hashtag
                                        state={places}
                                        setState={setPlaces}
                                        isDisabled={!configvalue.Locationsw}
                                      />
                                    </Container>
                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}>
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
                                      ยุคสมัยของคอมมูนิตี้
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Container
                                      minW={650}
                                      h="auto"
                                      minH={46}
                                      bg={"white"}
                                      borderRadius={10}
                                      m={1.5}
                                    >
                                      <Hashtag
                                        state={times}
                                        setState={setTimes}
                                        isDisabled={!configvalue.Timelinesw}
                                      />
                                    </Container>
                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}>
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

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>
                                      ระดับของเนื้อหา
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center pl={1.5} pr={1.5}>
                                    <Select
                                      isRequired
                                      w={650}
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
                                          averagetimeunit: e.target.value,
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
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}>
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

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                  minH={"auto"}
                                >
                                  <Box w={238} p={4}>
                                    <Box className={style.Topic2}>คำเตือน</Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Container
                                      minW={650}
                                      h="auto"
                                      minH={46}
                                      bg={"white"}
                                      borderRadius={10}
                                      m={1.5}
                                    >
                                      <Hashtag
                                        state={TWs}
                                        setState={setTWs}
                                        isDisabled={!configvalue.Triggersw}
                                      />
                                    </Container>
                                  </Center>
                                </Flex>
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}>
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
                                      กฎกติกาและข้อตกลง
                                    </Box>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Textarea
                                      type="text"
                                      required
                                      w={650}
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
                              </Flex>
                            </Center>
                          </Flex>

                          <Flex w={1024}>
                            <Center w={62}></Center>

                            <Center>
                              <Flex maxW={900}>
                                <Flex
                                  bg={"#535353"}
                                  borderRadius={10}
                                  minW={"auto"}
                                  minH={"auto"}
                                >
                                  <Box w={238} p={4} className={style.Topic2}>
                                    <Text float="left">คำอธิบาย</Text>
                                    <Text color={"red"} float="left">
                                      *
                                    </Text>
                                  </Box>

                                  <Spacer
                                    borderRightColor={"white"}
                                    borderRightWidth={3}
                                  />

                                  <Center>
                                    <Textarea
                                      type="text"
                                      required
                                      w={650}
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
                              </Flex>
                            </Center>
                          </Flex>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  {/* Registration */}

                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024}>
                      <h2>
                        <AccordionButton>
                          <AccordionIcon color={"Black"} w={50} h={50} />

                          <Box className={style.Accordion} color="Black">
                            Registration
                          </Box>
                        </AccordionButton>
                      </h2>

                      <AccordionPanel color={"white"}>
                        <VStack>
                          {/* <Flex w={1024}>

                            <Center w={62} >
                              <Center
                                red
                                bg={'#EA4545'} 
                                bg={'#72994C'}
                                rounded="50">
                                <Minus size={32}
                                <Plus size={32}
                                />
                              </Center>
                            </Center>

                            <Center>
                              <Flex bg={"#535353"} borderRadius={10} minW={900}>
                                <Box p={2} w={238}>
                                  <Input
                                    className={style.Topic3}
                                    pl={2}
                                    h={58}
                                    placeholder={"Link title"}
                                  />
                                </Box>

                                <Spacer
                                  borderRightColor={"white"}
                                  borderRightWidth={3}
                                />

                                <Center>
                                  <Input
                                    type="text"
                                    required
                                    w={650}
                                    h={58}
                                    bg={"white"}
                                    className={style.search}
                                    m={1.5}
                                  />
                                </Center>
                              </Flex>
                            </Center>
                          </Flex> */}

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
                          </Center>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  {/* Other Link */}

                  <Accordion allowMultiple>
                    <AccordionItem maxW={1024}>
                      <h2>
                        <AccordionButton>
                          <AccordionIcon color={"Black"} w={50} h={50} />

                          <Box className={style.Accordion} color="Black">
                            Other Link
                          </Box>
                        </AccordionButton>
                      </h2>

                      <AccordionPanel color={"white"}>
                        <VStack>
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
                                    ลิงก์กลุ่มคอมมู
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
                                    placeholder={"..."}
                                    className={style.search}
                                    type="url"
                                    value={fieldvalue.smlink}
                                    onChange={(e) => {
                                      setFieldvalue({
                                        ...fieldvalue,
                                        smlink: e.target.value,
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
                                    ลิงก์ข้อมูลคอมมู
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
                                    placeholder={"..."}
                                    className={style.search}
                                    type="file"
                                    // value={doclink}
                                    onChange={(e) => {
                                      // uploadTotemporaryPDF(setDoclink, e.target.files[0])
                                      setFieldvalue({
                                        ...fieldvalue,
                                        docfile: e.target.files[0],
                                      });
                                      // setDocfile(e.target.files[0])
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
                                    ลิงก์ถามคำถาม
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
                                    placeholder={"สำหรับ Q&A"}
                                    className={style.search}
                                    type="url"
                                    value={fieldvalue.qaasklink}
                                    onChange={(e) => {
                                      setFieldvalue({
                                        ...fieldvalue,
                                        qaasklink: e.target.value,
                                      });
                                      // setQaasklink(e.target.value);
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
                                    ลิงก์ตรวจสอบคำตอบ
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
                                    placeholder={"สำหรับตรวจสอบ Q&A"}
                                    className={style.search}
                                    type="url"
                                    value={fieldvalue.qaanslink}
                                    onChange={(e) => {
                                      setFieldvalue({
                                        ...fieldvalue,
                                        qaanslink: e.target.value,
                                      });
                                      // setQaanslink(e.target.value);
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
                                    ช่องทางติดต่อ
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
                                    placeholder={"ช่องทางติดต่อ"}
                                    className={style.search}
                                    type="url"
                                    value={fieldvalue.contactlink}
                                    onChange={(e) => {
                                      setFieldvalue({
                                        ...fieldvalue,
                                        contactlink: e.target.value,
                                      });
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Flex>
                          </Center>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Spacer h={10} />

                  <Center>
                    <Button
                      onClick={HandleSubmit}
                      color={"#FBBC43"}
                      bg={"#343434"}
                      fontFamily="Mitr"
                      fontWeight={100}
                      fontSize={20}
                      h={50}
                      w={150}
                      mb={20}
                    >
                      สร้างคอมมู
                    </Button>
                  </Center>
                </Box>
              </Center>
            </VStack>
          </Center>

          {/* <Spacer />

          <Box minW={400}></Box> */}
        </Flex>
    );
  };
