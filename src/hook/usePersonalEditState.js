import React from "react";
import useProfileEditor from "./useProfileEditor";

const usePersonalEditState = (initialvalue, initialconfig) => {
  const { setEditValue, getEditValue, commit } = useProfileEditor({
    personalvalue: initialvalue,
    personalconfig: initialconfig,
  });
  const getValue = (state) => {
    return getEditValue("personalvalue")[state];
  };
  const getConfig = (state) => {
    return getEditValue("personalconfig")[state];
  };
  const setValue = (state, value) => {
    setEditValue("personalvalue", {...getEditValue("personalvalue"), [state]: value });
  };
  const setConfig = (state, value) => {
    setEditValue("personalconfig", {...getEditValue("personalconfig"), [state]: value });
  };

  return { getValue, getConfig, setValue, setConfig, commit }
};

export default usePersonalEditState;
