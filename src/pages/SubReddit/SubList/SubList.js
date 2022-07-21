import React, { useEffect } from "react";
import "./SortBar.css";
import {
  FireOutlined,
  HeartOutlined,
  RocketOutlined,
  EllipsisOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Button } from "antd";
import SubPost from "../SubPost/SubPost";
import { useDispatch } from "react-redux";
import {
  getHotPost,
  getNewPost,
  getTopPost,
} from "../../../redux/actions/subPostAction";
export default function SubList() {
  const dispatch = useDispatch();
  useEffect(() => {
    let buttons = document.querySelectorAll("#sort-bar button#sort-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let activeButton = document.getElementsByClassName("active");
        let defaultButton = document.getElementsByClassName("default");
        if (defaultButton.length > 0) {
          defaultButton[0].className = defaultButton[0].className.replace(
            "default",
            ""
          );
        }
        if (activeButton.length > 0) {
          activeButton[0].className = activeButton[0].className.replace(
            " active",
            ""
          );
        }
        button.className += " active";
      });
    });
  }, []);
  const menu = (
    <Menu
      items={[
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu item
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item
            </a>
          ),
          key: "1",
        },
      ]}
    />
  );
  return (
    <div className="py-5 mb-5" style={{ backgroundColor: "#eeeff1" }}>
      <div className="container rounded border-gray-300 border mx-auto w-2/3 bg-white p-5 ">
        <div id="sort-bar" className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              id="sort-btn"
              className="flex rounded-2xl justify-center items-center py-1 px-4 default"
              onClick={() => {
                dispatch(getHotPost());
              }}
            >
              <FireOutlined style={{ fontSize: "20px" }} />
              <span className="mx-1 text-base font-bold">Hot</span>
            </button>
            <button
              id="sort-btn"
              className="flex rounded-2xl justify-center items-center py-1 px-4 mx-2"
              onClick={(event) => {
                dispatch(getNewPost());
              }}
            >
              <HeartOutlined style={{ fontSize: "20px" }} />
              <span className="mx-1 text-base font-bold">New</span>
            </button>
            <button
              id="sort-btn"
              className="flex rounded-2xl justify-center items-center py-1 px-4"
              onClick={(event) => {
                dispatch(getTopPost());
              }}
            >
              <RocketOutlined style={{ fontSize: "20px" }} />
              <span className="mx-1 text-base font-bold">Top</span>
            </button>
            <button
              id="sort-btn"
              className="flex rounded-2xl justify-center items-center py-1 px-4"
            >
              <EllipsisOutlined style={{ fontSize: "20px" }} />
            </button>
          </div>
          <div>
            <Dropdown overlay={menu} trigger={["click"]}>
              <button
                id="sort-btn"
                className="flex rounded-2xl justify-center items-center py-1 px-1"
              >
                <MenuFoldOutlined
                  style={{ fontSize: "20px" }}
                  className="mx-2"
                />
                <DownOutlined />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      <SubPost />
    </div>
  );
}
