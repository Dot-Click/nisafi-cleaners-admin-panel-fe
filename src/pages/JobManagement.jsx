import React, { useState } from "react";
import GeneralTable from "../components/table/GeneralTable";
import {
  Button,
  Dropdown,
  Flex,
  Input,
  Row,
  Select,
  Typography,
  Tabs,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import UserDetailsModal from "../components/layout/UserDetailsModal";
import { userData, jobsData } from "../data/data";
import ChevronDown from "../assets/icons/ChevronDown";
import { UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
import { WashingMachine } from "lucide-react";

const JobManagement = () => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    try {
      setModalOpen(false);
      setRecord(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const jobCols = [
    {
      title: "Sr",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registration Date",
      dataIndex: "register",
      key: "register",
    },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   key: "role",
    //   render: (_, { role }) => (
    //     <Tag
    //       color={role === "worker" ? "magenta" : "gold"}
    //       className="role"
    //       key={role}
    //     >
    //       {role?.toUpperCase()}
    //     </Tag>
    //   ),
    // },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => hanldeViewDetails(record)}
          className="primary-btn"
        >
          View Detail
        </Button>
      ),
    },
  ];

  const FiltersComponents = () => {
    return (
      <Row className="search-box" justify="space-between">
        <Input
          className="search-input"
          size="large"
          placeholder="Search..."
          prefix={<SearchOutlined />}
        />

        {/* // ? filters */}
        <Flex align="center" className="filters" gap={10}>
          {/* // ? sort by filter */}
          <Flex className="filter" align="center">
            <Text className="lebal">Sort By:</Text>
            <Select
              defaultValue="newest"
              suffixIcon={<ChevronDown />}
              options={[
                {
                  value: "newest",
                  label: "Newest",
                },
                {
                  value: "oldest",
                  label: "Oldest",
                },
              ]}
            />
          </Flex>

          {/* // ? sort by filter */}
          <Flex className="filter" align="center">
            <Text className="lebal">Role:</Text>
            <Select
              defaultValue="all"
              suffixIcon={<ChevronDown />}
              options={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "customer",
                  label: "Customer",
                },
                {
                  value: "worker",
                  label: "Worker",
                },
              ]}
            />
          </Flex>
        </Flex>
      </Row>
    );
  };

  return (
    <Row className=" d-block user-management-container">
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={handleTabChange}
        className="px-4"
        tabBarStyle={{
          color: "red !important",
        }}
        style={{
          color: "red !important",
        }}
        popupClassName="text-red-500"
      >
        <Tabs.TabPane
          tab={<span className="flex gap-2">Completed</span>}
          key="1"
        >
          <FiltersComponents />

          <GeneralTable
            columns={jobCols}
            data={jobsData?.filter((item) => item.status === "completed")}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<span className="flex gap-2">Delivered</span>}
          key="2"
        >
          <FiltersComponents />
          <GeneralTable
            columns={jobCols}
            data={jobsData?.filter((item) => item.status === "delivered")}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<span className="flex gap-2">Disputed</span>}
          key="3"
        >
          <FiltersComponents />
          <GeneralTable
            columns={jobCols}
            data={jobsData?.filter((item) => item.status === "disputed")}
          />
        </Tabs.TabPane>
      </Tabs>
    </Row>
  );
};

export default JobManagement;
