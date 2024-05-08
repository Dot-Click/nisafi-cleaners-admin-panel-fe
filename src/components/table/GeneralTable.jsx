import { Table } from "antd";
import React from "react";

const GeneralTable = ({ columns, data }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        position: ["bottomCenter"],
      }}
    />
  );
};

export default GeneralTable;
