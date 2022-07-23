import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
export default function SubBanner() {
  let navigate = useNavigate();
  return (
    <div>
      <div id="banner" className="h-48"></div>
      <div
        id="banner-subreddit"
        className="container mx-auto w-2/3 relative text-left px-24 py-2"
      >
        <div className=" absolute -top-5 left-0">
          <img
            src="https://styles.redditmedia.com/t5_2s580/styles/communityIcon_7fu1ixwtsn661.png?width=256&amp;s=7cf7106da701c2fe71cf4917f429ccf16d84066a"
            className=" w-20 rounded-full"
            alt="reddit banner"
          />
        </div>
        <div className="flex justify-start items-center">
          <h1
            className="text-3xl font-bold mb-0 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Dota 2 on Reddit
          </h1>
          <button
            className="rounded-3xl text-white font-bold w-24 h-10 mx-5"
            style={{ backgroundColor: "#8bb3c8" }}
          >
            Join
          </button>
        </div>
        <span>r/DotA2</span>
      </div>
    </div>
  );
}
