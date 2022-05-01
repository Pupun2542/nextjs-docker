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
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import useSound from "use-sound";

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

// export const UserProvider = ({ children }) => {
//   const [data, setData] = useState([]);

//   // useMemo(()=>{
//   useEffect(() => {
//     getDocs(collection(db, "userDetail")).then((docs) => {
//       setData(docs.docs.map((doc) => doc.data()));
//     });
//   }, []);

//   // },[db])

//   return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
// };

const initialState = {
  opentab: "",
  othertab: [],
};

const tabReducer = (state, action) => {
  switch (action.type) {
    case "addTab":
      if (!state.othertab.includes(action.payload)){
        return {
          ...state,
          othertab: [...state.othertab, action.payload],
        };
      }

    case "removeTab":
      const newtab = state.othertab.filter((v, i) => v != action.payload);
      // console.log("removetab");
      // window.localStorage.removeItem(action.payload)
      return {
        ...state,
        othertab: newtab,
      };
    case "changeOpenTab":
      if (!state.othertab.includes(action.payload)) {
        return {
          ...state,
          opentab: action.payload,
          othertab: [...state.othertab, action.payload],
        };
      }
      return {
        ...state,
        opentab: action.payload,
      };
    case "closeOpenTab":
      return {
        ...state,
        opentab: "",
      };
  }
};

export const OpenChatTabProvider = ({ children }) => {
  const [tabState, tabDispatcher] = useReducer(tabReducer, initialState);
  console.log(tabState)
  // const { tab } = tabState;

  const addTab = (payload) => {
    tabDispatcher({ type: "addTab", payload });
  };
  const removeTab = (payload) => {
    tabDispatcher({ type: "removeTab", payload });
  };
  const changeTab = (payload) => {
    // console.log(tabState.opentab,payload)
    tabDispatcher({ type: "changeOpenTab", payload });
  };
  const CloseTab = () => {
    // console.log(tabState.opentab,payload)
    tabDispatcher({ type: "closeOpenTab" });
  };

  return (
    <OpenedChatContext.Provider
      value={{ tabState, addTab, removeTab, changeTab, CloseTab }}
    >
      {children}
    </OpenedChatContext.Provider>
  );
};

export const NotificationProvider = ({ children }) => {
  const [notidata, setNotidata] = useState([]);
  const [chatNotiData, setChatNotidata] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!loading && user) {
      const q = query(
        collection(db, "userDetail", user.uid, "notification"),
        orderBy("timestamp", "desc"),
        limit(20)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setNotidata(snapshot.docs.map((doc) => doc.data()));
      });
      return () => unsubscribe();
    }
  }, [loading, user]);
  useEffect(() => {
    // console.log(user);
    if (!loading && user) {
      // console.log(user.uid)
      const q = query(
        collection(db, "chatrooms"),
        where("member", 'array-contains', user.uid),
        orderBy("timestamp", "desc"),
        limit(50)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs)
        setChatNotidata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return () => unsubscribe();
    }
  }, [loading, user]);

  return (
    <NotificationContext.Provider value={{ notidata, chatNotiData }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useTab = () => useContext(OpenedChatContext);
export const useApp = () => useContext(AppContext);
// export const useUser = () => useContext(UserContext);
export const useNotifications = () => useContext(NotificationContext);
