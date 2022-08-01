import React, { useEffect, useState } from "react";
import {
    Spacer,
    VStack,
    Center,
    DrawerBody,
    DrawerFooter,
    Flex,
    Checkbox,
    Link,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "../src/config/firebase.config";
import {
    SignInwithGoogle,
    SignInWithFacebook,
    SignInWithEmailAndPassword,
} from "../src/services/authservice";
import CustomNavbar from "../components/navbar";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import { FacebookLogo, DiscordLogo } from "phosphor-react";

export function SignIn() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const app = getApp();
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [consentCheck, setConsentcheck] = useState(false);
    var mail;
    if (loading) {
        return <CustomNavbar />;
    }
    if (user) {
        mail = user.email;
    } else {
        mail = "null";
    }
    const signInWithEmail = async () => {
        SignInWithEmailAndPassword(email, password);
    };
    const google = async () => {
        await SignInwithGoogle();
        router.push("/");
    };
    const facebook = async () => {
        await SignInWithFacebook();
        router.push("/");
    };
    return (
        <>
            <DrawerBody>
                <VStack>
                    <Button
                        disabled={!consentCheck}
                        onClick={google}
                        color={"#FBBC43"}
                        bg={"#6768AB"}
                        w={300}
                        h={46}
                        borderRadius={10}
                    >
                        <Center>Sign In with Google</Center>
                    </Button>
                    <Button
                        onClick={facebook}
                        disabled={!consentCheck}
                        color={"#FBBC43"}
                        bg={"#6768AB"}
                        w={300}
                        h={46}
                        borderRadius={10}
                    >
                        <Center>Sign In with Facebook</Center>
                    </Button>

                    <Checkbox
                        isChecked={consentCheck}
                        onChange={(e) => setConsentcheck(e.target.checked)}
                    >
                        กรุณายอมรับ
                        <Link target="_blank" href="./policy" fontWeight="bold">
                            นโยบายความเป็นส่วนตัว
                        </Link>
                        ก่อนใช้บริการ
                    </Checkbox>

                    <Spacer />

                </VStack>
            </DrawerBody>
        </>
    );
};
