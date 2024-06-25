import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Checkbox,
  Typography,
  Flex,
  Row,
  Image,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../stores/authStore";

const { Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login, loading } = useAuthStore(useShallow((state) => state));

  // ? keep these hard code initial values untill the things are dynamic and we integrate APIs.
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    remember: true,
  });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("email");
    const rememberedPassword = window.atob(localStorage.getItem("password"));
    const rememberChecked = localStorage.getItem("remember") === "true";

    if (rememberChecked && rememberedEmail && rememberedPassword) {
      setInitialValues({
        ...initialValues,
        email: rememberedEmail,
        password: rememberedPassword,
        remember: true,
      });
    }
  }, []);

  const onFinish = async (values) => {
    if (values.remember) {
      localStorage.setItem("email", values?.email);
      localStorage.setItem("password", window.btoa(values.password));
      localStorage.setItem("remember", values?.remember);
    }
    const res = await login(values);
    if (res) {
      navigate("/dashboard");
    }
  };

  const onFinishFailed = (errorInfo) => {
    return false;
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Flex vertical style={{ marginBottom: "50px" }}>
            <Text className="welcome-heading d-block">Welcome</Text>
            <Text className="welcome-text d-block">
              Login to your account
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
            <Input
              type="email"
              placeholder="Enter your email"
              className="login-input"
            />
          </Form.Item>

          <Text className="login-lable">Password</Text>
          <Form.Item
            name="password"
            // rules={[
            //   {
            //     required: true,
            //     validator: (rule, value) => {
            //       if (
            //         !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
            //           value
            //         )
            //       ) {
            //         return Promise.reject(
            //           "Password should contain atleast 8 characters,at least one uppercase letter, one lowercase letter, one number and one special character"
            //         );
            //       }
            //       return Promise.resolve(); // Validation successful
            //     },
            //     // message: "Please input your password!",
            //   },
            // ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter your Password"
              className="login-input"
            />
          </Form.Item>

          <Flex align="center" justify="space-between">
            <Form.Item
              name="remember"
              valuePropName="checked"
              className="d-block justify-content-between"
              wrapperCol={{
                offset: 0,
                span: 20,
              }}
              style={{ width: "100%" }}
            >
              <Checkbox className="remember-me">Remember me</Checkbox>
            </Form.Item>
            <Link
              style={{ marginTop: "-20px" }}
              to={"/forgot-password"}
              className="forgot-password text-end d-block w-100"
            >
              Forgot Password?
            </Link>
          </Flex>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button
              loading={loading}
              htmlType="submit"
              className="w-100 login-btn rounded-md"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Row>
  );
};

export default Login;
