import axios from "axios";
import { useState } from "react";
import { useApp } from "./local";

const useProfileEditor = (initial) => {
  const { auth } = useApp()
  const [editState, setEditState] = useState(initial);

  const setEditValue = (state, value) => {
    setEditState({ ...editState, [state]: value });
  };
  const getEditValue = (state) => {
    return editState[state];
  };
  const commit = async () => {
    const token = await auth.currentUser.getIdToken();
    axios.post(`${process.env.NEXT_PUBLIC_USE_API_URL}/user/update`, editState, {
        headers: {
          Authorization: token,
        },
      })
  }
  return { setEditValue, getEditValue, commit }
};

export default useProfileEditor;
