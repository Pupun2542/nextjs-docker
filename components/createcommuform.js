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

export const Createcommuform = ({data}) => {
    const {app, auth, db} = useApp();
    const store = getStorage(app);
    const [user, loading, error] = useAuthState(auth);
    const [fieldvalue, setFieldvalue] = useState({
        hashtag: "",
        communame: "",
        maxplayer: 0,
        runtime: "",
        startDate: "",
        description: "",
        SMlink: "",
        docfile: null,
        qaasklink: "",
        qaanslink: "",
        submitlink: "",
        resultlink: "",
        contactlink: "",
        startDate: "",
        rating: "",
        rule: "",
        averageTime: "",
        averageTimeUnit: "",
        type= "",
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
    })
    useEffect(()=>{
        setFieldvalue({
            hashtag: data.tag,
            communame: data.name,
            maxplayer: data.maxplayer,
            runtime: data.runtime,
            startDate: data.startDate,
            description: data.description,
            SMlink: data.SMlink,
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
        })
        setConfigValue({
            durationsw: data.config.durationsw,
            Averagesw: data.config.Averagesw,
            Locationsw: data.config.Locationsw,
            Timelinesw: data.config.Timelinesw,
            Ratingsw: data.config.Ratingsw,
            Triggersw: data.config.Triggersw,
            Rulesw: data.config.Rulesw,
        })
        setGenre(data.genre);
        setPlaces(data.place);
        setTimes(data.times);
        setTWs(data.tws);
    },[data])

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
    <Box bg="#FDFDFD" maxW={1980}>
        <CustomNavbar />
        <Flex justifyContent={'center'}>
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
                        {fieldvalue.hashtag ? "[" + fieldvalue.hashtag + "]" : "[____]"}
                      </Center>
                      <Center
                        //จะเป็น Real-Time จากช่องพิมพ์ชื่อคอมมู
                        className={style.HeadingCreate2}
                      >
                        {fieldvalue.communame ? fieldvalue.communame : "ชื่อคอมมูนิตี้"}
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

                              <Center pl={1.5} pr={1.5}>
                                <Input
                                  type="text"
                                  value={fieldvalue.communame}
                                  onChange={(e) => {
                                      setFieldvalue({...fieldvalue, 'communame': e.target.value })
                                    // setCommuname(e.target.value);
                                  }}
                                  required
                                  w={650}
                                  h={46}
                                  bg={"white"}
                                  placeholder={"..."}
                                  className={style.search}
                                />
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
                                    value={hashtag}
                                    onChange={(e) => {
                                      setHashtag(e.target.value);
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
                                  <NumberInput w={130} onChange={(e)=>setMaxplayer(e)}>
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
                                    onChange={(e) => setType(e.target.value)}
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
                                      selectedTags={selectedTags}
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
                                isChecked={durationsw}
                                onChange={() => setDurationsw(!durationsw)}
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
                                      isDisabled={!durationsw} //แล้วก็เพิ่มตรงนี้ ชื่อตัวแปรตาม state ที่สร้าง
                                      isRequired
                                      h={46}
                                      bg={"white"}
                                      color="black"
                                      w={650}
                                      onChange={(e) =>
                                        setStartDate(parseTime(e.target.value))
                                      }
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
                                isChecked={Averagesw}
                                onChange={() => setAveragesw(!Averagesw)}
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
                                    isDisabled={!Averagesw}
                                    value={averageTime}
                                    onChange={(e) =>
                                      setAvergeTime(e.target.value)
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
                                      isDisabled={!Averagesw}
                                      fontFamily={"Mitr"}
                                      onSelect={(e) =>
                                        setAvergeTimeUnit(e.target.value)
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
                                isChecked={Locationsw}
                                onChange={() => setLocationsw(!Locationsw)}
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
                                        selectedTags={selectedTags}
                                        state={places}
                                        setState={setPlaces}
                                        isDisabled={!Locationsw}
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
                                isChecked={Timelinesw}
                                onChange={() => setTimelinesw(!Timelinesw)}
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
                                        selectedTags={selectedTags}
                                        state={times}
                                        setState={setTimes}
                                        isDisabled={!Timelinesw}
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
                                isChecked={Ratingsw}
                                onChange={() => setRatingsw(!Ratingsw)}
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
                                      isDisabled={!Ratingsw}
                                      value={
                                        rating
                                          ? rating
                                          : "G (เหมาะสำหรับทุกวัย)"
                                      }
                                      onChange={(e) =>
                                        setRating(e.target.value)
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
                                isChecked={Triggersw}
                                onChange={() => setTriggersw(!Triggersw)}
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
                                        selectedTags={selectedTags}
                                        state={TWs}
                                        setState={setTWs}
                                        isDisabled={!Triggersw}
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
                                isChecked={Rulesw}
                                onChange={() => setRulesw(!Rulesw)}
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
                                      isDisabled={!Rulesw}
                                      value={rule}
                                      onChange={(e) => setRule(e.target.value)}
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
                                      value={description}
                                      onChange={(e) => {
                                        setDescription(e.target.value);
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
                                    value={submitlink}
                                    onChange={(e) => {
                                      setSubmitlink(e.target.value);
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
                                    value={resultlink}
                                    onChange={(e) => {
                                      setResultlink(e.target.value);
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
                                    value={smlink}
                                    onChange={(e) => {
                                      setSmlink(e.target.value);
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
                                      setDocfile(e.target.files[0])
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
                                    value={qaasklink}
                                    onChange={(e) => {
                                      setQaasklink(e.target.value);
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
                                    value={qaanslink}
                                    onChange={(e) => {
                                      setQaanslink(e.target.value);
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
                                    value={contactlink}
                                    onChange={(e) => {
                                      setContactlink(e.target.value);
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

        <Center bg={"#343434"} h={180}>
          <Flex>
            <Center>
              <VStack m={5}>
                <Box fontFamily={"mitr"} color={"#FFFFFF"}>
                  Comuthor © 2022
                </Box>
                <Flex>
                  <FacebookLogo size={32} color={"#FFFFFF"} />
                  <Spacer w={5} />
                  <DiscordLogo size={32} color={"#FFFFFF"} />
                </Flex>
              </VStack>
            </Center>

            <Spacer borderRightColor={"#ffffff"} borderWidth={1} h={150} />

            <Center>
              <VStack fontFamily={"Mitr"} m={5} color={"#FFFFFF"}>
                <Box>About us</Box>
                <Box>Guide</Box>
              </VStack>
            </Center>

            <Spacer borderRightColor={"#ffffff"} borderWidth={1} h={150} />

            <Center>
              <VStack m={5} fontFamily={"Mitr"} color={"#FFFFFF"}>
                <Box>Policy</Box>
                <Box>Term</Box>
              </VStack>
            </Center>
          </Flex>
        </Center>
      </Box>
  )
}
