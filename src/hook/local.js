import { createContext, Context, useContext } from "react";
import { firebaseConfig } from "../config/firebase.config";
import { initializeApp } from "firebase/app";

const AppContext = createContext();

const app = initializeApp(firebaseConfig);

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={app}>{children}</AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
