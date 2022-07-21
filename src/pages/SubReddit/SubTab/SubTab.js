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
          <TabPane tab="Predictions" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="New to Dota 2" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Read the FAQ" key="4">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Subreddit Rules" key="5">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
