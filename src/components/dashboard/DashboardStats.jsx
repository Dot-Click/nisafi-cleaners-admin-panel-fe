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
import StatsCard from "./StatsCard";
import { FaUserTie, FaBriefcase, FaUserAstronaut } from "react-icons/fa";
import { statsColorHandler } from "../../utils/index";

const { Text, Title } = Typography;

const DashboardStats = () => {
  const {
    //  func
    fetchRecentJobs,
    fetchJobStats,
    fetchJobStats1,
    fetchGeneralStats,
    // data
    totalJobs,
    disputedJobs,
    completedJobs,
    recentJobs,

    totalJobsCount,
    totalWorkersCount,
    totalClientsCount,

    // loader
    jobStatsLoader,
    recentJobsLoader,
    generalStatsLoader,
  } = useDashboardStore(useShallow((state) => state));

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [status, setStatus] = useState("thisYear");

  useEffect(() => {
    fetchJobStats(status);
  }, [status]);

  useEffect(() => {
    fetchRecentJobs();
    fetchGeneralStats();
  }, []);

  return (
    <Flex vertical className="dashboard-stats" gap={45}>
      {/* // ? stats ccards */}

      <Row className="stats-cards w-full">
        {[
          {
            type: "jobs",
            title: "Total Job Posts",
            count: totalJobsCount,
            icon: FaBriefcase,
          },
          {
            type: "workers",
            title: "Total Workers",
            count: totalWorkersCount,
            icon: FaUserAstronaut,
          },
          {
            type: "revenue",
            title: "Total Clients",
            count: totalClientsCount,
            icon: FaUserTie,
          },
        ]?.map(({ type, title, count, icon: Icon }) => (
          <Col
            key={type}
            xxl={6}
            lg={12}
            sm={24}
            md={12}
            xs={24}
            flex={1}
            className={`stats-card py-4 ${statsColorHandler(type)}`}
          >
            {generalStatsLoader ? (
              <Skeleton active className="h-[150px]" />
            ) : (
              <StatsCard 
                title={title}
                count={count}
                icon={<Icon fill={statsColorHandler(type)} />}
              />
            )}
          </Col>
        ))}
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
              status={status}
              setStatus={setStatus}
            />
          )}
        </Col>
      </Flex>

      {/* // ? recent jobs */}
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
