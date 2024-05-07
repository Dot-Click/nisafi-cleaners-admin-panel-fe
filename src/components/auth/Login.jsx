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
} from "antd";

const { Text } = Typography;

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row direction="vertical" className="p-3  d-block h-100">
      <Text className="brand-name">Nisafi cleaners</Text>
      <Flex vertical justify="center" align="center" className="h-100">
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
            <Text className="welcome-heading d-block">Welcome</Text>
            <Text className="welcome-text d-block">
              Login into your account
            </Text>
          </Flex>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Text className="login-lable">Email here</Text>
            <Input placeholder="Enter your email" className="login-input" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Text className="login-lable">Password</Text>
            <Input.Password
              placeholder="Enter your Password"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            className="d-block justify-content-between"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
            style={{ width: "100%", marginTop: "-20px" }}
          >
            <Flex align="center" justify="space-between">
              <Checkbox className="remember-me">Remember me</Checkbox>
              <Text className="forgot-password">Forgot Password?</Text>
            </Flex>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button htmlType="submit" className="w-100 login-btn">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Row>
  );
};

export default Login;
