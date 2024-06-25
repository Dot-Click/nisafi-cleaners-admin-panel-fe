import { useEffect, useState } from "react";
import GeneralTable from "../components/table/GeneralTable";
import { Button, Flex, Input, Row, Select, Typography, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ChevronDown from "../assets/icons/ChevronDown";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
import { jobManagementStore } from "../stores/jobManagementStore";
import { useShallow } from "zustand/react/shallow";
import { formatDateString } from "../utils";
import { Pagination } from "antd";
import CustomAvatar from "../components/common/CustomAvatar";
import { baseURL } from "../configs/axiosConfig";
import useDebounce from "../services/hooks/useDebounce";

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabList[0].key);
  const [sort, setSort] = useState("desc");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    // func
    fetchJobsList,
    // data
    jobsList,
    pagesCount,
    // loaders
    listLoader,
  } = jobManagementStore(useShallow((state) => state));


  const handleTabChange = (key) => {
    setActiveTab(key);
    setSort("desc");
  };

  const jobCols = [
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (_, { user }) => (
        <Flex gap={10} align="center" className="w-[150px]">
          <CustomAvatar
            size={40}
            imgUrl={baseURL + user.profileImage}
            name={user.name}
          />
          <Text>{user.name}</Text>
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
      render: (_, { proposals }) => <Text>{proposals.length}</Text>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => <Text>{formatDateString(createdAt)}</Text>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (_, { location }) => (
        <Flex gap={10} align="center">
          <Text>{location.string}</Text>
        </Flex>
      ),
    },

    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => navigate(`/dashboard/jobs/details/${record._id}`)}
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
          // defaultValue={search}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     setSearch(e.target.value);
          //   }
          // }}
          // onChange={(e) => e.target.value === "" && setSearch("")}
          value={searchValue}
          onChange={(e) => {
            const { value } = e.target;
            setSearchValue(value);
          }}
        />

        {/* // ? filters */}
        <Flex align="center" className="filters" gap={10}>
          {/* // ? sort by filter */}
          <Flex className="filter" align="center">
            <Text className="lebal">Sort By:</Text>
            <Select
              defaultValue={sort}
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
              onChange={(value) => setSort(value)}
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
            onChange={(page, pageSize) => setCurrentPage(page)}
          />
        </div>
      )
    );
  };

  async function fetchData() {
    await fetchJobsList(1, debouncedSearch, sort, 10, activeTab);
  }
  useEffect(() => {
    fetchData();
  }, [activeTab, sort, debouncedSearch]);

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
              data={jobsList}
              loading={listLoader}
            />
            <PaginationComponent />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Row>
  );
};

export default JobManagement;
