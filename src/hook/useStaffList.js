import axios from "axios";
import React, { useRef, useState } from "react";
import { useApp } from "./local";

const useStaffList = (data, gid) => {
  const dataref= useRef(data)
  const [staff, setStaff] = useState(dataref.current);
  const [loading, setLoading] = useState(false);
  const { auth } = useApp();

  const getStaff = () => {
    return Object.values(staff);
  };
  const addStaff = (uid, detail) => {
    setStaff({ ...staff, [uid]: detail });
  };
  const removeStaff = (uid) => {
    const removedobj = Object.entries(staff).filter(([k, v], i) => k !== uid);
    setStaff(Object.fromEntries(removedobj));
  };



  const commitStaffChange = async () => {
    setLoading(true);
    const newstaff = Object.keys(staff).filter(
      (v, i) => !Object.keys(dataref.current).includes(v)
    );
    const removedstaff = Object.keys(dataref.current).filter(
      (v, i) => !Object.keys(staff).includes(v)
    );
    const token = await auth.currentUser.getIdToken();
    const promises = [];
    if (newstaff.length > 0) {
        const addstaffpromise = newstaff.map((uid) => {
          return axios.post(
            `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/addstaff`,
            { id: uid },
            {
              headers: {
                Authorization: token,
              },
            }
          );
        })
        promises = [...promises, addstaffpromise];
    }
    if (removedstaff.length > 0) {
      const removestaffpromise = removedstaff.map((uid) => {
          return axios.post(
            `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/removestaff`,
            { id: uid },
            {
              headers: {
                Authorization: token,
              },
            }
          );
        })
      promises = [...promises, removestaffpromise];
    }
    const res = await Promise.all(promises);
    dataref.current = staff;
    setLoading(false); 
    alert("แก้ไขเรียบร้อย");
  };
  return { getStaff, addStaff, removeStaff, commitStaffChange, loading };
};

export default useStaffList;
