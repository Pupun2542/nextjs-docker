import "../styles/globals.css";
// import '../styles/navbar.css'
import { AppProvider } from "../src/hook/local";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
