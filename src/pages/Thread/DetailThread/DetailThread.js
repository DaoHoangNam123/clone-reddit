import React, { useEffect } from "react";
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
  const thread = useSelector((state) => state.subReducer.threadData);
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
    } else if (post.is_reddit_media_domain && post.is_robot_indexable) {
      return <img src={post.url} alt="reddit image"></img>;
    } else if (post.is_self) {
      let el = document.getElementById("description");
      if (el !== null) {
        let html = he.decode(post.selftext_html);
        let newEl = `<div
          class="text-left text-ellipsis"
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
                  alt="gallery image"
                  style={{ width: "500px", height: "auto" }}
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
      <div id="thread-header" className="bg-black text-white h-10">
        <div className="container w-2/3 mx-auto flex justify-start items-center h-full">
          <div className="flex justify-start items-center">
            <button
              className="rounded upvote-btn"
              onClick={() => {
                dispatch(upVote(thread.score, thread.id));
              }}
            >
              <span>
                <CaretUpOutlined style={{ fontSize: "20px" }} />
              </span>
            </button>
            <div className="mx-2">
              <span className="font-bold mb-0 text-xs">
                {calVote(thread.score)}
              </span>
            </div>
            <button
              className="rounded downvote-btn"
              onClick={() => {
                dispatch(downVote(thread.score, thread.id));
              }}
            >
              <span>
                <CaretDownOutlined style={{ fontSize: "20px" }} />
              </span>
            </button>
          </div>
          <div className="mx-2">
            <div>
              <span className="text-base font-bold">{thread.title}</span>
              <Tag color="cyan">{thread.link_flair_text}</Tag>
            </div>
          </div>
        </div>
      </div>
      <div id="thread-body">
        <div
          className="py-5 mb-5"
          style={{ backgroundColor: "#eeeff1", minHeight: "100vh" }}
        >
          <div
            id="thread-content"
            className="rounded border-gray-300 mx-auto w-2/3 bg-white"
          >
            <div className="flex justify-start items-star bg-white p-2 my-3 rounded">
              <div id="post-vote">
                <div>
                  <button
                    className="rounded upvote-btn"
                    onClick={() => {
                      dispatch(upVote(thread.score, thread.id));
                    }}
                  >
                    <span>
                      <CaretUpOutlined style={{ fontSize: "20px" }} />
                    </span>
                  </button>
                  <div>
                    <span className="font-bold mb-0 text-xs">
                      {calVote(thread.score)}
                    </span>
                  </div>
                  <button
                    className="rounded downvote-btn"
                    onClick={() => {
                      dispatch(downVote(thread.score, thread.id));
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
                  className="flex justify-start items-center text-sm"
                  style={{ color: "#b0b1b3" }}
                >
                  <div>
                    <span>Posted by</span>
                  </div>
                  <div>
                    <a
                      className="mx-1 hover:underline"
                      href="/"
                      style={{ color: "#b0b1b3" }}
                    >
                      post author u/{thread.author}
                    </a>
                  </div>
                  <div>
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
                </div>
                <div>
                  <div className="font-medium text-lg text-left">
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
                  className=" flex justify-start items-center my-2"
                  id="post-comment"
                >
                  <button id="fn-btn" className="py-2 px-2 rounded">
                    <div className=" flex justify-start items-center">
                      <MessageOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">
                        {thread.num_comments} Commnents
                      </span>
                    </div>
                  </button>
                  <button className="py-2 px-2 rounded" id="fn-btn">
                    <div className=" flex justify-start items-center">
                      <ShareAltOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">Share</span>
                    </div>
                  </button>
                  <button className="py-2 px-2 rounded" id="fn-btn">
                    <div className=" flex justify-start items-center">
                      <SaveOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">Save</span>
                    </div>
                  </button>
                  <button id="fn-btn" className="py-2 px-2 rounded">
                    <div>
                      <EyeInvisibleOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">Hide</span>
                    </div>
                  </button>
                  <button id="fn-btn" className="py-2 px-2 rounded">
                    <div>
                      <FlagOutlined style={{ fontSize: "20px" }} />
                      <span className=" text-xs mx-1 font-bold">Report</span>
                    </div>
                  </button>
                </div>
                <div className="rounded border-gray-300 border py-4 px-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span> What are your thoughts? Log in or Sign up</span>
                    </div>
                    <div className="flex justify-center items-center">
                      <NavLink to={"/login"}>
                        <div
                          className=" px-4 py-2 rounded-3xl w-32 font-bold cursor-pointer hover:bg-blue-50 duration-150 text-blue"
                          style={{ border: "1px solid #509cdf" }}
                        >
                          Log in
                        </div>
                      </NavLink>
                      <NavLink to={"/register"}>
                        <div className=" px-4 py-2 mx-4 rounded-3xl w-32 font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer">
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
