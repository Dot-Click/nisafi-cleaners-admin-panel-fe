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
import React, { useEffect, useState } from "react";
import { dashboardStats, recentOrders } from "../../data/data";
import ReactApexChart from "react-apexcharts";
import ArrowTiltDown from "../../assets/icons/ArrowTiltDown";
import { Link } from "react-router-dom";
import moment from "moment";
import { useShallow } from "zustand/react/shallow";
import { useDashboardStore } from "../../stores/dashboardStore";
import {
  capitalizeFirstLetter,
  formatPrice,
  getStatusColors,
} from "../../utils";
import { MapPin } from "lucide-react";

const { Text, Title } = Typography;

const DashboardStats = () => {
  const {
    fetchJobStats,
    totalJobs,
    disputedJobs,
    completedJobs,
    jobStatsLoader,
  } = useDashboardStore(useShallow((state) => state));
  console.log("disputedJobs......", disputedJobs);

  return (
    <Flex vertical className="dashboard-stats" gap={45}>
      {/* // ? stats ccards */}
      <Row className="stats-cards">
        {dashboardStats?.map((stat, i) => {
          return <StatCard stat={stat} key={i} />;
        })}
      </Row>

      {/* // ? sales and balance stats */}
      <Flex className="sales-and-balance">
        <Col flex={1}>
          {false ? (
            <Skeleton.Node active size={164} className="!w-full !h-[380px]">
              <></>
            </Skeleton.Node>
          ) : (
            <DailySales />
          )}
        </Col>
      </Flex>

      {/* // ? recent orders */}
      <Flex vertical className="recent-orders-section" gap={15}>
        <Flex justify="space-between" gap={20}>
          <Title level={3}>Recent Jobs</Title>
          <Link
            to={"/dashboard/jobs/management"}
            className="see-all font-semibold"
          >
            See all
          </Link>
        </Flex>

        {/* // ? recent orders cards */}
        <Row className="order-cards">
          {recentOrders.length > 0 &&
            recentOrders.slice(0, 4).map((order, index) => {
              return <OrderCard key={index} order={order} />;
            })}
        </Row>
      </Flex>
    </Flex>
  );
};

const OrderCard = ({ order }) => {
  return (
    <Col xxl={6} lg={12} sm={24} md={12} xs={24} className="order-card">
      <Flex className="inner-card" vertical gap={12}>
        <Flex
          justify="space-between"
          gap={10}
          className="order-status-and-number"
        >
          <Text className="order-number">24th July, 2024</Text>
          <Tag
            color={getStatusColors("completed")}
            className="px-4 py-1 font-semibold text-[14px]"
          >
            {capitalizeFirstLetter("completed")}
          </Tag>
        </Flex>
        <Text className="customer-name !mb-0 !pb-0">Laundary Expert</Text>
        {/* {["nisafi", "expert", "laudnary", "washing machine"]?.length > 0 && (
          <span className="font-semibold text-gray-shade-1 text-md !mb-0">
            {jobDetail?.tags?.[0]
              .split(",")
              .map((i) => "#" + i.trim())
              .join(" ")}
          </span>
        )} */}

        <span className=" text-gray-shade-1 text-md !mt-0 !pt-0">
          {["nisafi", "expert", "laudnary", "washing machine"].map(
            (i) => "#" + i.trim()
          )}
        </span>

        <Flex align={"center"} gap={5}>
          <MapPin size={17} className="text-gray-shade-1" />
          <Text className=" text-[14px] text-gray-shade-1">
            USA, los Angeles
          </Text>
        </Flex>
        <Flex justify="space-between" align="center">
          <Text className="font-semibold text-lg text-gray-shade-1">
            ${377}
          </Text>
          <Link to={"#"} className="font-semibold see-all">
            View Detail
          </Link>
        </Flex>
      </Flex>
    </Col>
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
  const {
    fetchJobStats,
    totalJobs,
    disputedJobs,
    completedJobs,
    jobStatsLoader,
  } = useDashboardStore(useShallow((state) => state));
  console.log("disputedJobs......", disputedJobs);

  const [selectedYear, setselectedYear] = useState(new Date().getFullYear());

  const handleStatus = (value) => {
    console.log("value", value);
    setstatus(value);
  };
  const yearHandler = (date) => {
    console.log("date", date?.$y);
    setselectedYear(date?.$y);
  };
  useEffect(() => {
    fetchJobStats(selectedYear);
  }, [selectedYear]);

  let data = [];
  if (status === "total") {
    data = totalJobs?.map((val) => val?.totalJobs) || [];
  } else if (status === "completed") {
    data = completedJobs?.map((val) => val?.completedJobs) || [];
  } else if (status === "disputed") {
    data = disputedJobs?.map((val) => val?.disputedJobs) || [];
  }
  console.log("data", data);
  // ? chart configuration and data
  const [chartConfig] = useState({
    series: [
      {
        name: "Jobs",
        data: data,
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
          <Row className="w-fit">
            <Select
              className="border-[1px] rounded-md "
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

export default DashboardStats;
