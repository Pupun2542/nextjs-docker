import React, { useReducer, createContext } from "react";
export const PostContext = createContext();
const Postsection = ({ data, children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "set": {
        return {
          ...state,
          [action.id]: { ...state[action.id], ...action.value },
        };
      }
      case "setMultiple": {
        return { ...state, ...action.value };
      }
      default:
        return state;
    }
  };

  const [postData, dispatch] = useReducer(reducer, {});

  //main
  const setStateData = (value, id) => {
    dispatch({ type: "set", value: value, id: id });
  };
  const getStateData = (id) => {
    return postData[id];
  };

  //data
  const setStateDataData = (value, id) => {
    dispatch({ type: "set", value: { data: value }, id: id });
  };
  const getStateDataData = (id) => {
    return postData[id]?.data;
  };

  //editMessage
  const setStateDataEditMessage = (value, id) => {
    dispatch({ type: "set", value: { editMessage: value }, id: id });
  };
  const getStateDataEditMessage = (id) => {
    return postData[id]?.editMessage ? postData[id].editMessage : "";
  };

  //pendingMessage
  const setStateDataPendingMessage = (value, id) => {
    dispatch({ type: "set", value: { pendingMessage: value }, id: id });
  };
  const getStateDataPendingMessage = (id) => {
    return postData[id]?.pendingMessage ? postData[id].pendingMessage : "";
  };
  //pendingImage
  const setStateDataPendingImage = (value, id) => {
    dispatch({ type: "set", value: { pendingImage: value }, id: id });
  };
  const getStateDataPendingImage = (id) => {
    return postData[id]?.pendingImage;
  };
  //love
  const setStateDataLove = (value, id) => {
    dispatch({ type: "set", value: { love: value }, id: id });
  };
  const getStateDataLove = (id) => {
    return postData[id]?.love ? postData[id]?.love : [];
  };

  //edit
  const setStateDataEdit = (state, id) => {
    dispatch({ type: "set", value: { edit: state }, id: id });
  };
  const getStateDataEdit = (id) => {
    return postData[id]?.edit ? postData[id].edit : false;
  };

  //reply
  const setStateDataReply = (state, id) => {
    dispatch({ type: "set", value: { reply: state }, id: id });
  };
  const getStateDataReply = (id) => {
    return postData[id]?.reply ? postData[id].reply : false;
  };
  const pack = {
    setStateData,
    getStateData,
    setStateDataData,
    getStateDataData,
    setStateDataEditMessage,
    getStateDataEditMessage,
    setStateDataPendingMessage,
    getStateDataPendingMessage,
    setStateDataPendingImage,
    getStateDataPendingImage,
    setStateDataLove,
    getStateDataLove,
    setStateDataEdit,
    getStateDataEdit,
    setStateDataReply,
    getStateDataReply,
  };

  return <PostContext.Provider value={pack}>{children}</PostContext.Provider>;
};

export default Postsection;
