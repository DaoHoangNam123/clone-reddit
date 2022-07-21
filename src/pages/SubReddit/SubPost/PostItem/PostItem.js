import React from "react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  MessageOutlined,
  ShareAltOutlined,
  SaveOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
export default function PostItem({ postData }) {
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
  return (
    <div>
      {postData?.map((post, index) => {
        return (
          <div
            key={index}
            className="flex justify-start items-start hover:border-gray-500 border border-white bg-white  pt-2 px-2 my-3 rounded"
          >
            <div style={{ backgroundColor: "#fcfcfc" }} id="post-vote">
              <div>
                <button id="upvote-btn" className="rounded">
                  <span>
                    <CaretUpOutlined style={{ fontSize: "20px" }} />
                  </span>
                </button>
                <div>
                  <span className="font-bold mb-0 text-xs">
                    {calVote(post.score)}
                  </span>
                </div>
                <button id="downvote-btn" className="rounded">
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
                    u/{post.author}
                  </a>
                </div>
                <div>
                  <span>
                    {" "}
                    {getTime(post.created_utc).hour !== "0"
                      ? getTime(post.created_utc).hour + " hours ago"
                      : getTime(post.created_utc).minute + " minutes ago"}
                  </span>
                </div>
              </div>
              <div>
                <div className="font-medium text-lg text-left">
                  <span>{post.title}</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <p>{post.selftext}</p>
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
