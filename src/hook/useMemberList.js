import axios from "axios";
import { useState } from "react";
import { useApp } from "./local";

const useMemberList = (data, gid) => {
  const { auth } = useApp();

  const [member, setMember] = useState(Object.values(data.member));
  const [pendingMember, setPendingMember] = useState(
    data.pendingmember ? Object.values(data.pendingmember) : []
  );
  const [searchResult, setSearchResult] = useState([]);

  const onAcceptPending = async (uid) => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/acceptPlayer`,
      { id: uid },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      setMember([...member, pendingMember.find(v=> v.uid == uid)]);
      setPendingMember(pendingMember.filter((v, i) => v.uid != uid));
    }
    
  };
  const onRejectPending = async (uid) => {
    const token = await auth.currentUser.getIdToken();
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/rejectPendingPlayer`,
      { id: uid },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setPendingMember(pendingMember.filter((v, i) => v.uid != uid));
  };
  const onSearch = (str) => {
    setSearchResult(member.filter((v, i) => v.displayName.includes(str)));
  };
  const onInvite = async (uid) => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/invitePlayer`,
      { id: uid },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      setMember([...member, ...uid]);
    }
  };
  const onRemoveMember = async (uid) => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/removePlayer`,
      { id: uid },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setMember(member.filter((v, i) => v.uid != uid));
  };

  return {
    member,
    pendingMember,
    onAcceptPending,
    onRejectPending,
    searchResult,
    onSearch,
    onInvite,
    onRemoveMember,
  };
};

export default useMemberList;
