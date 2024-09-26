import { useEffect, useState } from "react";
import {
  Col,
  Flex,
  Input,
  Modal,
  Row,
  Tag,
  Typography,
  Tabs,
  Pagination,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import NestedTable from "../components/table/NestedTable";
import CustomAvatar from "../components/common/CustomAvatar";
import { baseURL } from "../configs/axiosConfig";
import { useShallow } from "zustand/react/shallow";
import { useUserManagementStore } from "../stores/userManagementStore";
import { formatPrice } from "../utils";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";

const { Text } = Typography;

const PaymentDetails = () => {
  const [record, setRecord] = useState(null);
  const [role, setrole] = useState("worker");
  const [activeTab, setActiveTab] = useState("1");
  const [isDetailsModalOpened, setDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    // func
    fetchPaymentDetail,
    // data
    paymentList,
    pagesCount,

    // loaders
    payementListLoader,
  } = useUserManagementStore(useShallow((state) => state));

  // const handleViewDetails = (data) => {
  //   try {
  //     setRecord(data);
  //     setDetailsModalOpen(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleCloseDetailsModal = () => {
    try {
      setDetailsModalOpen(false);
      setRecord(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleTabChange = (key) => {
    if (key === "1") {
      setrole("worker");
    } else {
      setrole("client");
    }
    setCurrentPage(1);
    setActiveTab(key);
  };
  const handleSearch = async (e) => {
  };

  const onChange = async (e) => {
    if (e.target.value === "") {
    }
  };

  useEffect(() => {
    fetchPaymentDetail(role, currentPage, "");
  }, [role, currentPage]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { user }) => {
        const content = (
          <Flex gap={10} align="center" className="w-[150px]">
            <CustomAvatar
              size={40}
              imgUrl={user?.profilePic}
              name={user?.name}
              className={"aspect-square bg-slate-200"}
            />

            <Text className={role === "worker" ? `view-details-btn` : ""}>
              {user?.name}
            </Text>
          </Flex>
        );

        return role === "worker" ? (
          <Link to={`/dashboard/user/worker-info/${user?._id}`}>{content}</Link>
        ) : (
          content
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, { user }) => <Text>{user?.email}</Text>,
    },
    {
      title: "No of Transations",
      dataIndex: "transactions",
      key: "transactions",
      render: (_, { transactions }) => <Text>{transactions?.length}</Text>,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (_, { balance }) => (
        <Text className="font-semibold">{formatPrice(balance)}</Text>
      ),
    },
  ];

  const FiltersComponents = () => {
    return (
      <Row className="search-box items-center" justify="space-between">
        {/* <Flex align="center" justify="space-between"> */}
        <Input
          className="search-input"
          size="large"
          placeholder="Search..."
          onPressEnter={handleSearch}
          onChange={onChange}
          prefix={<SearchOutlined />}
        />
        <Tooltip title="Reload Table">
          <RotateCcw
            onClick={() => fetchPaymentDetail(role, currentPage, "")}
            className="text-white cursor-pointer  "
          />
        </Tooltip>
        {/* </Flex> */}
      </Row>
    );
  };

  const PaginationComponent = () => {
    return (
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
    );
  };
  return (
    <Row className=" d-block user-management-container payment-details-container">
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

          <NestedTable
            columns={columns}
            data={paymentList}
            loading={payementListLoader}
          />
          {/* <PaginationComponent /> */}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<span className="flex gap-2">Customer</span>}
          key="2"
        >
          <FiltersComponents />
          <NestedTable
            columns={columns}
            data={paymentList}
            loading={payementListLoader}
          />
          {/* <PaginationComponent /> */}
        </Tabs.TabPane>
      </Tabs>

      <PaymentDetailModal
        opened={isDetailsModalOpened}
        data={record}
        handleClose={handleCloseDetailsModal}
      />
    </Row>
  );
};

const PaymentDetailModal = ({ opened, data, handleClose }) => {
  return (
    <Modal
      className="payment-details-modal"
      centered
      open={opened}
      closable
      onCancel={handleClose}
      width={900}
      footer={null}
    >
      <Flex justify="center">
        <Row className="details-container">
          <Col span={24} className="detail-row">
            <Row>
              <Col sm={12} xs={24}>
                <Flex vertical>
                  <Text className="field-name">Transaction ID</Text>
                  <Text className="field-value">{data?.transactionId}</Text>
                </Flex>
              </Col>
              <Col sm={12} xs={24}>
                <Flex vertical>
                  <Text className="field-name">Note</Text>
                  <Text className="field-value">{data?.transactionNote}</Text>
                </Flex>
              </Col>
            </Row>
          </Col>

          <Col span={24} className="detail-row">
            <Row>
              <Col sm={12} xs={24}>
                <Flex vertical>
                  <Text className="field-name">Release Date</Text>
                  <Text className="field-value">
                    {moment(data?.releaseDate).format("MMMM D, YYYY")}
                  </Text>
                </Flex>
              </Col>
              <Col sm={12} xs={24}>
                <Flex vertical>
                  <Text className="field-name">Amount</Text>
                  <Text className="field-value">
                    ${data?.amount?.toFixed(2)}
                  </Text>
                </Flex>
              </Col>
            </Row>
          </Col>

          <Col span={24} className="detail-row">
            <Row>
              <Col sm={12} xs={24}>
                <Flex vertical>
                  <Text className="field-name">Customer Name</Text>
                  <Text className="field-value">{data?.customerName}</Text>
                </Flex>
              </Col>
              <Col sm={12} xs={24}>
                <Flex vertical>
                  <Text className="field-name">Worker Name</Text>
                  <Text className="field-value">{data?.workerName}</Text>
                </Flex>
              </Col>
            </Row>
          </Col>

          <Col span={24} className="detail-row">
            <Row>
              <Col sm={12} xs={24}>
                <Flex vertical>
                  <Text className="field-name">Payment Date</Text>
                  <Text className="field-value">
                    {moment(data?.date).format("MMMM D, YYYY")}
                  </Text>
                </Flex>
              </Col>

              <Col span={12}>
                <Flex vertical align="flex-start">
                  <Text className="field-name">Status</Text>
                  <Tag
                    color={
                      data?.status === "Cancelled"
                        ? "red"
                        : data?.status === "Paid"
                        ? "green"
                        : "gold"
                    }
                    className="status"
                  >
                    {data?.status}
                  </Tag>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </Flex>
    </Modal>
  );
};

export default PaymentDetails;
