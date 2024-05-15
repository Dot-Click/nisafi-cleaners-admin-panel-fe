import React from "react";
import GeneralTable from "../components/table/GeneralTable";
import {
  Button,
  Dropdown,
  Flex,
  Input,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

const { Text } = Typography;

const PaymentDetails = () => {
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Worker Name",
      dataIndex: "workerName",
      key: "workerName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, { amount }) => (
        <Text className="amount">${amount?.toFixed(2)}</Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, { date }) => (
        <Text className="date">{moment(date).format("YYYY-MM-DD")}</Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag
          color={
            status === "Cancelled"
              ? "red"
              : status === "Paid"
              ? "green"
              : "gold"
          }
          key={status}
          className="status"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link
          to={""}
          className="d-flex justify-content-center text-center view-details-btn"
        >
          View Detail
        </Link>
      ),
    },
  ];

  const data = [
    {
      transactionId: "TRX123456789",
      customerName: "Jane Doe",
      workerName: "John Doe",
      amount: 100,
      date: new Date(),
      status: "In Escrow",
    },
    {
      transactionId: "TRX123456790",
      customerName: "Jane Doe",
      workerName: "John Doe",
      amount: 100,
      date: new Date(),
      status: "Paid",
    },
    {
      transactionId: "TRX123456791",
      customerName: "Jane Doe",
      workerName: "John Doe",
      amount: 100,
      date: new Date(),
      status: "Cancelled",
    },
    {
      transactionId: "TRX123456792",
      customerName: "Jane Doe",
      workerName: "John Doe",
      amount: 100,
      date: new Date(),
      status: "Paid",
    },
    {
      transactionId: "TRX123456793",
      customerName: "Jane Doe",
      workerName: "John Doe",
      amount: 100,
      date: new Date(),
      status: "Paid",
    },
  ];

  return (
    <Row className=" d-block user-management-container payment-details-container">
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
            <Text className="lebal">Status:</Text>
            <Select
              defaultValue="all"
              options={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "in escrow",
                  label: "In Escrow",
                },
                {
                  value: "paid",
                  label: "Paid",
                },
                {
                  value: "cancelled",
                  label: "Cancelled",
                },
              ]}
            />
          </Flex>
        </Flex>
      </Row>

      <GeneralTable columns={columns} data={data} />
    </Row>
  );
};

export default PaymentDetails;
