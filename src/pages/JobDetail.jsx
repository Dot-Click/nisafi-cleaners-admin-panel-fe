import React, { useEffect } from "react";
import {
  Flex,
  Row,
  Typography,
  Col,
  Card,
  Tag,
  Image,
  Avatar,
  Rate,
} from "antd";
import {
  Calendar,
  MapPin,
  Timer,
  HandCoins,
  FilePen,
  Star,
} from "lucide-react";
const { Title, Text } = Typography;
import ReactCarousel from "../components/common/ReactCarousel";
import { StarFilled } from "@ant-design/icons";
import {
  capitalizeFirstLetter,
  formatPrice,
  getStatusColors,
  getTimeFromNow,
  successRateColors,
} from "../utils";
import { avatarUrl, baseURL } from "../configs/axiosConfig";
import { useTablet } from "../services/hooks/mediaquery";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { jobManagementStore } from "../stores/jobManagementStore";

const images = [
  "http://placehold.it/310x150",
  "http://placehold.it/310x150",
  "http://placehold.it/310x150",
  "http://placehold.it/310x150",
];
const JobDetail = () => {
  const tablet = useTablet();
  const { id } = useParams();

  const {
    // func
    fetchSingleJob,
    // data
    jobDetail,
    // loaders
    jobDetailLoader,
  } = jobManagementStore(useShallow((state) => state));

  useEffect(() => {
    fetchSingleJob(id);
  }, []);

  console.log("jobDetail......", jobDetail);

  return (
    <Flex className="settings" justify="center">
      <Row className="settings-container">
        <Row
          justify={"space-between"}
          className="settings-form-container w-full h-full p-4"
        >
          <Row className="border-0" justify="space-between" gutter={[0, 16]}>
            <Col lg={15} md={24} sm={24} className="border-0">
              <Flex
                justify="space-between"
                align=""
                className="my-4 border-0 border-purple-900"
              >
                <div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[22px] !mb-0">
                      {jobDetail?.type}
                    </span>
                    <span className="font-semibold text-gray-shade-1 text-md !mb-0">
                      {jobDetail?.tags?.[0]
                        .split(",")
                        .map((i) => "#" + i.trim())
                        .join(" ")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-shade-1 font-semibold">
                      {getTimeFromNow(JobDetail?.createdAt)}
                    </span>
                  </div>
                </div>
                <div>
                  <Tag
                    color={getStatusColors(jobDetail?.status)}
                    className="px-4 py-1 font-semibold text-[14px]"
                  >
                    {capitalizeFirstLetter(jobDetail?.status)}
                  </Tag>
                </div>
              </Flex>

              <Flex
                justify=""
                align="center"
                gap={""}
                className="my-4 border-0 border-purple-900"
              >
                <Image
                  src={avatarUrl}
                  className="rounded-full !size-16"
                  preview={false}
                />
                <Flex vertical>
                  <Text>{jobDetail?.user?.name}</Text>
                  <Text>{jobDetail?.user?.email}</Text>
                </Flex>
              </Flex>
              {/* <ReactCarousel images={jobDetail?.images} /> */}
              <ReactCarousel images={images} />
            </Col>

            <Col lg={8} md={24} sm={24} className="">
              <Card title="About Job" bordered={false} className="rounded-lg">
                <Text className="text-xl font-bold">
                  {formatPrice(jobDetail?.budget)}
                </Text>

                <Row className="my-4" gutter={[16, 16]}>
                  <Col span={24}>
                    <Flex gap={10}>
                      <Flex className="px-3 bg-[#f9fafb] rounded-full items-center justify-center">
                        <Calendar size={20} className="text-gray-shade-1" />
                      </Flex>
                      <Flex vertical gap={0}>
                        <Text className="text-black font-bold">Date</Text>
                        <Text className="text-gray-shade-1">
                          {jobDetail?.date}
                        </Text>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Flex gap={10}>
                      <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                        <FilePen size={20} className="text-gray-shade-1" />
                      </Flex>
                      <Flex vertical gap={0}>
                        <Text className="text-black font-bold">
                          Proposals Count
                        </Text>
                        <Text className="text-gray-shade-1">
                          {jobDetail?.proposals?.length}
                        </Text>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Flex gap={10}>
                      <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                        <MapPin size={20} className="text-gray-shade-1" />
                      </Flex>
                      <Flex vertical gap={0}>
                        <Text className="text-black font-bold">Location</Text>
                        <Text className="text-gray-shade-1">
                          {jobDetail?.location?.string}
                        </Text>
                      </Flex>
                    </Flex>
                  </Col>

                  {jobDetail?.status !== "open" && (
                    <Col span={24}>
                      <Flex gap={10}>
                        <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                          <Timer size={20} className="text-gray-shade-1" />
                        </Flex>
                        <Flex vertical gap={0}>
                          <Text className="text-black font-bold">
                            Pickup Time
                          </Text>
                          <Text className="text-gray-shade-1">
                            {jobDetail?.laundryPickupTime}
                          </Text>
                        </Flex>
                      </Flex>
                    </Col>
                  )}

                  {jobDetail?.status !== "open" && (
                    <Col span={24}>
                      <Flex gap={10}>
                        <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                          <Star size={20} className="text-gray-shade-1" />
                        </Flex>
                        <Flex vertical gap={0}>
                          <Text className="text-black font-bold">Rating</Text>
                          <Text className="text-gray-shade-1">
                            {jobDetail?.review?.rating?.toFixed(1)}
                          </Text>
                        </Flex>
                      </Flex>
                    </Col>
                  )}

                  {jobDetail?.status !== "open" && (
                    <div className="flex flex-col">
                      <Text className="font-bold text-lg !pb-0 !mb-0 px-3">
                        Review
                      </Text>
                      <Text className="text-gray-shade-1 font-semibold px-3">
                        {jobDetail?.review?.review}
                      </Text>
                    </div>
                  )}
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={[32, 16]} justify="space-between" className="!w-full">
            <Col
              order={tablet ? 2 : 1}
              xl={16}
              lg={16}
              md={24}
              sm={24}
              className="border-0 border-purple-500"
            >
              <Card className="my-4" title="Job Description" bordered={false}>
                <Text className="text-gray-shade-1 font-semibold !w-full">
                  {jobDetail?.description}
                  {/* Oversaw laundry operations, managed a team of laundry
                  attendants, scheduled shifts, maintained inventory levels,
                  ensured compliance with safety and sanitation standards. */}
                </Text>

                {/* <Flex vertical className="my-4">
                  <Title level={5}>Resonsibilities:</Title>
                  <Text className="text-gray-shade-1 font-semibold text-[16px]">
                    Oversaw laundry operations, managed a team of laundry
                    attendants, scheduled shifts, maintained inventory levels,
                    ensured compliance with safety and sanitation standards.
                  </Text>
                </Flex> */}
              </Card>
            </Col>
            <Col order={tablet ? 1 : 2} lg={8} md={24} sm={24}>
              <Card title="Worker" bordered={false} className="rounded-lg my-4">
                <Row className="my-4" gutter={[16, 16]}>
                  <Col span={24} className="">
                    <Flex className="justify-center items-center flex-col">
                      <Avatar
                        className="w-[120px] h-[120px] mb-4"
                        size={"large"}
                        // src={avatarUrl}
                        src={baseURL + jobDetail?.worker?.profilePic}
                      />
                      <Title className="capitalize" level={2}>
                        {jobDetail?.worker?.name}
                      </Title>
                      <Flex className="justify-between items-center w-full">
                        <Text className="font-bold text-lg">Rating</Text>
                        <Text className="text-shade-1 font-semibold text-lg">
                          {jobDetail?.worker?.avgRating}/5.0
                          <span>
                            <StarFilled
                              size={22}
                              style={{
                                color: "orange",
                                // backgroundColor: "yellow",
                              }}
                            />
                          </span>
                        </Text>
                      </Flex>

                      <Flex className="justify-between items-center w-full mt-2">
                        <Text className="font-bold text-lg">Success Rate</Text>
                        <Tag
                          className="font-bold text-lg !m-0 border-0 py-1"
                          color={successRateColors(
                            jobDetail?.worker?.successRate
                          )}
                        >
                          {jobDetail?.worker?.successRate}%
                        </Tag>
                      </Flex>
                    </Flex>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Row>
      </Row>
    </Flex>
  );
};

export default JobDetail;
