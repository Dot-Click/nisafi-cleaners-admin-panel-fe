import React, { useEffect, useState } from "react";
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
  Skeleton,
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
import { Link, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { jobManagementStore } from "../stores/jobManagementStore";
import GeneralModal from "../components/Modals/GeneralModal";

const images = [
  "https://placehold.it/310x150",
  "https://placehold.it/310x150",
  "https://placehold.it/310x150",
  "https://placehold.it/310x150",
];
const JobDetail = () => {
  const tablet = useTablet();
  const { id } = useParams();
  const [isModalOpened, setModalOpen] = useState(false);

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

  const pow = [
    "https://img.freepik.com/free-vector/realistic-cleaning-products-ad_52683-38718.jpg?t=st=1718290398~exp=1718293998~hmac=b43019beb6857aad93c03ee3d5c5d81bdfd8b184d07ea0af62fd467031c3e9e2&w=900",
    "https://img.freepik.com/free-vector/washing-machine-advertising-banner-with-realistic-washing-machine-laundry-detergent-images-with-text-clickable-button_1284-33059.jpg?t=st=1718290406~exp=1718294006~hmac=2f01d9b227db2f34594ef65347fd11fa3a8177209f5b0c838e8277c514312162&w=740",
    "https://img.freepik.com/free-vector/realistic-cleaning-products-ad_52683-38718.jpg?t=st=1718290398~exp=1718293998~hmac=b43019beb6857aad93c03ee3d5c5d81bdfd8b184d07ea0af62fd467031c3e9e2&w=900",
    "https://img.freepik.com/free-vector/washing-machine-advertising-banner-with-realistic-washing-machine-laundry-detergent-images-with-text-clickable-button_1284-33059.jpg?t=st=1718290406~exp=1718294006~hmac=2f01d9b227db2f34594ef65347fd11fa3a8177209f5b0c838e8277c514312162&w=740",
    "https://img.freepik.com/free-vector/realistic-cleaning-products-ad_52683-38718.jpg?t=st=1718290398~exp=1718293998~hmac=b43019beb6857aad93c03ee3d5c5d81bdfd8b184d07ea0af62fd467031c3e9e2&w=900",
    "https://img.freepik.com/free-vector/washing-machine-advertising-banner-with-realistic-washing-machine-laundry-detergent-images-with-text-clickable-button_1284-33059.jpg?t=st=1718290406~exp=1718294006~hmac=2f01d9b227db2f34594ef65347fd11fa3a8177209f5b0c838e8277c514312162&w=740",

    "https://img.freepik.com/free-vector/realistic-cleaning-products-ad_52683-38718.jpg?t=st=1718290398~exp=1718293998~hmac=b43019beb6857aad93c03ee3d5c5d81bdfd8b184d07ea0af62fd467031c3e9e2&w=900",
    "https://img.freepik.com/free-vector/washing-machine-advertising-banner-with-realistic-washing-machine-laundry-detergent-images-with-text-clickable-button_1284-33059.jpg?t=st=1718290406~exp=1718294006~hmac=2f01d9b227db2f34594ef65347fd11fa3a8177209f5b0c838e8277c514312162&w=740",
  ];

  const handleCancel = () => {
    setModalOpen(false);
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
                    {jobDetail?.tags?.length > 0 && (
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
              {false ? (
                <Skeleton.Node className="!w-full" active={true}>
                  <></>
                </Skeleton.Node>
              ) : (
                <ReactCarousel images={images} />
              )}
            </Col>

            {/* job desc */}
            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              className="border-0 border-purple-500"
            >
              <Card
                type="inner"
                className="my-4"
                title="Job Description"
                bordered={false}
              >
                <Text className="text-gray-shade-1 font-semibold !w-full">
                  {jobDetail?.description}
                </Text>
              </Card>
            </Col>

            {/* About job */}
            <Col lg={24} md={24} sm={24} sx={24} className="">
              <Card
                type="inner"
                title="About Job"
                bordered={false}
                className="rounded-lg"
              >
                {false ? (
                  <div className="flex flex-col space-y-4">
                    <Skeleton.Input
                      active={true}
                      block={true}
                      className="px-0 mx-0"
                    />
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton.Input key={index} active={true} />
                    ))}
                  </div>
                ) : (
                  <>
                    <Text className="text-xl font-bold px-3">
                      {formatPrice(jobDetail?.budget)}
                    </Text>

                    <Row className="my-4 !w-full" gutter={[16, 16]}>
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
                  </>
                )}
              </Card>
            </Col>

            {/* Worker Detail */}
            {jobDetail?.worker && (
              <Col lg={24} md={24} sm={24} xs={24}>
                {false ? (
                  <Skeleton className="my-4" />
                ) : (
                  <Card
                    type="inner"
                    title="Worker"
                    bordered={false}
                    className="rounded-lg my-4"
                  >
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
                            <Text className="font-semibold text-lg">
                              Rating
                            </Text>
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
                            <Text className="font-semibold text-lg">
                              Success Rate
                            </Text>
                            <Tag
                              className="font-semibold text-lg !m-0 border-0 py-1"
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
                )}
              </Col>
            )}

            {/* Completed Details */}
            {jobDetail?.proofOfWork && (
              <Col span={24}>
                <Card type="inner" title={"Completed Details"}>
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
                        onClick={() => setModalOpen(true)}
                        href=""
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
              </Col>
            )}
          </Row>
        </Row>
      </Flex>

      <GeneralModal
        open={isModalOpened}
        handleCancel={handleCancel}
        component={
          <>
            <Text className="font-bold text-lg">Proof of work</Text>

            {/* Images */}
            <Row gutter={[16, 16]}>
              {pow?.map((img, index) => (
                <Col key={index} lg={8} md={8} sm={12} xs={12}>
                  <Image
                    width={150}
                    height={150}
                    src={img}
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
