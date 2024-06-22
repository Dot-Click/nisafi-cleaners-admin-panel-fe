import { useState } from "react";
import { Typography, Flex, Select, Progress } from "antd";
import ReactApexChart from "react-apexcharts";
const { Text, Title } = Typography;

const DashboardStatsAside = () => {
  // ? chart configuration and data
  const [chartOptions] = useState({
    series: [
      {
        name: "Offline",
        color: "#1A1757",
        data: [53, 43, 18, 38, 63, 78, 37],
      },
      {
        name: "Online",
        color: "#0BA8D8",
        data: [24, 87, 40, 51, 46, 25, 93],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "36%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["01", "02", "03", "04", "05", "06", "07"],
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  return (
    <>
      <Flex vertical className="total-customers-chart">
        <Flex
          justify="space-between"
          align="center"
          style={{ width: "100%" }}
          gap={10}
        >
          {/* // ? chart title */}
          <Title level={2}>Total Customer</Title>

          {/* // ? how many days data filter */}
          <Select
            defaultValue="7"
            style={{
              width: 100,
            }}
            options={[
              {
                value: "3",
                label: "3 days",
              },
              {
                value: "7",
                label: "7 days",
              },
              {
                value: "14",
                label: "14 days",
              },
              {
                value: "30",
                label: "30 days",
              },
            ]}
          />
        </Flex>

        {/* // ? chart */}
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height={300}
        />
      </Flex>

      <Flex vertical className="orders-performance-progress" gap={20}>
        <Title level={2}>Orders Performance</Title>
        <Flex vertical gap={15}>
          <Progress type="circle" percent={79} />
          <Flex vertical>
            <Text className="progress-span-1">79 orders Finished</Text>
            <Text className="progress-span-2">21 orders remaining</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default DashboardStatsAside;
