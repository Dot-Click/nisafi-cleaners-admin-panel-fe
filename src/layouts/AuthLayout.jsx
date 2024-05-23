import { Col, Flex, Row, Space, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

const { Text } = Typography;

const AuthLayout = () => {
  return (
    <Row style={{ backgroundColor: "#fff" }}>
      <Col
        xs={{
          flex: "100%",
        }}
        sm={{
          flex: "100%",
        }}
        md={{
          flex: "50%",
        }}
        lg={{
          flex: "50%",
        }}
        xl={{
          flex: "60%",
        }}
        style={{ height: "100vh" }}
        className="login-form-container"
      >
        <Outlet />
      </Col>
      <Col
        className="img-container d-flex justify-content-center align-items-center"
        xs={{
          flex: "100%",
        }}
        sm={{
          flex: "100%",
        }}
        md={{
          flex: "50%",
        }}
        lg={{
          flex: "50%",
        }}
        xl={{
          flex: "40%",
        }}
      >
        <Flex className="login-text-container">
          <Space direction="vertical" className="login-glass-box p-1 py-2">
            <Text className="heading-text">👍 Admin Pannel Login</Text>
            <Text className="login-text my-1 d-block">
              Sign in to access the admin panel and oversee all aspects of the
              laundry service application, including user management, activity
              monitoring, payment details, and settings configuration.
            </Text>
          </Space>
        </Flex>
      </Col>
    </Row>
  );
};

export default AuthLayout;
