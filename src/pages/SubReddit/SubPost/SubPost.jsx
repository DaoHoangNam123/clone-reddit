import React, { useEffect, useState } from "react";

import { Divider, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./SubPost.css";
import { subPostService } from "../../../services/subPostService";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem/PostItem";
import { getPost } from "../../../redux/actions/subPostAction";
export default function SubPost() {
  const [loading, setLoading] = useState(false);
  // Get post data from reducer
  let data = useSelector((state) => state.subReducer.data);
  // Get end post id from reducer to call api for next subreddit post list
  let newPost = useSelector((state) => state.subReducer.newPost);
  // Get type of subreddit post call api for hot new and top subreddit post list
  let typePost = useSelector((state) => state.subReducer.typePost);
  let dispatch = useDispatch();

  // Load more data when scroll down
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    //Loading hot page
    if (typePost === "hot") {
      // Call axios for hot subreddit post
      subPostService
        .getHotPostList("DotA2", newPost)
        .then((res) => {
          const newPage = res.data.data.after;
          const posts = res.data.data.children.map((obj) => obj.data);
          const postData = [...data, ...posts];
          setLoading(false);
          // Update data in reducer
          dispatch(getPost(newPage, postData));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    // Loading new page
    else if (typePost === "new") {
      // Call axios for new subreddit post
      subPostService
        .getNewPostList("DotA2", newPost)
        .then((res) => {
          const newPage = res.data.data.after;
          const posts = res.data.data.children.map((obj) => obj.data);
          const postData = [...data, ...posts];
          setLoading(false);
          // Update data in reducer
          dispatch(getPost(newPage, postData));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    // Loading top page
    else if (typePost === "top") {
      // Call axios for top subreddit post
      subPostService
        .getTopPostList("DotA2", newPost)
        .then((res) => {
          const newPage = res.data.data.after;
          const posts = res.data.data.children.map((obj) => obj.data);
          const postData = [...data, ...posts];
          setLoading(false);
          // Update data in reducer
          dispatch(getPost(newPage, postData));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    // Default
    // Loading post page
    else {
      // Call axios for normal subreddit post
      subPostService
        .getSubPostList("DotA2", newPost)
        .then((res) => {
          const newPage = res.data.data.after;
          const posts = res.data.data.children.map((obj) => obj.data);
          const postData = [...data, ...posts];
          setLoading(false);
          // Update data in reducer
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
  }, [typePost]); //re-render when user choose top hot new

  return (
    <div>
      <div className="sm:container mx-auto sm:w-3/4 lg:w-2/3">
        {/* Infinite scroll */}
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
          pullDownToRefreshThreshold={25} //only show 25 post each time
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
          {/* Each subreddit post */}
          <PostItem postData={data} />
        </InfiniteScroll>
      </div>
    </div>
  );
}
