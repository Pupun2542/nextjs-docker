import {
  createContext,
  Context,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { firebaseConfig } from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AppContext = createContext();
const UserContext = createContext();
const OpenedChatContext = createContext({});
const NotificationContext = createContext({});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ app, auth, db }}>
      {children}
    </AppContext.Provider>
  );
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // useMemo(()=>{
  useEffect(() => {
    getDocs(collection(db, "userDetail")).then((docs) => {
      setData(docs.docs.map((doc) => doc.data()));
    });
  }, []);

  // },[db])

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

const initialState = {
  opentab: "",
  othertab: [],
};

const tabReducer = (state, action) => {
  switch (action.type) {
    case "addTab":
      console.log("addTab");
      if (state.othertab.length < 5) {
        console.log("fewer 5");
        return {
          ...state,
          othertab: [...state.othertab, action.payload],
        };
      } else {
        const newtab = state.othertab.filter((v, i) => v != state.othertab[0]);
        console.log("more than 5");
        return {
          ...state,
          othertab: [...newtab, action.payload],
        };
      }

    case "removeTab":
      const newtab = state.othertab.filter((v, i) => v != action.payload);
      return {
        ...state,
        othertab: newtab,
      };
    case "changeOpenTab":
      return {
        ...state,
        opentab: action.payload,
      };
  }
};

export const OpenChatTabProvider = ({ children }) => {
  const [tabState, tabDispatcher] = useReducer(tabReducer, initialState);

  // const { tab } = tabState;

  const addTab = (payload) => {
    tabDispatcher({ type: "addTab", payload });
  };
  const removeTab = (payload) => {
    tabDispatcher({ type: "removeTab", payload });
  };
  const changeTab = (payload) => {
    tabDispatcher({ type: "changeOpenTab", payload });
  };

  return (
    <OpenedChatContext.Provider
      value={{ tabState, addTab, removeTab, changeTab }}
    >
      {children}
    </OpenedChatContext.Provider>
  );
};

export const NotificationProvider = ({ children }) => {
  const [notidata, setNotidata] = useState([]);
  const [chatNotiData, setChatNotidata] = useState([]);
  useState(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "userDetail", auth.currentUser.uid, "notification"),
        orderBy("timestamp")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setNotidata(snapshot.docs.map((doc) => doc.data()));
      });
      return () => unsubscribe();
    }
  }, [auth.currentUser]);
  useState(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "userDetail", auth.currentUser.uid, "chatMessage"),
        orderBy("timestamp")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setChatNotidata(snapshot.docs.map((doc) => doc.data()));
      });
      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  return (
    <NotificationContext.Provider value={{ notidata, chatNotiData }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useTab = () => useContext(OpenedChatContext);
export const useApp = () => useContext(AppContext);
export const useUser = () => useContext(UserContext);
export const useNotifications = () => useContext(NotificationContext);
