import React from "react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  MessageOutlined,
  ShareAltOutlined,
  SaveOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import "./PostItem.css";
import { Carousel, Tag } from "antd";
import he from "he";
import ReactPlayer from "react-player";
import ReactHlsPlayer from "react-hls-player";
import { useDispatch } from "react-redux";
import { downVote, upVote } from "../../../../redux/actions/subPostAction";
import { useNavigate } from "react-router-dom";
export default function PostItem({ postData }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
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
  const getPath = (title, author) => {
    let stringArray = title.toLowerCase().replaceAll(" ", "_");
    let onlyLettersArray = stringArray
      .split("")
      .filter((char) => /[a-zA-Z_]/.test(char));
    let path = `${author}/${onlyLettersArray.join("")}`;
    return path;
  };
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
  let renderPost = (post) => {
    if (post.is_video) {
      return (
        <div className="flex justify-center items-center">
          <ReactHlsPlayer
            src={post.media.reddit_video.hls_url}
            autoPlay={false}
            controls={true}
            width="50%"
            height="auto"
          />
        </div>
      );
    } else if (post.is_reddit_media_domain && post.is_robot_indexable) {
      return (
        <div className="flex justify-center items-center">
          <img src={post.url} alt="reddit image" style={{ width: "80%" }}></img>
        </div>
      );
    } else if (post.is_self) {
      let el = document.getElementById(post.id);
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
                  alt="gallery image"
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
      {postData?.map((post, index) => {
        return (
          <div
            key={index}
            className="flex justify-start items-start hover:border-gray-500 border border-white bg-white pt-2  pl-2 pr-5 my-3 rounded"
          >
            <div style={{ backgroundColor: "#fcfcfc" }} id="post-vote">
              <div>
                <button
                  id={post.id + "-upvote-btn"}
                  className="rounded upvote-btn"
                  onClick={() => {
                    dispatch(upVote(post.score, post.id));
                  }}
                >
                  <span>
                    <CaretUpOutlined style={{ fontSize: "20px" }} />
                  </span>
                </button>
                <div>
                  <span className="font-bold mb-0 text-xs">
                    {calVote(post.score)}
                  </span>
                </div>
                <button
                  id={post.id + "-downvote-btn"}
                  className="rounded downvote-btn"
                  onClick={() => {
                    dispatch(downVote(post.score, post.id));
                  }}
                >
                  <span>
                    <CaretDownOutlined style={{ fontSize: "20px" }} />
                  </span>
                </button>
              </div>
            </div>
            <div
              className="px-2 container w-full"
              style={{ width: "100%" }}
              id="post-header"
              onClick={() => {
                navigate(`/r/DotA2/comments/${getPath(post.title, post.id)}`);
              }}
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
                    u/{post.author}
                  </a>
                </div>
                <div>
                  <span>
                    {" "}
                    {getTime(post.created_utc).hour !== "0"
                      ? getTime(post.created_utc).hour > 24
                        ? (getTime(post.created_utc).hour / 24).toFixed(0) +
                          " days ago"
                        : getTime(post.created_utc).hour + " hours ago"
                      : getTime(post.created_utc).minute + " minutes ago"}
                  </span>
                </div>
              </div>
              <div>
                <div className="font-medium text-lg text-left mb-1">
                  <span>{he.decode(post.title)}</span>
                  <Tag color="cyan">{post.link_flair_text}</Tag>
                </div>
              </div>
              <div>
                <div>
                  <div id={post.id} className="overflow-hidden">
                    {post.crosspost_parent_list
                      ? renderPost(post.crosspost_parent_list[0])
                      : renderPost(post)}
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
                      {post.num_comments} Commnents
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
                    <EllipsisOutlined style={{ fontSize: "20px" }} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
