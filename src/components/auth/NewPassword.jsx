import React from "react";
import { Button, Form, Input, Space, Image, Typography, Flex, Row } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { errorMessage } from "../../services/helpers";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../stores/authStore";

const { Text } = Typography;

const NewPassword = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const { reset, loading } = useAuthStore(useShallow((state) => state));

  const onFinish = async (values) => {
    if (!state) {
      return errorMessage("Went something wrong try again");
    }
    const payload = {
      ...values,
      ...state,
    };
    const res = await reset(payload);
    if (res) {
      navigate("/");
    }
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
          form={form}
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
          //   initialValues={{
          //     remember: true,
          //   }}
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
            <Text className="welcome-heading d-block">Change Password!</Text>
            <Text className="welcome-text d-block">
              Enter new password here to change
            </Text>
          </Flex>
          <Text className="login-lable">New Password</Text>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                validator: (rule, value) => {
                  if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
                      value
                    )
                  ) {
                    return Promise.reject(
                      "Password should contain atleast 8 characters,at least one uppercase letter, one lowercase letter, one number and one special character"
                    );
                  }
                  return Promise.resolve(); // Validation successful
                },
                // message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your new password"
              className="login-input"
            />
          </Form.Item>

          <Text className="login-lable">Confirm Password</Text>
          <Form.Item
            name="change_password"
            rules={[
              {
                required: true,
                validator: (rule, value) => {
                  if (value !== form.getFieldValue("password")) {
                    return Promise.reject("Passwords do not match!");
                  }
                  return Promise.resolve(); // Validation successful
                },
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm your new password"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button
              loading={loading}
              htmlType="submit"
              className="w-100 login-btn"
            >
              CHANGE PASSWORD
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Row>
  );
};

export default NewPassword;
