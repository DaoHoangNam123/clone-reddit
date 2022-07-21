import React from "react";
import SubBanner from "./Banner/SubBanner";
import SubTab from "./SubTab/SubTab";

export default function SubReddit() {
  return (
    <div id="scrollableDiv">
      <SubBanner />
      <div id="banner-tab">
        <SubTab />
      </div>
    </div>
  );
}
