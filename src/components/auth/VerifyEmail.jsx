import React, { useState } from "react";
import { Button, Form, Input, Space, Image, Typography, Flex, Row } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { errorMessage } from "../../services/helpers";

const { Text } = Typography;

const VerifyEmail = () => {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const email = location.state?.email;
  const navigate = useNavigate();

  const onFinish = (values) => {
    if (!email) {
      return errorMessage("Email not found, went something wrong try again!");
    }
    navigate("/new-password", {
      state: { email: email, passwordResetToken: Number(token) },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (text) => {
    setToken(text);
  };
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
            <Text className="welcome-heading d-block">Verify Email!</Text>
            <Text className="welcome-text d-block">
              Enter verification code here , that sent to your email
            </Text>
          </Flex>
          <Form.Item
            name="verification_code"
            rules={[
              {
                required: true,
                message: " ",
              },
            ]}
          >
            <Flex justify="center">
              <Input.OTP
                typeof="number"
                className="login-input w-100"
                // {...onChange}
                onChange={onChange}
                value={token}
              />
            </Flex>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button htmlType="submit" className="w-100 login-btn">
              VERIFY EMAIL
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Row>
  );
};

export default VerifyEmail;
