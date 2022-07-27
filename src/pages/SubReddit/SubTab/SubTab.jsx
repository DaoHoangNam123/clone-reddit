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
            <SubList />
          </TabPane>
          <TabPane tab="New to DoTa 2" key="3">
            <SubList />
          </TabPane>
          <TabPane tab="Read the FAQ" key="4">
            <SubList />
          </TabPane>
          <TabPane tab="Subreddit rules" key="5">
            <SubList />
          </TabPane>
          <TabPane tab="T10 Survival Guide" key="6">
            <SubList />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
