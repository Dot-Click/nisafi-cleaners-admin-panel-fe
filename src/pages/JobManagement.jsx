import React, { useState } from "react";
import GeneralTable from "../components/table/GeneralTable";
import {
  Button,
  Avatar,
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

const tabList = [
  {
    label: "Open",
    key: "open",
  },
  {
    label: "Completed",
    key: "completed",
  },
  {
    label: "In Progress",
    key: "in-progress",
  },
  {
    label: "Payment Requested",
    key: "paymentRequested",
  },
  {
    label: "Cancelled",
    key: "cancelled",
  },
  {
    label: "Disputed",
    key: "disputed",
  },
];

const JobManagement = () => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabList[0].key);
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
      title: "Name",
      dataIndex: "clientDetail",
      key: "clientDetail",
      render: (_, { clientDetail }) => (
        <Flex gap={10} align="center">
          <Avatar size={"large"} src={clientDetail?.profilePic} className="" />
          <Text>{clientDetail.name}</Text>
        </Flex>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Proposals",
      dataIndex: "proposals",
      key: "proposals",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },

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
        defaultActiveKey={tabList[0].key}
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
        {tabList?.map((tab, index) => (
          <Tabs.TabPane
            key={tab.key}
            tab={<span className="flex gap-2">{tab.label}</span>}
          >
            <FiltersComponents />

            <GeneralTable
              columns={jobCols}
              // data={jobsData?.filter((item) => item.status === tab.key)}
              data={jobsData}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Row>
  );
};

export default JobManagement;
