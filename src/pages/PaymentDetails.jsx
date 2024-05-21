import React, { useState } from "react";
import GeneralTable from "../components/table/GeneralTable";
import { Col, Flex, Input, Modal, Row, Select, Tag, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { Text } = Typography;

const PaymentDetails = () => {
  const [record, setRecord] = useState(null);
  const [isDetailsModalOpened, setDetailsModalOpen] = useState(false);

  const handleViewDetails = (data) => {
    try {
      setRecord(data);
      setDetailsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDetailsModal = () => {
    try {
      setDetailsModalOpen(false);
      setRecord(null);
    } catch (error) {
      console.error(error);
    }
  };

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
        <Text
          onClick={() => handleViewDetails(record)}
          className="cursor-pointer d-flex text-center view-details-btn"
        >
          View Detail
        </Text>
      ),
    },
  ];

  const data = [
    {
      transactionId: "TRX123456789",
      transactionNote: "Cloth Washing",
      customerName: "Jane Doe",
      workerName: "John Doe",
      amount: 100,
      releaseDate: new Date(),
      date: new Date(),
      status: "In Escrow",
    },
    {
      transactionId: "TRX123456789",
      transactionNote: "Dry Clean",
      customerName: "Jane Smith",
      workerName: "Smith Black",
      amount: 100,
      releaseDate: new Date(),
      date: new Date(),
      status: "Paid",
    },
    {
      transactionId: "TRX123456789",
      transactionNote: "Deep Clean",
      customerName: "Johnson Brown",
      workerName: "Loki Wright",
      amount: 100,
      releaseDate: new Date(),
      date: new Date(),
      status: "Cancelled",
    },
    {
      transactionId: "TRX123456789",
      transactionNote: "Cloth Washing",
      customerName: "Jane Doe",
      workerName: "John Doe",
      amount: 100,
      releaseDate: new Date(),
      date: new Date(),
      status: "Paid",
    },
    {
      transactionId: "TRX123456789",
      transactionNote: "Cloth Washing",
      customerName: "Jane Doe",
      workerName: "John Doe",
      amount: 100,
      releaseDate: new Date(),
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
