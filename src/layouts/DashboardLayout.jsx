import { Flex, Image, Row, Space, Typography } from "antd";

import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
const { Text } = Typography;
const DashboardLayout = () => {
  return (
    <Flex>
      <Sidebar />
      <Flex vertical className="navbar-outlet">
        <Navbar />
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
