import React, { useState } from "react";

export const useGroupData = (gid, user) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    const token = await user.getIdToken();
    const resdata = await axios.get(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (resdata.status === 200) {
      let mappedData = {
        ...data,
        ...resdata.data,
        isStaff: Object.keys(resdata.data.staff).includes(user.uid),
      };
      if (resdata.data.chara) {
        console.log(resdata.data.chara);
        console.log(
          Object.fromEntries(
            Object.entries(resdata.data.chara).filter(
              ([k, v], i) => v.parentId == user.uid
            )
          )
        );
        mappedData = {
          ...mappedData,
          mychara: Object.fromEntries(
            Object.entries(resdata.data.chara).filter(
              ([k, v], i) => v.parentId == user.uid
            )
          ),
        };
      }
      setData(mappedData);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gid && user) {
      fetchdata();
    }
  }, [gid, user]);

  const onRefresh = () => {
    fetchdata();
  }

  return {data, loading, onRefresh}

};
