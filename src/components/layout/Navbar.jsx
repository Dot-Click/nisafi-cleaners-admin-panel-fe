import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Tooltip, Typography } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import Gear from "../../assets/icons/Gear";
import Bell from "../../assets/icons/Bell";
import { trimString } from "../../services/helpers";

const { Text } = Typography;

const Navbar = ({ isOpened, setOpened }) => {
  const [pageName, setPageName] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    // ? setting the current page dynamically
    let currentPage = pathname?.split("/");
    currentPage = currentPage[currentPage.length - 1];
    currentPage = currentPage.replace("-", " ");
    setPageName(currentPage);
  }, [pathname]);

  return (
    <Flex justify="space-between" align="center" className="w-100 navbar">
      <Flex
        align="center"
        justify="start"
        gap={16}
        style={{
          padding: "16px",
        }}
      >
        <RxHamburgerMenu
          onClick={() => setOpened(!isOpened)}
          className="menu-icon"
        />
        <Text className="page-name">{pageName}</Text>
      </Flex>

      {/* // ? navbar right side  */}
      <Flex
        justify="space-between"
        align="center"
        gap={10}
        className="proflie-box py-1"
      >
        {/* // ? avatar and username */}
        <Flex align="center">
          <Avatar icon={<UserOutlined />} className="avatar" />
          <Tooltip title="Zubair Arif" className="username-tooltip">
            <Text className="user-name">{trimString("Zubair Arif")}</Text>
          </Tooltip>
        </Flex>
        <Flex>
          {/* // ? notifications and settings */}
          <Flex gap={16} className="notifications-and-settings">
            <Bell />
            <Gear />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
