import { Col, Flex } from "antd";
import DashboardStats from "../components/dashboard/DashboardStats";

const Dashboard = () => {
  return (
    <Flex
      justify={"space-between"}
      align="flex-start"
      className="dashboard-container w-full"
    >
      <Col span={24} className="dashboard-stats-container">
        <DashboardStats />
      </Col>
    </Flex>
  );
};

export default Dashboard;
