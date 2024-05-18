import React, { useState } from "react";
import GeneralTable from "../components/table/GeneralTable";
import {
  Button,
  Col,
  Dropdown,
  Flex,
  Input,
  Modal,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

const UserManagement = () => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [record, setRecord] = useState(null);

  const hanldeViewDetails = (data) => {
    try {
      setRecord(data);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const hanldeCloseModal = () => {
    try {
      setModalOpen(false);
      setRecord(null);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Sr",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Username",
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
        <Tag
          color={role === "worker" ? "magenta" : "gold"}
          className="role"
          key={role}
        >
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
              items: [
                {
                  key: "1",
                  label: (
                    <Text
                      onClick={() => hanldeViewDetails(record)}
                      className="d-flex justify-content-center text-center view-details-btn"
                    >
                      View Detail
                    </Text>
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
              ],
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
    <Row className=" d-block user-management-container">
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
            <Text className="lebal">Role:</Text>
            <Select
              defaultValue="all"
              options={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "customer",
                  label: "Customer",
                },
                {
                  value: "worker",
                  label: "Worker",
                },
              ]}
            />
          </Flex>
        </Flex>
      </Row>

      {/* // ? table component */}
      <GeneralTable columns={columns} data={data} />

      {/* // ? user details modal */}
      <Modal
        open={isModalOpened}
        footer={null}
        onCancel={hanldeCloseModal}
        destroyOnClose
        className="user-details-modal"
        centered
        width={1200}
      >
        <Row className="modal-container">
          <Col xl={8} lg={12} xs={24} className="modal-card">
            <Flex vertical gap={10} align="flex">
              <Text>Profile Image</Text>
              <Flex className="modal-card-inner"></Flex>
            </Flex>
          </Col>
        </Row>
      </Modal>
    </Row>
  );
};

export default UserManagement;
