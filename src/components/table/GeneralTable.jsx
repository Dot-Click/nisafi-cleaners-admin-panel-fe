import { Table } from "antd";
import React from "react";

const GeneralTable = ({ columns, data, loading }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      className="datatable"
      // pagination={{
      //   position: ["bottomCenter"],
      //   pageSize: 1,
      //   onChange,
      // }}
      pagination={false}
      loading={loading}
    />
  );
};

export default GeneralTable;
