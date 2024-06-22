import React from "react";
import { Flex, Typography } from "antd";
const { Text, Title } = Typography;

const StatsCard = ({ count, title, icon }) => {
  return (
    <Flex justify="space-between" className="w-100">
      <Flex vertical>
        <Title level={2}>{count}</Title>
        <Text>{title}</Text>
      </Flex>

      <Flex className="icon" justify="center" align="center">
        {icon}
      </Flex>
    </Flex>
  );
};

export default StatsCard;
