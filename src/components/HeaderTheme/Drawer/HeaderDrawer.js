import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
export default function HeaderDrawer() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <>
        <button className="flex rounded-2xl justify-center items-center py-1 px-4 border cursor-pointer">
          <UnorderedListOutlined
            style={{ fontSize: "20px" }}
            onClick={showDrawer}
          />
        </button>
        <Drawer
          title="r/DotA2"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <div className="flex gap-1">
            <NavLink to={"/login"}>
              <div
                className="flex justify-center items-center px-2 py-2 rounded-3xl w-20 font-bold cursor-pointer hover:bg-blue-50 duration-150 text-blue"
                style={{ border: "1px solid #509cdf" }}
              >
                Log in
              </div>
            </NavLink>
            <NavLink to={"/register"}>
              <div className="flex justify-center items-center px-2 py-2 mx-4 rounded-3xl w-20 font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer">
                Sign up
              </div>
            </NavLink>
          </div>
        </Drawer>
      </>
    </div>
  );
}
