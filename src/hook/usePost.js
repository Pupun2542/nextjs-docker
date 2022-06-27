import React from "react";

export const usePost = (data, orderby, loadLimit, pid, reducer) => {
  const [post, setPost] = useState([]);

  const fetchPost = async () => {
    const token = await user.getIdToken();

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${id}?orderby=${orderby}&loadlimit=${loadLimit}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      // console.log(res.data);
      // setPost(res.data);
      let item = {};
      let postId = [];
      res.data.map((data) => {
        item = { ...item, [data.pid]: { data: data, love: data.love } };

        // setStateData({data: data, love: data.love}, data.pid);
        postId = [...postId, data.pid];
      });
      // console.log(item);
      reducer(item);
      setPost(postId);
    }
  };
  const fetchSinglePost = async () => {
    const token = await user.getIdToken();

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${id}/post/${pid}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      setPostData({ [pid]: { data: res.data, love: res.data.love } });
      setPost(pid);
    }
  };

  useEffect(() => {
    if (data && !pid) {
      console.log(data, orderby, loadLimit);
      fetchPost();
    } else if (data && pid) {
      fetchSinglePost();
    }
  }, [data, orderby, loadLimit, pid]);

  const onPostDelete = (n) => {
    const newindex = post.filter((v, i) => i !== n);
    setPost(newindex);
  };

  return { post, onPostDelete };
};
