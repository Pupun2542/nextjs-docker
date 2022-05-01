import "../styles/globals.css";
// import '../styles/navbar.css'
import {
  AppProvider,
  UserProvider,
  OpenChatTabProvider,
  NotificationProvider,
} from "../src/hook/local";
// import { UserProvider } from "../src/hook/user";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AppProvider>
        <NotificationProvider>
          {/* <UserProvider> */}
            <OpenChatTabProvider>
              <Head>
                <title>Comuthor</title>
              </Head>
              <Component {...pageProps} />
            </OpenChatTabProvider>
          {/* </UserProvider> */}
        </NotificationProvider>
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
