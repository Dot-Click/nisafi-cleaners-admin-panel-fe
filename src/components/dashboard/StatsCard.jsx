import React, { useState } from "react";

const StatsCard = () => {
  const difference = stat?.data - stat?.previousData;

  return (
    <Col
      flex={1}
      className={`stats-card ${
        difference > 20 ? "green" : difference < 0 ? "red" : "blue"
      }`}
    >
      <Flex justify="space-between" className="w-100">
        <Flex vertical>
          <Title level={2}>
            {stat?.type === "revenue" ? "$" : ""}
            {stat?.data}
          </Title>
          <Text>{stat?.title}</Text>
        </Flex>

        <Flex className="icon" justify="center" align="center">
          <stat.icon
            fill={
              difference > 20
                ? "#0CCB93"
                : difference < 0
                ? "#F56060"
                : "#0BA8D8"
            }
          />
        </Flex>
      </Flex>
    </Col>
  );
};

export default StatsCard;
