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
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

const AppContext = createContext();
const UserContext = createContext();
const OpenedChatContext = createContext({});
const NotificationContext = createContext({});
const GroupNotiHeaderContext = createContext();
const CharaContext = createContext();

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

const initialState = {
  opentab: "",
  othertab: [],
};

const tabReducer = (state, action) => {
  switch (action.type) {
    case "addTab":
      if (!state.othertab.includes(action.payload)) {
        return {
          ...state,
          othertab: [...state.othertab, action.payload],
        };
      }

    case "removeTab":
      const newtab = state.othertab.filter((v, i) => v != action.payload);
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

  const addTab = (payload) => {
    tabDispatcher({ type: "addTab", payload });
  };
  const removeTab = (payload) => {
    tabDispatcher({ type: "removeTab", payload });
  };
  const changeTab = (payload) => {
    tabDispatcher({ type: "changeOpenTab", payload });
  };
  const CloseTab = () => {
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
        setNotidata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return () => unsubscribe();
    }
  }, [loading, user]);
  useEffect(() => {
    if (!loading && user) {
      const q = query(
        collection(db, "chatrooms"),
        where("member", "array-contains", user.uid),
        orderBy("timestamp", "desc"),
        limit(50)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setChatNotidata(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
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

const initialUser = {
  data: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "addUser":
      return {
        ...state,
        // data: {...state.data, [action.uid]:action.payload}
        data: [...state.data, ...action.docdata],
      };
  }
};

export const UserProvider = ({ children }) => {
  const [data, DataDispatcher] = useReducer(userReducer, initialUser);

  const getUser = async (uid) => {
      let users = [];
      let newuid = uid;
      if (Array.isArray(uid)&&uid.length > 0) {
        uid.map((id) => {
          const user = data.data.find((v) => v.uid == id);
          if (user){
            users = [...users, user];
            newuid = newuid.filter((v,i)=>v!=id);
          }
        });
      } else {
        const user = data.data.find((v) => v.uid == uid);
        if (user){
          users = user;
          newuid = [uid];
        }
      }

      if (newuid.length > 0) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_USE_API_URL}/user/batchget/`, {
          users: newuid,
        })
        
        let docdata = res.data
          DataDispatcher({ type: "addUser", docdata });
          users = [...users, ...docdata]
          return users;
        
      } else {
        return users;
      }
    }
  return (
    <UserContext.Provider value={getUser}>{children}</UserContext.Provider>
  );
};

const initialGroup = {
  data: [],
};

const groupNotiReducer = (state, action) => {
  switch (action.type) {
    case "addGroup":
      return {
        ...state,
        // data: {...state.data, [action.uid]:action.payload}
        data: [...state.data, action.tosend],
      };
  }
};

export const GroupNotiProvider = ({ children }) => {
  const [data, DataDispatcher] = useReducer(groupNotiReducer, initialGroup);

  const getGroupHeader = async (groupId) => {

    const group = data.data.find(v=>v.groupId == groupId);
    if (group) {
      return group
    } else {
      const snapshot = await getDoc(doc(db, "group", groupId));
      if (snapshot.exists()){
        const res = snapshot.data()
        const tosend = {
          ...res,
          thumbnail: res.banner,
          gid: groupId,
          tag: res.tag
        }
        DataDispatcher({ type: "addGroup", tosend })
        return tosend;
      }
      return undefined;
    }
  };
  return (
    <GroupNotiHeaderContext.Provider value={getGroupHeader}>{children}</GroupNotiHeaderContext.Provider>
  );
};

const initialchara = {
  data: [],
};

const charaReducer = (state, action) => {
  switch (action.type) {
    case "addUser":
      return {
        ...state,
        // data: {...state.data, [action.uid]:action.payload}
        data: [...state.data, ...action.userDetail],
      };
  }
};

export const charaProvider = ({ children }) => {
  const [data, DataDispatcher] = useReducer(charaReducer, initialchara);

  const getUser = async (cid, groupId) => {
    if (cid.length > 0) {
      let users = [];
      cid.map((id) => {
        const user = data.data.find((v) => v.cid == id);
        if (user){
          users = [...users, user];
        }
      });
      if (users.length <= 0) { 
        const docData = await getDocs(
          query(collection(db, "userDetail"), where("cid", "in", cid))
        );
        let userDetail = [];
        if (!docData.empty) {
          userDetail = docData.docs.map((doc) => doc.data());
          DataDispatcher({ type: "addUser", userDetail });
          return userDetail;
        }
        
      } else {
        return users;
      }
    }
    return undefined;
  };
  return (
    <UserContext.Provider value={getUser}>{children}</UserContext.Provider>
  );
};

export const useTab = () => useContext(OpenedChatContext);
export const useApp = () => useContext(AppContext);
export const useUser = () => useContext(UserContext);
export const useNotifications = () => useContext(NotificationContext);
export const useGroupHeader = () => useContext(GroupNotiHeaderContext);
export const useChara = () => useContext(CharaContext);
