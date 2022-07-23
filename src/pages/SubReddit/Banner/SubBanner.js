import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
export default function SubBanner() {
  let navigate = useNavigate();
  return (
    <div>
      <div id="banner" className=" h-80"></div>
      <div
        className=" absolute left-0 md:left-8 top-28 lg:left-16 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="https://styles.redditmedia.com/t5_2s580/styles/bannerPositionedImage_98gge688vp251.png"></img>
      </div>
      <div
        id="banner-subreddit"
        className="container mx-auto lg:w-2/3 w-full relative text-left lg:px-24 py-2"
      >
        <div className="absolute -top-5 left-5 lg:left-0">
          <img
            src="https://styles.redditmedia.com/t5_2s580/styles/communityIcon_7fu1ixwtsn661.png?width=256&amp;s=7cf7106da701c2fe71cf4917f429ccf16d84066a"
            className=" w-20 rounded-full"
            alt="reddit banner"
          />
        </div>
        <div className="flex justify-start items-center pl-28 lg:px-0">
          <h1
            className="lg:text-3xl text-2xl font-bold mb-0 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Dota 2 on Reddit
          </h1>
          <button
            className="rounded-3xl text-white font-bold w-24 py-1 mx-5"
            style={{ backgroundColor: "#8bb3c8" }}
          >
            Join
          </button>
        </div>
        <span className="pl-28 lg:pl-0">r/DotA2</span>
      </div>
    </div>
  );
}
