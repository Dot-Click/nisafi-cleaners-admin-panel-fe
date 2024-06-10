import React, { useEffect, useState } from "react";
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
  Avatar,
  Pagination,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import UserDetailsModal from "../components/layout/UserDetailsModal";
import ChevronDown from "../assets/icons/ChevronDown";
import { useNavigate } from "react-router-dom";
import { useUserManagementStore } from "../stores/userManagementStore";
import { useShallow } from "zustand/react/shallow";
import { baseURL } from "../configs/axiosConfig";
import { getTimeFromNow } from "../utils";

const { Text } = Typography;
const UserManagement = () => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [role, setrole] = useState("worker");
  const [activeTab, setActiveTab] = useState("1");
  const [record, setRecord] = useState(null);
  const [filter, setFilter] = useState("desc");
  const navigate = useNavigate();
  const {
    // func
    fetchUsers,
    // data
    userList,
    // loaders
    usersLoader,
  } = useUserManagementStore(useShallow((state) => state));

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
  const [currentPage, setCurrentPage] = useState(1);

  const paginationHandler = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleTabChange = (key) => {
    if (key === "1") {
      setrole("worker");
    } else {
      setrole("client");
    }
    setCurrentPage(1);
    setFilter("desc");
    setActiveTab(key);
  };

  const handleSort = (value) => {
    setFilter(value);
  };

  const handleSearch = async (e) => {
    console.log("handleSearch........e", e.target.value);
    await fetchUsers(role, currentPage, e.target.value, "");
  };

  const onChange = async (e) => {
    if (e.target.value === "") {
      console.log("onChange Run");
      await fetchUsers(role, currentPage, e.target.value, filter);
    }
  };

  useEffect(() => {
    fetchUsers(role, currentPage, "", filter);
  }, [role, filter]);

  const custCols = [
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
      dataIndex: "createdAt",
      key: "createdAt",
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name, profilePic }) => (
        <Flex gap={10} align="center">
          {!profilePic ? (
            <Avatar size={"large"} src={baseURL + profilePic} className="" />
          ) : (
            <Avatar size={"large"} style={{ backgroundColor: "#87d068" }}>
              {name?.charAt(0)?.toUpperCase()}
            </Avatar>
          )}

          <Text>{name}</Text>
        </Flex>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Registration Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    // color={role === "worker" ? "magenta" : "gold"}
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => navigate(`/dashboard/user/worker-info/${record._id}`)}
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

  const FiltersComponents = () => {
    return (
      <Row className="search-box" justify="space-between">
        <Input
          className="search-input"
          size="large"
          placeholder="Search..."
          onPressEnter={handleSearch}
          onChange={onChange}
          prefix={<SearchOutlined />}
        />

        <Flex align="center" className="filters" gap={10}>
          {/* // ? sort by filter */}
          <Flex className="filter" align="center">
            <Text className="lebal">Sort By:</Text>
            <Select
              defaultValue="Newest"
              onChange={handleSort}
              suffixIcon={<ChevronDown />}
              options={[
                {
                  value: "desc",
                  label: "Newest",
                },
                {
                  value: "asc",
                  label: "Oldest",
                },
              ]}
            />
          </Flex>
        </Flex>
      </Row>
    );
  };

  const PaginationComponent = () => {
    return (
      <div className="flex items-center justify-center my-6">
        <Pagination
          className="border-0 border-red-500"
          total={12}
          pageSize={10}
          showQuickJumper={false}
          showTitle={false}
          showSizeChanger={false}
          responsive
          current={currentPage}
          onChange={(page, pageSize) => paginationHandler(page, pageSize)}
        />
      </div>
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
        <Tabs.TabPane tab={<span className="flex gap-2">Worker</span>} key="1">
          <FiltersComponents />

          <GeneralTable
            columns={workerCols}
            data={userList}
            loading={usersLoader}
          />
          <PaginationComponent />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<span className="flex gap-2">Customer</span>}
          key="2"
        >
          <FiltersComponents />
          <GeneralTable
            columns={custCols}
            data={userList}
            loading={usersLoader}
          />
          <PaginationComponent />
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
