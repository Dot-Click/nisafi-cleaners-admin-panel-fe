import React, { useEffect, useState } from "react";
import {
  Col,
  DatePicker,
  Flex,
  Row,
  Select,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import ReactApexChart from "react-apexcharts";

const { Text, Title } = Typography;

const JobChart = ({
  totalJobs,
  disputedJobs,
  completedJobs,
  selectedYear,
  setSelectedYear,
  status,
  setStatus,
}) => {
  const [chartConfig, setChartConfig] = useState({
    series: [
      {
        name: "Jobs",
        data: [],
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

  const updateChartData = () => {
    let data = [];
    if (status === "total") {
      data = totalJobs?.map((val) => val?.totalJobs) || [];
    } else if (status === "completed") {
      data = completedJobs?.map((val) => val?.completedJobs) || [];
    } else if (status === "disputed") {
      data = disputedJobs?.map((val) => val?.disputedJobs) || [];
    }

    setChartConfig((prevConfig) => ({
      ...prevConfig,
      series: [
        {
          name: "Jobs",
          data: data,
        },
      ],
    }));
  };

  useEffect(() => {
    updateChartData();
  }, [totalJobs, disputedJobs, completedJobs, status, selectedYear]);

  const handleStatus = (value) => {
    setStatus(value);
  };
  const yearHandler = (date) => {
    setSelectedYear(date?.year());
  };

  return (
    <Flex vertical className="daily-sales-stats">
      <Flex
        justify="space-between"
        gap={25}
        align="flex-start"
        className="daily-sales-chart-container"
      >
        {/* // ? Chart title and sales period date range */}
        <Flex vertical className="daily-sales-chart-header">
          <Title level={3}>Job Stats</Title>
          {/* // ? how many days data filter */}
          <Row className="">
            <Select
              className="border-[1px] rounded-md w-fit !text-sm"
              defaultValue={status}
              onChange={handleStatus}
              options={[
                {
                  value: "total",
                  label: "Total Jobs",
                },
                {
                  value: "completed",
                  label: "Completed Jobs",
                },
                {
                  value: "disputed",
                  label: "Disputed Jobs",
                },
              ]}
            />
          </Row>
        </Flex>

        <DatePicker onChange={yearHandler} picker="year" />
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

export default JobChart;
