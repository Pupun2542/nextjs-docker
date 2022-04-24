import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Carousel, SSRProvider } from "react-bootstrap";
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