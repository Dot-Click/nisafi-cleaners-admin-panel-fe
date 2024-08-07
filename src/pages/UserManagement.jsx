import { useEffect, useState } from "react";
import GeneralTable from "../components/table/GeneralTable";
import {
  Button,
  Flex,
  Input,
  Row,
  Select,
  Typography,
  Tabs,
  Pagination,
  Tag,
  Tooltip,
} from "antd";
const { Search } = Input;
import { SearchOutlined } from "@ant-design/icons";
import UserDetailsModal from "../components/layout/UserDetailsModal";
import ChevronDown from "../assets/icons/ChevronDown";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserManagementStore } from "../stores/userManagementStore";
import { useShallow } from "zustand/react/shallow";
import { baseURL } from "../configs/axiosConfig";
import { formatDate, workerStatusColorHandler } from "../utils";
import CustomAvatar from "../components/common/CustomAvatar";
import staticMethods from "antd/es/notification";
import { RotateCcw } from "lucide-react";

const { Text } = Typography;
const UserManagement = () => {
  const location = useLocation();
  const locationState = location.state;

  const [isModalOpened, setModalOpen] = useState(false);
  const [role, setrole] = useState("worker");
  const [activeTab, setActiveTab] = useState("1");
  const [record, setRecord] = useState(null);
  const [filter, setFilter] = useState("desc");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const {
    // func
    fetchUsers,
    // data
    userList,
    pagesCount,
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

  const paginationHandler = (page) => {
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
  useEffect(() => {
    if (locationState?.link && locationState?.role) {
      setrole(locationState?.role);
      fetchUsers(locationState?.role, 1, locationState?.link, filter);
    } else {
      fetchUsers(role, currentPage, "", filter);
    }
  }, [role, filter]);

  // const handleSearch = async (value, event) => {
  //   event.preventDefault();
  //   setInputValue(value);
  //   console.log("values........", value);
  //   console.log("event........", event);
  //   await fetchUsers(role, currentPage, value, "");
  // };

  // const onChange = async (e) => {
  //   if (e.target.value === "") {
  //     console.log("onChange Run");
  //     // setInputValue(e.target.value);
  //     await fetchUsers(role, currentPage, e.target.value, filter);
  //   }
  // };

  const handleSearch = async (e) => {
    // if (e.keyCode === 13) {
    await fetchUsers(role, currentPage, e.target.value, filter);
    // }
  };

  const custCols = [
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
      render: (_, { name, profilePic }) => (
        <Flex gap={10} align="center">
          <CustomAvatar
            size={40}
            imgUrl={profilePic}
            name={name}
            className={"aspect-square bg-slate-200"}
          />
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "JoinAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, createdAt) => <Text>{formatDate(createdAt)}</Text>,
    },
  ];
  const workerCols = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name, profilePic }) => (
        <Flex gap={10} align="center" className="w-[150px]">
          <CustomAvatar
            size={40}
            imgUrl={profilePic}
            name={name}
            className={"aspect-square bg-slate-200"}
          />
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
      title: "Status",
      dataIndex: "adminApproval",
      key: "adminApproval",
      render: (_, { adminApproval }) => (
        <Tag
          color={workerStatusColorHandler(adminApproval)}
          className="capitalize"
        >
          {adminApproval}
        </Tag>
      ),
    },
    {
      title: "Registration Date",
      dataIndex: `createdAt`,
      key: "createdAt",
      render: (_, createdAt) => <Text>{formatDate(createdAt)}</Text>,
    },
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
      ),
    },
  ];

  const FiltersComponents = () => {
    return (
      <Row className="search-box" justify="space-between">
        <Flex align="center" gap={5}>
          <Input
            className="search-input"
            size="large"
            placeholder="Search..."
            onPressEnter={handleSearch}
            // onChange={onChange}
            // onChange={(e) =>
            //   e.target.value === "" && fetchUsers(role, currentPage, "", filter)
            // }
            prefix={<SearchOutlined />}
            // value={inputValue}
            // allowClear={false}
          />
        </Flex>

        <Flex align="center" className="filters" gap={10}>
          {/* // ? sort by filter */}
          <Flex className="filter" align="center">
            <Text className="lebal">Sort By:</Text>
            <Select
              defaultValue={filter}
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
          <Tooltip title="Reload Table">
            <RotateCcw
              onClick={() => fetchUsers(role, currentPage, "", filter)}
              className="text-white cursor-pointer  "
            />
          </Tooltip>
        </Flex>
      </Row>
    );
  };

  const PaginationComponent = () => {
    return (
      pagesCount > 1 && (
        <div className="py-4 flex flex-wrap flex-1 items-center justify-center my-6">
          <Pagination
            total={pagesCount}
            pageSize={10}
            showQuickJumper={false}
            showTitle={false}
            showSizeChanger={false}
            responsive
            current={currentPage}
            onChange={(page, pageSize) => paginationHandler(page, pageSize)}
          />
        </div>
      )
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
