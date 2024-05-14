import React from "react";
import { Col, Flex } from "antd";
import DashboardStatsAside from "../components/dashboard/DashboardStatsAside";
import DashboardStats from "../components/dashboard/DashboardStats";

const Dashboard = () => {
  return (
    <Flex
      justify={"space-between"}
      align="flex-start"
      className="dashboard-container"
    >
      <Col span={"auto"} className="dashboard-stats-container">
        <DashboardStats />
      </Col>
      <Col span={"auto"} className="dashboard-right-aside">
        <DashboardStatsAside />
      </Col>
    </Flex>
  );
};

export default Dashboard;
