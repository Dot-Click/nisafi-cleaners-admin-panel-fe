import { useState } from "react";
import { Flex, Row, Select, Typography } from "antd";
import ReactApexChart from "react-apexcharts";

const { Text, Title } = Typography;

const JobChart = ({
  totalJobs,
  disputedJobs,
  completedJobs,
  status,
  setStatus,
}) => {
  const totalStats = totalJobs?.map((i) => ({
    x: i?.month,
    y: i?.count,
  }));
  const disputedStats = disputedJobs?.map((i) => ({
    x: i?.month,
    y: i?.count,
  }));
  const completedStats = completedJobs?.map((i) => ({
    x: i?.month,
    y: i?.count,
  }));
  const dataSet = [
    // Data for Product A
    totalStats,
    disputedStats,
    completedStats,
  ];
  const [chartConfig, setChartConfig] = useState({
    series: [
      {
        name: "Total Jobs",
        data: dataSet[0],
        color: "#1FB1DE",
      },
      {
        name: "Completed Jobs",
        data: dataSet[1],
        color: "#28A745",
      },
      {
        name: "Disputed Jobs",
        data: dataSet[2],
        // color: "#6d6868",
        color: "#DC3545",
      },
    ],
    options: {
      colors: ["#0BA8D8"],
      chart: {
        type: "line",
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return Math.round(value);
          },
        },
      },
    },
  });

  const yearHandler = (date) => {
    console.log("date", date?.$y);
    setSelectedYear(date?.year());
  };

  const handleStatus = (value) => {
    console.log("value", value);
    setStatus(value);
  };
  return (
    <Flex vertical className="daily-sales-stats">
      <Flex
        justify="space-between"
        gap={25}
        align="flex-start"
        className="daily-sales-chart-container"
      >
        <Row className="">
          <Select
            className="border-[1px] rounded-md w-fit !text-sm"
            defaultValue={status}
            onChange={handleStatus}
            options={[
              {
                value: "thisYear",
                label: "This Year",
              },
              {
                value: "lastYear",
                label: "Last Year",
              },
              {
                value: "last3Year",
                label: "Last 3 Year",
              },
            ]}
          />
        </Row>
      </Flex>

      {/* // ? the chart */}
      <ReactApexChart
        options={chartConfig.options}
        series={chartConfig.series}
        type="area"
        height={340}
      />
    </Flex>
  );
};

export default JobChart;
