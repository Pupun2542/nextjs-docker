import React, { useState } from "react";
import axios from "axios";

const useFriendManager = () => {
  const [friend, setFriend] = useState(0);
  const handleAddFriend = async (id, user) => {
    const token = await user.getIdToken();
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/user/addfriend`,
      {
        uid: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setFriend(1);
  };

  const handleRemoveAddFriend = async (id, user) => {
    const token = await user.getIdToken();
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/user/removeaddfriend`,
      {
        uid: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setFriend(0);
  };

  const handleAcceptFriend = async (id, user) => {
    const token = await user.getIdToken();
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/user/acceptfriend`,
      {
        uid: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setFriend(2);
  };

  const handleRejectFriend = async (id, user) => {
    const token = await user.getIdToken();
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/user/rejectfriend`,
      {
        uid: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setFriend(0);
  };

  const handleRemoveFriend = async (id, user) => {
    const token = await user.getIdToken();
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/user/removefriend`,
      {
        uid: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setFriend(0);
  };
  return {
    friend,
    setFriend,
    handleAddFriend,
    handleRemoveAddFriend,
    handleAcceptFriend,
    handleRejectFriend,
    handleRemoveFriend,
  };
};

export default useFriendManager;
