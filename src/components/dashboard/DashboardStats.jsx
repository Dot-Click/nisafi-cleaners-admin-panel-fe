import { Col, Flex, Row, Typography } from "antd";
import React, { useState } from "react";
import { dashboardStats } from "../../data/data";
import ReactApexChart from "react-apexcharts";
import ArrowTiltDown from "../../assets/icons/ArrowTiltDown";

const { Text, Title } = Typography;

const DashboardStats = () => {
  const [chartConfig] = useState({
    series: [
      {
        name: "Outlet Balance",
        data: [22, 13, 20, 23, 19, 26, 16],
      },
    ],
    options: {
      colors: ["#DC447F"],
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        marker: {
          show: false,
        },
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
        },
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
    },
  });

  return (
    <Flex vertical className="dashboard-stats">
      {/* // ? stats ccards */}
      <Row className="stats-cards">
        {dashboardStats?.map((stat, i) => {
          return <StatCard stat={stat} key={i} />;
        })}
      </Row>

      {/* // ? sales and balance stats */}
      <Row className="sales-and-balance">
        <Col span={8} className="balance-stats">
          <Flex
            vertical
            className="upper-container"
            justify="center"
            align="center"
          >
            <Title level={4}>Outlet Balance</Title>
            <ReactApexChart
              options={chartConfig?.options}
              series={chartConfig?.series}
              type="line"
              height={130}
              width={150}
            />
            <Title level={5}>$3219,37</Title>
            <Flex gap={10}>
              <Flex
                justify="center"
                align="center"
                className="profit-loss-icon"
              >
                <ArrowTiltDown />
              </Flex>{" "}
              <Text>-7% from yesterday</Text>
            </Flex>
          </Flex>
          <Flex className="lower-container" justify="center" align="center">
            <Title level={3}>Withdraw</Title>
          </Flex>
        </Col>
        <Col span={15}></Col>
      </Row>
    </Flex>
  );
};

const StatCard = ({ stat }) => {
  const difference = stat?.data - stat?.previousData;
  const [chartConfig] = useState({
    series: [
      {
        name: stat?.title,
        data: stat?.chartData,
      },
    ],
    options: {
      colors: [
        difference > 20 ? "#0CCB93" : difference < 0 ? "#F56060" : "#0BA8D8",
      ],
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
        width: 80,
        height: 70,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        marker: {
          show: false,
        },
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
        },
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      stroke: {
        width: [1, 2, 3],
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          gradientToColors: [
            difference > 20
              ? "#0CCB93"
              : difference < 0
              ? "#F56060"
              : "#0BA8D8",
          ],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 0.5,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
    },
  });

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

      <ReactApexChart
        options={chartConfig?.options}
        series={chartConfig?.series}
        type="line"
        height={70}
        width={80}
      />
    </Col>
  );
};

export default DashboardStats;
