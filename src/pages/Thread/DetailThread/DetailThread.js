import React, { useEffect, useState } from "react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  MessageOutlined,
  ShareAltOutlined,
  SaveOutlined,
  EyeInvisibleOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { Carousel, Tag } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { threadService } from "../../../services/threadPostService";
import { useDispatch, useSelector } from "react-redux";
import {
  downVote,
  getThread,
  upVote,
} from "../../../redux/actions/subPostAction";
import he from "he";
import ReactPlayer from "react-player";
import ReactHlsPlayer from "react-hls-player";
export default function DetailThread() {
  const threadData = useSelector((state) => state.subReducer.threadData);
  const [thread, setThread] = useState({});
  const getTime = (time) => {
    const postHour = new Date(time * 1000);
    const currentHour = new Date();
    let hour = ((currentHour - postHour) / 3600000).toFixed(0);
    let minute = ((currentHour - postHour) / 60000).toFixed(0);
    let second = ((currentHour - postHour) / 1000).toFixed(0);
    let timePost = {
      hour,
      minute,
      second,
    };
    return timePost;
  };
  let dispatch = useDispatch();
  let id = useParams();
  const calVote = (vote) => {
    let score = "";
    if (vote * 1 > 1000) {
      score = ((vote * 1) / 1000).toFixed(2);
      score += "K";
    } else {
      score = vote;
    }
    return score;
  };
  useEffect(() => {
    let fetchData = async () => {
      let result = await threadService.getThread(`${id.id}/${id.title}`);
      dispatch(getThread(result.data[0].data.children[0].data));
      setThread(result.data[0].data.children[0].data);
    };
    fetchData();
  }, []);
  let renderPost = (post) => {
    if (post.is_video) {
      return (
        <div className="flex justify-center items-center">
          <ReactHlsPlayer
            src={post.media.reddit_video.hls_url}
            autoPlay={false}
            controls={true}
            width="80%"
            height="auto"
          />
        </div>
      );
    } else if (
      post.is_reddit_media_domain &&
      post.is_robot_indexable &&
      !post.is_self
    ) {
      return (
        <div className={`${post.id}`}>
          <img src={post.url} alt={`${post.id} reddit`}></img>;
        </div>
      );
    } else if (post.is_self) {
      let el = document.getElementById("description");
      if (el !== null) {
        let html = he.decode(post.selftext_html);
        let newEl = `<div
          class="text-left text-ellipsis overflow-hidden"
        >${html}</div>`;
        el.innerHTML = newEl;
      }
    } else if (post.is_gallery) {
      let myData = Object.keys(post.media_metadata).map(
        (key) => post.media_metadata[key]
      );
      return (
        <Carousel>
          {myData.map((item, index) => {
            return (
              <div key={index} className="justify-center items-center">
                <img
                  src={he.decode(item.s.u)}
                  alt="gallery"
                  style={{ width: "400px", height: "auto" }}
                ></img>
              </div>
            );
          })}
        </Carousel>
      );
    } else if (post.is_robot_indexable && post.media_embed !== {}) {
      let el = document.getElementById(post.id);
      if (el !== null) {
        if (post.media_embed.content === undefined) {
          return (
            <div className="text-left underline">
              <a href={post.url}>{post.url}</a>
            </div>
          );
        } else {
          return (
            <div className="flex justify-center items-center">
              <ReactPlayer url={post.url} playing={false}></ReactPlayer>
            </div>
          );
        }
      }
    }
  };

  return (
    <div>
      <div id="thread-header" className="bg-black text-white h-max">
        <div className="container lg:w-2/3 w-full mx-auto flex justify-start items-center py-2">
          <div className="flex justify-start items-center">
            <button
              className="rounded upvote-btn"
              onClick={() => {
                dispatch(upVote(threadData.score, thread.id));
              }}
            >
              <span>
                <CaretUpOutlined style={{ fontSize: "20px" }} />
              </span>
            </button>
            <div className="mx-2">
              <span className="font-bold mb-0 text-xs">
                {calVote(threadData.score)}
              </span>
            </div>
            <button
              className="rounded downvote-btn"
              onClick={() => {
                dispatch(downVote(threadData.score, thread.id));
              }}
            >
              <span>
                <CaretDownOutlined style={{ fontSize: "20px" }} />
              </span>
            </button>
          </div>
          <div className="mx-4">
            <div className=" flex flex-col md:flex-row justify-center items-start w-full">
              <span className="text-base font-bold text-left">
                {thread.title}
              </span>
              <Tag color="cyan">{thread.link_flair_text}</Tag>
            </div>
          </div>
        </div>
      </div>
      <div id="thread-body">
        <div
          className="lg:py-5 py-2 mb-5"
          style={{ backgroundColor: "#eeeff1", minHeight: "100vh" }}
        >
          <div
            id="thread-content"
            className="rounded border-gray-300 mx-auto lg:w-2/3 w-full bg-white"
          >
            <div className="flex justify-start items-star bg-white p-2 my-3 rounded">
              <div id="post-vote">
                <div>
                  <button
                    className="rounded upvote-btn"
                    onClick={() => {
                      dispatch(upVote(threadData.score, thread.id));
                    }}
                  >
                    <span>
                      <CaretUpOutlined style={{ fontSize: "20px" }} />
                    </span>
                  </button>
                  <div>
                    <span className="font-bold mb-0 text-xs">
                      {calVote(threadData.score)}
                    </span>
                  </div>
                  <button
                    className="rounded downvote-btn"
                    onClick={() => {
                      dispatch(downVote(threadData.score, thread.id));
                    }}
                  >
                    <span>
                      <CaretDownOutlined style={{ fontSize: "20px" }} />
                    </span>
                  </button>
                </div>
              </div>
              <div
                className="px-2 container"
                style={{ width: "100%" }}
                id="post-header"
              >
                <div
                  className="text-sm w-full text-left"
                  style={{ color: "#b0b1b3" }}
                >
                  <span>Posted by</span>
                  <a
                    className="mx-1 hover:underline"
                    href="/"
                    style={{ color: "#b0b1b3" }}
                  >
                    u/{thread.author}
                  </a>
                  <span>
                    {" "}
                    {getTime(thread.created_utc).hour !== "0"
                      ? getTime(thread.created_utc).hour > 24
                        ? (getTime(thread.created_utc).hour / 24).toFixed(0) +
                          " days ago"
                        : getTime(thread.created_utc).hour + " hours ago"
                      : getTime(thread.created_utc).minute + " minutes ago"}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-lg text-left mb-2">
                    <span>{thread.title}</span>
                    <Tag color="cyan">{thread.link_flair_text}</Tag>
                  </div>
                </div>
                <div>
                  <div>
                    <div id="description">
                      {thread.crosspost_parent_list
                        ? renderPost(thread.crosspost_parent_list[0])
                        : renderPost(thread)}
                    </div>
                  </div>
                </div>
                <div
                  className=" flex flex-wrap justify-start items-center my-2"
                  id="post-comment"
                >
                  <button className="py-2 px-2 rounded fn-btn">
                    <div className=" flex justify-start items-center">
                      <MessageOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">
                        {thread.num_comments} Commnents
                      </span>
                    </div>
                  </button>
                  <button className="py-2 px-2 rounded fn-btn">
                    <div className=" flex justify-start items-center">
                      <ShareAltOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">Share</span>
                    </div>
                  </button>
                  <button className="py-2 px-2 rounded fn-btn">
                    <div className=" flex justify-start items-center">
                      <SaveOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">Save</span>
                    </div>
                  </button>
                  <button className="py-2 px-2 rounded fn-btn">
                    <div>
                      <EyeInvisibleOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">Hide</span>
                    </div>
                  </button>
                  <button className="py-2 px-2 rounded fn-btn">
                    <div>
                      <FlagOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">Report</span>
                    </div>
                  </button>
                </div>
                <div className="rounded border-gray-300 border py-4 px-3">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <span> What are your thoughts? Log in or Sign up</span>
                    </div>
                    <div className="flex justify-center items-center">
                      <NavLink to={"/login"}>
                        <div
                          className=" px-4 py-2 rounded-3xl w-20 text-sm lg:w-32 font-bold cursor-pointer hover:bg-blue-50 duration-150 text-blue"
                          style={{ border: "1px solid #509cdf" }}
                        >
                          Log in
                        </div>
                      </NavLink>
                      <NavLink to={"/register"}>
                        <div className=" px-2 lg:px-4  py-2 mx-4 rounded-3xl w-20 text-sm lg:w-32 font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer">
                          Sign up
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
