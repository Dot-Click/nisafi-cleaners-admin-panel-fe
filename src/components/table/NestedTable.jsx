import React, { useState } from "react";
import { Badge, Dropdown, Space, Table, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import GeneralTable from "./GeneralTable";
import { formatDate } from "../../utils";
const { Text } = Typography;

const NestedTable = ({ columns, data }) => {
  const innerColumns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "timestamp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => <Text>{formatDate(createdAt)}</Text>,
    },
    {
      title: "PaidBy",
      dataIndex: "upgradeNum",
      key: "upgradeNum",
    },
    {
      title: "JobType",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Action",
      dataIndex: "createdAt1",
      key: "createdAt1",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <GeneralTable
              columns={innerColumns}
              data={record.transactions}
              loading={false}
            />
          ),
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};

export default NestedTable;
