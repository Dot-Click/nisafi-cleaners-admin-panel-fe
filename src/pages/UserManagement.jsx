import React from "react";
import GeneralTable from "../components/table/GeneralTable";
import { Button, Dropdown, Flex, Input, Row, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const items = [
    {
      key: "1",
      label: (
        <Link to={""} className="d-flex justify-content-center text-center">
          View Detail
        </Link>
      ),
    },
    {
      key: "2",
      label: <Button className="primary-btn">Accept</Button>,
    },
    {
      key: "3",
      label: <Button className="danger-btn">Reject</Button>,
    },
  ];
  const columns = [
    {
      title: "Sr",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registeration Date",
      dataIndex: "register",
      key: "register",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, { role }) => (
        <Tag color={role === "worker" ? "magenta" : "gold"} key={role}>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Flex className="mx-1">
          <Dropdown
            menu={{
              items,
            }}
          >
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="22"
              fill="none"
              viewBox="0 0 7 22"
            >
              <path
                fill="#000"
                fillOpacity="0.53"
                d="M3.143 22a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286zM3.143 14.143a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286zM3.143 6.286a3.143 3.143 0 100-6.286 3.143 3.143 0 000 6.286z"
              ></path>
            </svg>
          </Dropdown>
        </Flex>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      email: "johnali@gmail.com",
      register: "3rd jan 2005",
      role: "customer",
    },
    {
      key: "2",
      name: "John Brown",
      email: "johnali@gmail.com",
      register: "3rd jan 2005",
      role: "customer",
    },
    {
      key: "3",
      name: "John Brown",
      email: "johnali@gmail.com",
      register: "3rd jan 2005",
      role: "worker",
    },
    {
      key: "4",
      name: "John Brown",
      email: "johnali@gmail.com",
      register: "3rd jan 2005",
      role: "worker",
    },

    {
      key: "5",
      name: "John Brown",
      email: "johnali@gmail.com",
      register: "3rd jan 2005",
      role: "customer",
    },
    {
      key: "6",
      name: "John Brown",
      email: "johnali@gmail.com",
      register: "3rd jan 2005",
      role: "worker",
    },
  ];
  return (
    <Row className=" d-block m-2 user-container">
      <Row className="search-box">
        {" "}
        <Input
          className="search-input"
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
        />
      </Row>
      <GeneralTable columns={columns} data={data} />
    </Row>
  );
};

export default UserManagement;
