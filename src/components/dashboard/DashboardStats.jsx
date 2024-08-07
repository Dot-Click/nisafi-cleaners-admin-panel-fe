import { Col, Flex, Row, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useDashboardStore } from "../../stores/dashboardStore";
import RecentJobCard from "./RecentJobCard";
import JobChart from "./JobChart";
import StatsCard from "./StatsCard";
import { FaUserTie, FaBriefcase, FaUserAstronaut } from "react-icons/fa";
import { statsColorHandler } from "../../utils/index";

const { Title } = Typography;

const DashboardStats = () => {
  const {
    //  func
    fetchRecentJobs,
    fetchJobStats,
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
              <Skeleton.Button active size="large" />
            ) : (
              <StatsCard
                title={title}
                count={count}
                icon={<Icon size={22} fill={statsColorHandler(type)} />}
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

export default DashboardStats;
