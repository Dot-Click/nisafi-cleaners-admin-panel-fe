import React from "react";
import { Col, Flex, Typography } from "antd";
const { Text, Title } = Typography;
import { statsColorHandler } from "../../utils/index";

const StatsCard = ({ type, count, title, icon }) => {
  return (
    <Col
      xxl={6}
      lg={12}
      sm={24}
      md={12}
      xs={24}
      flex={1}
      className={`stats-card py-4 ${statsColorHandler(type)}`}
    >
      <Flex justify="space-between" className="w-100">
        <Flex vertical>
          <Title level={2}>{count}</Title>
          <Text>{title}</Text>
        </Flex>

        <Flex className="icon" justify="center" align="center">
          {icon}
        </Flex>
      </Flex>
    </Col>
  );
};

export default StatsCard;
