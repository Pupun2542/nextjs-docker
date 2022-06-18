import "../styles/globals.css";
// import '../styles/navbar.css'
import {
  AppProvider,
  UserProvider,
  OpenChatTabProvider,
  NotificationProvider,
  GroupNotiProvider,
} from "../src/hook/local";
import { useMediaQuery } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const theme = {
    styles: {
      global: {
        "html, body": {
          scrollbars: {},
        },
      },
    },
  };

  return (
    <ChakraProvider>
      <AppProvider>
        <NotificationProvider>
          <UserProvider>
            <OpenChatTabProvider>
              <GroupNotiProvider>
                <Head>
                  <title>Comuthor</title>
                </Head>
                <Component {...pageProps} />
              </GroupNotiProvider>
            </OpenChatTabProvider>
          </UserProvider>
        </NotificationProvider>
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
