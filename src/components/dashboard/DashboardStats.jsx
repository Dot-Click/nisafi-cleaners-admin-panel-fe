import { Col, Flex, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import { dashboardStats } from "../../data/data";
import ReactApexChart from "react-apexcharts";
import ArrowTiltDown from "../../assets/icons/ArrowTiltDown";

const { Text, Title } = Typography;

const DashboardStats = () => {
  return (
    <Flex vertical className="dashboard-stats">
      {/* // ? stats ccards */}
      <Row className="stats-cards">
        {dashboardStats?.map((stat, i) => {
          return <StatCard stat={stat} key={i} />;
        })}
      </Row>

      {/* // ? sales and balance stats */}
      <Flex className="sales-and-balance">
        <Col xxl={6} xl={9} lg={12} md={24} className="balance-stats">
          <SalesAndBalance />
        </Col>
        <Col flex={1}>
          <DailySales />
        </Col>
      </Flex>
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

const SalesAndBalance = () => {
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
    <>
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
          <Flex justify="center" align="center" className="profit-loss-icon">
            <ArrowTiltDown />
          </Flex>{" "}
          <Text>-7% from yesterday</Text>
        </Flex>
      </Flex>
      <Flex className="lower-container" justify="center" align="center">
        <Title level={3}>Withdraw</Title>
      </Flex>
    </>
  );
};

const DailySales = () => {
  // ? chart configuration and data
  const [chartConfig] = useState({
    series: [
      {
        name: "Daily Sales",
        data: [166, 174, 156, 204, 156, 180, 161, 145],
      },
    ],
    grid: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    options: {
      colors: ["#0BA8D8"],
      chart: {
        type: "line",
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
    },
  });

  return (
    <Flex vertical className="daily-sales-stats">
      <Flex
        justify="space-between"
        gap={50}
        align="flex-start"
        className="daily-sales-chart-container"
      >
        {/* // ? Chart title and sales period date range */}
        <Flex vertical className="daily-sales-chart-header">
          <Title level={3}>Daily Sales</Title>
          <Text className="sales-period">July 25th - 31st</Text>
        </Flex>

        {/* // ? how many days data filter */}
        <Select
          defaultValue="7"
          options={[
            {
              value: "3",
              label: "Last 3 days",
            },
            {
              value: "7",
              label: "Last 7 days",
            },
            {
              value: "14",
              label: "Last 14 days",
            },
            {
              value: "30",
              label: "Last 30 days",
            },
          ]}
        />
      </Flex>

      {/* // ? the chart */}
      <ReactApexChart
        options={chartConfig.options}
        series={chartConfig.series}
        type="line"
        height={340}
      />
    </Flex>
  );
};

export default DashboardStats;
