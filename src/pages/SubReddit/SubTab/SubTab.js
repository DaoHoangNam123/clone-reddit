import React from "react";
import { Tabs } from "antd";
import "./SubTab.css";
import SubList from "../SubList/SubList";
const { TabPane } = Tabs;

export default function SubTab() {
  return (
    <div>
      <div className="w-full">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Post" key="1">
            <SubList />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
