import React from "react";
import HeaderTheme from "../../components/HeaderTheme/HeaderTheme";

export default function LayoutTheme({ component }) {
  return (
    <div>
      <HeaderTheme />
      <>{component}</>
    </div>
  );
}
