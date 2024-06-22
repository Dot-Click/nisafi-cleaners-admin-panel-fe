import { Table } from "antd";

const GeneralTable = ({ columns, data, loading }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      className="datatable"
      pagination={false}
      loading={loading}
    />
  );
};

export default GeneralTable;
