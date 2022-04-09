import "../styles/globals.css";
// import '../styles/navbar.css'
import { AppProvider } from "../src/hook/local";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AppProvider>
        <Head>
          <title>Comuthor</title>
        </Head>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
