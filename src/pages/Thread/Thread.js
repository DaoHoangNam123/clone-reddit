import React from "react";
import SubBanner from "../SubReddit/Banner/SubBanner";
import DetailThread from "./DetailThread/DetailThread";

export default function Thread() {
  return (
    <div>
      <SubBanner />
      <div id="banner-tab">
        <DetailThread />
      </div>
    </div>
  );
}
