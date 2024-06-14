import { Flex, Breadcrumb } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = () => {
  const [isAsideOpened, setAsideOpened] = useState(false);

  return (
    <Flex>
      <Sidebar isOpened={isAsideOpened} setOpened={setAsideOpened} />
      <Flex vertical className="navbar-outlet">
        <Navbar isOpened={isAsideOpened} setOpened={setAsideOpened} />

        <Outlet />
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
