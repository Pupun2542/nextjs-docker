import "../styles/globals.css";
// import '../styles/navbar.css'
import {
  AppProvider,
  UserProvider,
  OpenChatTabProvider,
  NotificationProvider,
  GroupNotiProvider,
} from "../src/hook/local";
import { extendTheme, useMediaQuery } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    styles: {
      global: () => ({
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-track": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#727272",
          borderRadius: "24px",
        },

      }),
    },
  })

  return (
    <ChakraProvider theme={theme}>
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
