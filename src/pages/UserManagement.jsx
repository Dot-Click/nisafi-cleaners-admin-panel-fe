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
import { userData, workerData } from "../data/data";
import ChevronDown from "../assets/icons/ChevronDown";
import { UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const UserManagement = () => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  const hanldeViewDetails = (data) => {
    try {
      setRecord(data);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

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

  const custCols = [
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

        // {/* <Dropdown
        //   menu={{
        //     items: [
        //       {
        //         key: "1",
        //         label: (
        //           <Text
        //             onClick={() => hanldeViewDetails(record)}
        //             className="d-flex justify-content-center text-center view-details-btn"
        //           >
        //             View Detail
        //           </Text>
        //         ),
        //       },
        //       {
        //         key: "2",
        //         label: <Button className="primary-btn">Accept</Button>,
        //       },
        //       {
        //         key: "3",
        //         label: <Button className="danger-btn">Reject</Button>,
        //       },
        //     ],
        //   }}
        // >
        //   <svg
        //     className="cursor-pointer"
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="7"
        //     height="22"
        //     fill="none"
        //     viewBox="0 0 7 22"
        //   >
        //     <path
        //       fill="#000"
        //       fillOpacity="0.53"
        //       d="M3.143 22a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286zM3.143 14.143a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286zM3.143 6.286a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286z"
        //     ></path>
        //   </svg>
        // </Dropdown> */}
      ),
    },
  ];
  const workerCols = [
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
          onClick={() => navigate("/dashboard/user/worker-info")}
          className="primary-btn"
        >
          View Detail
        </Button>
        // {/* <Dropdown
        //   menu={{
        //     items: [
        //       {
        //         key: "1",
        //         label: (
        //           <Text
        //             onClick={() => hanldeViewDetails(record)}
        //             className="d-flex justify-content-center text-center view-details-btn"
        //           >
        //             View Detail
        //           </Text>
        //         ),
        //       },
        //       {
        //         key: "2",
        //         label: <Button className="primary-btn">Accept</Button>,
        //       },
        //       {
        //         key: "3",
        //         label: <Button className="danger-btn">Reject</Button>,
        //       },
        //     ],
        //   }}
        // >
        //   <svg
        //     className="cursor-pointer"
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="7"
        //     height="22"
        //     fill="none"
        //     viewBox="0 0 7 22"
        //   >
        //     <path
        //       fill="#000"
        //       fillOpacity="0.53"
        //       d="M3.143 22a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286zM3.143 14.143a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286zM3.143 6.286a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286z"
        //     ></path>
        //   </svg>
        // </Dropdown> */}
      ),
    },
  ];

  console.log("active tab", activeTab);

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
          // style={{ backgroundColor: "blue" }}
          tab={
            <span className="flex gap-2">
              <UsersRound />
              Customer
            </span>
          }
          key="1"
        >
          <FiltersComponents />
          <GeneralTable columns={custCols} data={userData} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="flex gap-2">
              <UsersRound />
              Worker
            </span>
          }
          key="2"
        >
          <FiltersComponents />

          <GeneralTable columns={workerCols} data={workerData} />
        </Tabs.TabPane>
      </Tabs>

      {/* // ? user details modal */}
      <UserDetailsModal
        isOpened={isModalOpened}
        data={record}
        handleCloseModal={handleCloseModal}
      />
    </Row>
  );
};

export default UserManagement;
