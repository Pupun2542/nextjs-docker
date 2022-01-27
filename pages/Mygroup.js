// import React, { useState } from "react";
// import { Container,SSRProvider, Row, Col } from "react-bootstrap";
// import CustomNavbar from "../components/navbar";
// import {
//   getFirestore,
//   getDoc,
//   query,
//   QuerySnapshot,
//   collection,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import Link from "next/link";
// import { async } from "@firebase/util";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRouter } from "next/router";
// import GroupSidebar from "../components/GroupSidebar";
// import { useApp } from "../src/hook/local";

// export default function Mygroup() {
//   const app = useApp();
//   const db = getFirestore(app);
//   const auth = getAuth(app);
//   const Router = useRouter();
//   // const [data, setData] = useState([]);

//   const CurrentUser = () => {
//     const [user, loading, error] = useAuthState(auth);
//     if (loading) {
//       return (
//         <SSRProvider>
//           <CustomNavbar />
//         </SSRProvider>
//       );
//     }
//     if (error) {
//       return (
//         <div>
//           <p>Error: {error}</p>
//         </div>
//       );
//     }

//     if (user) {
//       // console.log("test")
//       // let data = [];
//       // const Fetchdata = async()=>{
//       //   const q = query(
//       //     collection(db, "group"),
//       //     where("Creator", "==", auth.currentUser.uid)
//       //   );
//       //   const QuerySnapshot = await getDocs(q);
//       //   setCommu(QuerySnapshot.docs.map((doc)=>({...doc.data()})));
//       // }
//       // Fetchdata()
//       return (
//         <div>
//           <CustomNavbar />
//           <div>
//           </div>
//             <Row>
//               <Col md={3}>
//                 <h1>menubar</h1>
//                 <GroupSidebar/>
//               </Col>
//               <Col md={6}>
//                 <h1>Content</h1>
//               </Col>
//               <Col md={3}>
//                 <h1>Something</h1>
//               </Col>
//             </Row>
//         </div>
//       );
//     }
//     return Router.push("/login");
//   };

//   return CurrentUser();
// }