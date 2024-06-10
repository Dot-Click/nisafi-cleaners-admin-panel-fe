import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = ({ size }) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: size,
          }}
          spin
        />
      }
    />
  );
};

export default Loader;
