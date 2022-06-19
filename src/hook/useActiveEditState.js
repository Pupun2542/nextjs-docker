import React, { useState } from "react";
import useProfileEditor from "./useProfileEditor";

const useActiveEditState = (initialvalue) => {
  const { setEditValue, getEditValue, commit } = useProfileEditor({
    active: initialvalue,
  });
  const front = getEditValue("active").front;
  const setFront = (value) => {
    setEditValue("front", {...getEditValue("active"), front:value});
  };
  const back = getEditValue("active").back;
  const setBack = (value) => {
    setEditValue("active", {...getEditValue("active"), back:value});
  };
  const time = getEditValue("active").time;
  const setTime = (value) => {
    setEditValue("active", {...getEditValue("active"), time:value});
  };
  return { front, setFront, back, setBack, time, setTime, commit };
};

export default useActiveEditState;
