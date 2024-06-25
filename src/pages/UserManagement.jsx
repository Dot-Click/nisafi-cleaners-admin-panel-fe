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
    if (e.keyCode === 13) {
      await fetchUsers(role, currentPage, e.target.value, filter);
    }
  };

  const custCols = [
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
      render: (_, { name, profilePic }) => (
        <Flex gap={10} align="center" className="w-[150px]">
          <CustomAvatar size={40} imgUrl={baseURL + profilePic} name={name} />
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
          <CustomAvatar size={40} imgUrl={baseURL + profilePic} name={name} />
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
        <Input
          className="search-input"
          size="large"
          placeholder="Search..."
          onPressEnter={handleSearch}
          // onChange={onChange}
          onChange={(e) =>
            e.target.value === "" && fetchUsers(role, currentPage, "", filter)
          }
          prefix={<SearchOutlined />}
          // value={inputValue}
          allowClear={false}
        />

        {/* <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          // value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
          // onChange={(e) => setInputValue(e.target.value)}
          onSearch={handleSearch}
        /> */}

        {/* <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onKeyDown={handleSearch}
            onChange={(e) =>
              e.target.value === "" &&
              fetchUsers(role, currentPage, e.target.value, filter)
            }
            type="text"
            id="simple-search "
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full ps-10 p-2.5 focus:ring-red-500 focus:border-red-500  "
            placeholder="Search..."
          />
        </div> */}
        {/* <button
            type="submit"
            class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 primary-btn !w-fit"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button> */}

        {/* <form class="max-w-md">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search....."
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 primary-btn !w-fit"
            >
              Search
            </button>
          </div>
        </form> */}

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
