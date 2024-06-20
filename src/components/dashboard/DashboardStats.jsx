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
import { MapPin } from "lucide-react";
import RecentJobCard from "./RecentJobCard";
import JobChart from "./JobChart";

const { Text, Title } = Typography;

const DashboardStats = () => {
  const {
    //  func
    fetchRecentJobs,
    fetchJobStats,
    // data
    totalJobs,
    disputedJobs,
    completedJobs,
    recentJobs,
    // loader
    jobStatsLoader,
    recentJobsLoader,
  } = useDashboardStore(useShallow((state) => state));

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [status, setStatus] = useState("total");

  useEffect(() => {
    fetchJobStats(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    fetchRecentJobs();
  }, []);

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
          {jobStatsLoader ? (
            <Skeleton.Node active size={164} className="!w-full !h-[380px]">
              <></>
            </Skeleton.Node>
          ) : (
            <JobChart
              totalJobs={totalJobs}
              disputedJobs={disputedJobs}
              completedJobs={completedJobs}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              status={status}
              setStatus={setStatus}
            />
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
          {recentJobsLoader
            ? Array.from({ length: 4 }).map((_, index) => (
                <Col
                  key={index}
                  xxl={6}
                  lg={12}
                  sm={24}
                  md={12}
                  xs={24}
                  className="order-card"
                >
                  <Flex className="inner-card" vertical gap={12}>
                    <Skeleton active className="!w-full !h-[150px]" />
                  </Flex>
                </Col>
              ))
            : recentJobs?.map((job, index) => (
                <RecentJobCard key={index} job={job} />
              ))}
        </Row>
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

export default DashboardStats;
