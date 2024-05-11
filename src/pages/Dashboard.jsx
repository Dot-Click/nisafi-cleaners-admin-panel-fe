import React from "react";
import { Row, Col } from "antd";
import DashboardStatsAside from "../components/dashboard/DashboardStatsAside";
import DashboardStats from "../components/dashboard/DashboardStats";

const Dashboard = () => {
  return (
    <Row justify={"space-between"}>
      <Col span={"auto"} className="dashboard-stats-container">
        <DashboardStats />
      </Col>
      <Col span={"auto"} className="dashboard-right-aside">
        <DashboardStatsAside />
      </Col>
    </Row>
  );
};

export default Dashboard;
