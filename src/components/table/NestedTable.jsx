import { Table, Tag, Typography } from "antd";
import GeneralTable from "./GeneralTable";
import { formatDate, formatPrice } from "../../utils";
import { Link } from "react-router-dom";
const { Text } = Typography;

const NestedTable = ({ columns, data, loading }) => {
  const getInnerColumns = (parentRecord) => [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, { amount }) => (
        <Text className="font-semibold">{formatPrice(amount)}</Text>
      ),
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => (
        <Tag
          color={type === "credit" ? "#149616" : "#cc2f1d"}
          className="capitalize text-[12px] "
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => <Text>{formatDate(createdAt)}</Text>,
    },
    {
      title: "Details",
      dataIndex: "upgradeNum",
      key: "upgradeNum",
      render: (_, { paidTo, paidBy, type }) => {
        if (type === "credit") {
          return (
            <Text color={"red"}>
              {parentRecord?._id?.toString() === paidBy?._id?.toString() ? (
                <>
                  PaidTo:
                  <span> Escrow</span>
                </>
              ) : (
                <>
                  PaidBy:
                  <span> {paidBy?.name}</span>
                </>
              )}
            </Text>
          );
        } else if (type === "debit") {
          if (!paidTo && parentRecord?.user?.role === "client") {
            return <Text color={"red"}>Dispute Refund</Text>;
          } else {
            return parentRecord?._id?.toString() === paidTo?._id?.toString() ? (
              <Text color={"red"}>
                PaidTo:
                <span> Withdraw</span>
              </Text>
            ) : (
              <Text color={"red"}>
                PaidTo:
                <span> {paidTo?.name}</span>
              </Text>
            );
          }
        }
      },
    },
    {
      title: "Job Type",
      dataIndex: "creator",
      key: "creator",
      render: (_, { job }) => (
        <Link
          to={`/dashboard/job/details/${job?._id}`}
          className="view-details-btn"
        >
          {job?.type}
        </Link>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <GeneralTable
              columns={getInnerColumns(record)}
              data={record.transactions}
              loading={false}
            />
          ),
        }}
        loading={loading}
        dataSource={data}
        pagination={false}
        rowKey={"key"}
      />
    </>
  );
};

export default NestedTable;
