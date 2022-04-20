// import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { createContext, Context, useContext, useEffect, useMemo, useState } from "react";
// import { useApp } from "./local";

// const UserContext = createContext();

// const app = useApp();
// const db = getFirestore(app);

// export const UserProvider = ({ children }) => {
//     const [data, setData] = useState(null);

//     useMemo(()=>{
//         getDocs(collection(db, "userDetail")).then((docs=>setData(docs.docs)))
//     },[db])


//   return (
//     <UserContext.Provider value={data}>{children}</UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);