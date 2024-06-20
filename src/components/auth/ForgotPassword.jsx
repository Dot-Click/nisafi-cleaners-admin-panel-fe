import React from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Checkbox,
  Typography,
  Flex,
  Row,
  Image,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Text } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate("/verify-email");
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <Row direction="vertical" className="login-form d-block h-100">
      <Image
        src="/images/logos/logo-text.png"
        preview={false}
        className="brand-name"
      />
      <Flex vertical justify="center" align="center" className="form-container">
        <Form
          name="basic"
          layout="vertical"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: "500px",
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Flex vertical style={{ marginBottom: "50px" }}>
            <Link
              to={-1}
              className="welcome-text back-text d-flex align-items-center"
            >
              {" "}
              <svg
                className="me-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width={20}
              >
                <path
                  d="M10.1 23a1 1 0 000-1.41L5.5 17h23.55a1 1 0 000-2H5.53l4.57-4.57A1 1 0 008.68 9l-6.36 6.37a.9.9 0 000 1.27L8.68 23a1 1 0 001.42 0z"
                  data-name="Layer 2"
                ></path>
              </svg>{" "}
              Back
            </Link>
            <Text className="welcome-heading d-block">Forgot Password!</Text>
            <Text className="welcome-text d-block">
              Enter email here , We send you the verification code
            </Text>
          </Flex>
          <Text className="login-lable">Email here</Text>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                validator: (rule, value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return Promise.reject(
                      "Please enter a valid email address!"
                    );
                  }
                  return Promise.resolve(); // Validation successful
                },
              },
            ]}
          >
            <Input placeholder="Enter your email" className="login-input" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button htmlType="submit" className="w-100 login-btn">
              SEND CODE
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Row>
  );
};

export default ForgotPassword;
