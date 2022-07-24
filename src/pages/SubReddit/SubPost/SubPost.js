import React, { useEffect, useState } from "react";

import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./SubPost.css";
import { subPostService } from "../../../services/subPostService";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem/PostItem";
import { getPost } from "../../../redux/actions/subPostAction";
export default function SubPost() {
  const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState([]);
  let data = useSelector((state) => state.subReducer.data);
  let newPost = useSelector((state) => state.subReducer.newPost);
  let typePost = useSelector((state) => state.subReducer.typePost);
  let dispatch = useDispatch();
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    //Loading hot page
    if (typePost === "hot") {
      subPostService
        .getHotPostList("DotA2", newPost)
        .then((res) => {
          const newPage = res.data.data.after;
          const posts = res.data.data.children.map((obj) => obj.data);
          const postData = [...data, ...posts];
          setLoading(false);
          dispatch(getPost(newPage, postData));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    // Loading new page
    else if (typePost === "new") {
      subPostService
        .getNewPostList("DotA2", newPost)
        .then((res) => {
          const newPage = res.data.data.after;
          const posts = res.data.data.children.map((obj) => obj.data);
          const postData = [...data, ...posts];
          setLoading(false);
          dispatch(getPost(newPage, postData));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    // Loading top page
    else if (typePost === "top") {
      subPostService
        .getTopPostList("DotA2", newPost)
        .then((res) => {
          const newPage = res.data.data.after;
          const posts = res.data.data.children.map((obj) => obj.data);
          const postData = [...data, ...posts];
          setLoading(false);
          dispatch(getPost(newPage, postData));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    // Loading post page
    else {
      subPostService
        .getSubPostList("DotA2", newPost)
        .then((res) => {
          const newPage = res.data.data.after;
          const posts = res.data.data.children.map((obj) => obj.data);
          const postData = [...data, ...posts];
          setLoading(false);
          dispatch(getPost(newPage, postData));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    loadMoreData();
  }, [typePost]);
  return (
    <div>
      <div className="sm:container mx-auto sm:w-3/4 lg:w-2/3">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={true}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 2,
              }}
              active
              className="mt-5"
            />
          }
          pullDownToRefreshThreshold={25}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
          <PostItem postData={data} />
        </InfiniteScroll>
      </div>
    </div>
  );
}
