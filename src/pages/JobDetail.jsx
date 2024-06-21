import React, { useEffect, useState } from "react";
import {
  Flex,
  Row,
  Typography,
  Col,
  Card,
  Tag,
  Image,
  Skeleton,
  Menu,
} from "antd";
import { Calendar, MapPin, Timer, FilePen, Star } from "lucide-react";
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
import { Link, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { jobManagementStore } from "../stores/jobManagementStore";
import GeneralModal from "../components/Modals/GeneralModal";
import CustomAvatar from "../components/common/CustomAvatar";
import { showConfirm } from "../utils/modal";

const JobDetail = () => {
  const tablet = useTablet();
  const { id } = useParams();
  const [isModalOpened, setModalOpen] = useState(false);
  const [modalImgs, setModalImgs] = useState([]);
  const {
    // func
    fetchSingleJob,
    resolveDispute,
    // data
    jobDetail,
    // loaders
    jobDetailLoader,
    disputeLoader,
  } = jobManagementStore(useShallow((state) => state));

  useEffect(() => {
    fetchSingleJob(id);
  }, []);

  const handleCancel = () => {
    setModalOpen(false);
  };

  const disputeHandler = async (resolution) => {
    const payload = {
      resolution,
      jobId: id,
    };
    const res = await resolveDispute(payload);
    if (res) {
      await fetchSingleJob(id);
    }
  };

  const onChangeHandler = (e) => {
    showConfirm(
      "Update",
      "Do you want to resolve the dispute?",
      () => disputeHandler(e.key),
      disputeLoader
    );
  };

  const items = [
    {
      key: "sub1",
      label: "Resolve dispute",
      children: [
        {
          key: "refund",
          label: "Refund to client",
        },
        {
          key: "release",
          label: "Release worker's payment",
        },
      ],
    },
  ];

  const ActionComponent = () => {
    return (
      <Flex align="center" className=" " gap={10}>
        {/* // ? sort by filter */}
        <Flex className="" align="center">
          <Menu
            mode="vertical"
            items={items}
            onClick={onChangeHandler}
            className="custom-select px-6 bg-[#E6F5FB] rounded-md"
            triggerSubMenuAction={"click"}
          />
          {/* <Select
            defaultValue={""}
            suffixIcon={<ChevronDown />}
            className="custom-select w-fit"
            options={[
              {
                value: "refund",
                label: "Refund to client",
              },
              {
                value: "release",
                label: "Release worker's payment",
              },
            ]}
            onChange={(value) => onChangeHandler(value)}
          /> */}
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      <Flex className="settings" justify="center">
        <Row className="settings-container">
          <Row
            justify={"space-between"}
            className="settings-form-container w-full h-full p-4"
          >
            {/* Main Intro */}
            <Col lg={24} md={24} sm={24} sx={24} className="border-0">
              {jobDetailLoader ? (
                <Skeleton active />
              ) : (
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
                      {Array.isArray(jobDetail?.tags) &&
                        jobDetail?.tags.length > 0 &&
                        jobDetail?.tags[0].trim() !== "" && (
                          <span className="font-semibold text-gray-shade-1 text-md !mb-0">
                            {jobDetail?.tags?.[0]
                              .split(",")
                              .map((i) => "#" + i.trim())
                              .join(" ")}
                          </span>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-shade-1 font-semibold">
                        {getTimeFromNow(jobDetail?.createdAt)}
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
              )}

              <Flex align="center" className="my-4 border-0 border-purple-900">
                {jobDetailLoader ? (
                  <Skeleton.Avatar active size={64} shape={"circle"} />
                ) : (
                  <CustomAvatar
                    imgUrl={jobDetail?.user?.profilePic}
                    name={jobDetail?.user?.name}
                    size={48}
                  />
                )}
                <Flex className="px-4" vertical>
                  {jobDetailLoader ? (
                    <Skeleton.Input size="small" active />
                  ) : (
                    <Text className="font-semibold text-gray-shade-1">
                      {jobDetail?.user?.name}
                    </Text>
                  )}
                  {jobDetailLoader ? (
                    <Skeleton.Input size="small" active className="mt-1" />
                  ) : (
                    <Text className="font-semibold text-gray-shade-1">
                      {jobDetail?.user?.email}
                    </Text>
                  )}
                </Flex>
              </Flex>

              {jobDetailLoader ? (
                <Skeleton.Node
                  active
                  size={164}
                  className="!size-[364px] !w-[80%] mx-2"
                >
                  <></>
                </Skeleton.Node>
              ) : (
                <ReactCarousel images={jobDetail?.images} />
              )}
            </Col>

            {/* job desc */}
            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              className="border-0 border-purple-500"
            >
              <Card
                type="inner"
                className="my-4 card-head"
                title="Job Description"
                bordered={false}
              >
                {jobDetailLoader ? (
                  <Skeleton active />
                ) : (
                  <Text className="text-gray-shade-1 font-semibold !w-full">
                    {capitalizeFirstLetter(jobDetail?.description)}
                  </Text>
                )}
              </Card>
            </Col>

            {/* About job */}
            <Col lg={24} md={24} sm={24} sx={24} className="">
              <Card
                type="inner"
                title="About Job"
                bordered={false}
                className="my-4 rounded-lg card-head"
              >
                {jobDetailLoader ? (
                  <div className="flex flex-col space-y-4">
                    <Skeleton.Input
                      active
                      block
                      size="small"
                      className="px-0 mx-0"
                    />
                    <Row gutter={[16, 32]} wrap>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Col lg={8} md={12} sm={12} xs={24} className="flex">
                          <Skeleton.Input size="small" key={index} active />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : (
                  <>
                    <Text className="text-xl font-bold px-3">
                      {formatPrice(jobDetail?.budget)}
                    </Text>

                    <Row className="my-4 !w-full" gutter={[16, 16]}>
                      <Col lg={8} md={12} sm={12} xs={24}>
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

                      <Col lg={8} md={12} sm={12} xs={24}>
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

                      <Col lg={8} md={12} sm={12} xs={24}>
                        <Flex gap={10}>
                          <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                            <MapPin size={20} className="text-gray-shade-1" />
                          </Flex>
                          <Flex vertical gap={0}>
                            <Text className="text-black font-bold">
                              Location
                            </Text>
                            <Text className="text-gray-shade-1">
                              {jobDetail?.location?.string}
                            </Text>
                          </Flex>
                        </Flex>
                      </Col>

                      {jobDetail?.status !== "open" && (
                        <Col lg={8} md={12} sm={12} xs={24}>
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

                      {jobDetail?.status != "open" &&
                        jobDetail?.status != "cancelled" &&
                        jobDetail?.status !== "disputed" && (
                          <Col lg={8} md={12} sm={12} xs={24}>
                            <Flex gap={10}>
                              <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                                <Star size={20} className="text-gray-shade-1" />
                              </Flex>
                              <Flex vertical gap={0}>
                                <Text className="text-black font-bold">
                                  Rating
                                </Text>
                                <Text className="text-gray-shade-1">
                                  {jobDetail?.review?.rating?.toFixed(1)}
                                </Text>
                              </Flex>
                            </Flex>
                          </Col>
                        )}

                      {jobDetail?.status !== "open" &&
                        jobDetail?.status !== "cancelled" &&
                        jobDetail?.status !== "disputed" && (
                          <Col span={24}>
                            <div className="flex flex-col">
                              <Text className="font-bold text-lg !pb-0 !mb-0 px-3">
                                Review
                              </Text>
                              <Text className="text-gray-shade-1 font-semibold px-3">
                                {jobDetail?.review?.review}
                              </Text>
                            </div>
                          </Col>
                        )}
                    </Row>
                  </>
                )}
              </Card>
            </Col>

            {/* Worker Detail */}
            {jobDetail?.worker && (
              <Col lg={24} md={24} sm={24} xs={24}>
                <Card
                  type="inner"
                  title="Worker"
                  bordered={false}
                  className="my-4 rounded-lg card-head"
                >
                  <Row className="my-4" gutter={[16, 16]}>
                    <Col span={24} className="">
                      <Flex className="justify-center items-center flex-col">
                        <CustomAvatar
                          name={jobDetail?.worker?.name}
                          imgUrl={baseURL + jobDetail?.worker?.profilePic}
                          size={96}
                        />
                        <Title className="capitalize" level={2}>
                          {jobDetail?.worker?.name}
                        </Title>
                        <Flex className="justify-between items-center w-full">
                          <Text className="font-semibold text-lg">Rating</Text>
                          <Text className="text-shade-1 font-semibold text-lg">
                            {jobDetail?.worker?.avgRating} / 5.0
                            <span className="pl-2">
                              <StarFilled
                                size={22}
                                style={{
                                  color: "orange",
                                }}
                              />
                            </span>
                          </Text>
                        </Flex>

                        <Flex className="justify-between items-center w-full mt-2">
                          <Text className="font-semibold text-lg">
                            Success Rate
                          </Text>
                          <Tag
                            className="font-semibold text-lg !m-0 border-0 py-1"
                            color={successRateColors(
                              jobDetail?.worker?.successRate
                            )}
                          >
                            {jobDetail?.worker?.successRate?.toFixed(2)}%
                          </Tag>
                        </Flex>
                      </Flex>
                    </Col>
                  </Row>
                </Card>
              </Col>
            )}

            {/* Completed Details/ Dispute Detail */}
            <Col span={24}>
              {jobDetail?.proofOfWork && jobDetail?.status !== "disputed" ? (
                <Card
                  type="inner"
                  title={"Completed Details"}
                  className="my-4 rounded-lg card-head"
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    className="my-2 w-full"
                  >
                    <Text className="font-semibold text-gray-shade-1 text-lg">
                      Proof of work:
                    </Text>
                    <div>
                      <Link
                        onClick={() => {
                          setModalImgs(pow);
                          setModalOpen(true);
                        }}
                        className="font-semibold"
                        style={{ color: "#1677ff" }}
                      >
                        View images
                      </Link>
                    </div>
                  </Flex>
                  <Text>
                    {jobDetail?.proofOfWork?.description}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vero eligendi quod assumenda.
                  </Text>
                </Card>
              ) : (
                jobDetail?.proofOfWork &&
                jobDetail?.status === "disputed" && (
                  <Card
                    title={"Dispute detail"}
                    type="inner"
                    extra={<ActionComponent />}
                    className="my-4 rounded-lg card-head"
                  >
                    <Row justify={"space-between"} gutter={[0, 12]}>
                      <Col span={12}>
                        <Title level={4}>Worker</Title>

                        <Col>
                          <Text className="text-gray-shade-1 font-semibold text-[15px]">
                            Proof of Work:
                          </Text>
                          <Flex vertical>
                            <Text>{jobDetail?.proofOfWork?.description}</Text>

                            <Link
                              onClick={() => {
                                setModalImgs(jobDetail?.proofOfWork?.images);
                                setModalOpen(true);
                              }}
                              className="font-semibold"
                              style={{ color: "#1677ff" }}
                            >
                              View images
                            </Link>
                          </Flex>
                        </Col>
                      </Col>
                      <Col span={12}>
                        <Title level={4}>Customer</Title>
                        <Flex vertical>
                          <Text className="text-gray-shade-1 font-semibold text-[15px]">
                            Reason:
                          </Text>
                          <Text>{jobDetail?.disputedDetails?.description}</Text>
                          {console.log("modalImgs", jobDetail?.disputedDetails)}
                          <Link
                            onClick={() => {
                              setModalImgs(
                                jobDetail?.disputedDetails?.proofOfWork
                              );
                              setModalOpen(true);
                            }}
                            className="font-semibold"
                            style={{ color: "#1677ff" }}
                          >
                            View images
                          </Link>
                        </Flex>
                      </Col>
                    </Row>
                  </Card>
                )
              )}
            </Col>
          </Row>
        </Row>
      </Flex>

      <GeneralModal
        open={isModalOpened}
        handleCancel={handleCancel}
        component={
          <>
            {/* Images */}
            <Row gutter={[16, 16]} className="mb-3 mt-8">
              {modalImgs?.map((img, index) => (
                <Col key={index} lg={8} md={8} sm={12} xs={12}>
                  <Image
                    width={150}
                    height={150}
                    src={baseURL + img}
                    fallback={""}
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Col>
              ))}
            </Row>
          </>
        }
      />
    </>
  );
};

export default JobDetail;
