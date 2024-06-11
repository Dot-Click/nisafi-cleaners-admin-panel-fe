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
import React from "react";
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
import { successRateColors } from "../utils";
import { avatarUrl } from "../configs/axiosConfig";

const contentStyle = {
  margin: 0,
  height: "260px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const images = [
  "http://placehold.it/310x150",
  "http://placehold.it/310x150",
  "http://placehold.it/310x150",
  "http://placehold.it/310x150/FFA500",
];
const JobDetail = () => {
  return (
    <Flex className="settings" justify="center">
      <Row className="settings-container">
        <Row
          justify={"space-between"}
          span={24}
          className="settings-form-container w-full h-full p-4"
        >
          <Col span={16}>
            <Flex justify="space-between" align="">
              <div>
                <span className="font-bold text-[22px] !mb-0">
                  Laundry Attendant
                </span>

                <div className="flex justify-between items-center">
                  <span className="text-gray-shade-1 font-semibold">
                    Posted 3 days ago
                  </span>
                </div>
              </div>
              <div>
                <Tag
                  color={"green"}
                  className="px-4 py-1 font-semibold text-[14px]"
                >
                  Completed
                </Tag>
              </div>
            </Flex>

            {/* Worker and Customer */}
            <Row
              className="my-6 border-0 pr-4"
              gutter={[16, 16]}
              justify="space-between "
            >
              <Col>
                <Flex justify="" align="center" gap={"middle"}>
                  <Image
                    src={avatarUrl}
                    className="rounded-full !size-16"
                    preview={false}
                  />
                  <Flex vertical>
                    <Text>Md Umer</Text>
                    <Text>example@gmail.com</Text>
                  </Flex>
                </Flex>
              </Col>
            </Row>

            <Row className="my-4 border-0">
              <ReactCarousel images={images} />
            </Row>

            <Card className="my-4" title="Job Description" bordered={false}>
              <Text className="text-gray-shade-1 font-semibold">
                As a Laundry Attendant, you will be responsible for ensuring the
                cleanliness and neat presentation of linens, towels, and other
                textiles used in our establishment. Your duties will include
                operating laundry equipment, sorting, washing, drying, folding,
                and ironing linens according to established procedures and
                standards. Additionally, you will be expected to maintain a
                clean and organized work area, monitor inventory levels of
                cleaning supplies and linens, and report any maintenance issues
                or equipment malfunctions to the appropriate personnel.
                Attention to detail, efficiency, and a strong work ethic are
                essential for success in this role.
              </Text>

              <Flex vertical className="my-4">
                <Title level={5}>Resonsibilities:</Title>
                <Text className="text-gray-shade-1 font-semibold text-[16px]">
                  Oversaw laundry operations, managed a team of laundry
                  attendants, scheduled shifts, maintained inventory levels,
                  ensured compliance with safety and sanitation standards.
                </Text>
              </Flex>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="About Job" bordered={false} className="rounded-lg">
              <Text className="text-xl font-bold">$500,00</Text>

              <Row className="my-4" gutter={[16, 16]}>
                <Col span={24}>
                  <Flex gap={10}>
                    <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                      <Calendar size={20} className="text-gray-shade-1" />
                    </Flex>
                    <Flex vertical gap={0}>
                      <Text className="text-black font-bold">Posted</Text>
                      <Text className="text-gray-shade-1">24 Sep 2024</Text>
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
                      <Text className="text-gray-shade-1 ">24</Text>
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
                        Sans Fransico, CA
                      </Text>
                    </Flex>
                  </Flex>
                </Col>

                <Col span={24}>
                  <Flex gap={10}>
                    <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                      <Timer size={20} className="text-gray-shade-1" />
                    </Flex>
                    <Flex vertical gap={0}>
                      <Text className="text-black font-bold">
                        Schedule Time
                      </Text>
                      <Text className="text-gray-shade-1">
                        8:00am to 6:00pm
                      </Text>
                    </Flex>
                  </Flex>
                </Col>

                <Col span={24}>
                  <Flex gap={10}>
                    <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                      <Star size={20} className="text-gray-shade-1" />
                    </Flex>
                    <Flex vertical gap={0}>
                      <Text className="text-black font-bold">Rating</Text>
                      <Text className="text-gray-shade-1">4.0</Text>
                    </Flex>
                  </Flex>
                </Col>

                <Text className="font-bold text-lg !pb-0 !mb-0">Review</Text>
                <Text className="text-gray-shade-1 font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam incidunt expedita vitae sapiente, delectus porro
                  dolore dolor numquam fugiat modi, quod assumenda.
                </Text>
              </Row>
            </Card>

            {/* worker */}

            <Card title="Worker" bordered={false} className="rounded-lg my-6">
              <Row className="my-4" gutter={[16, 16]}>
                <Col span={24} className="">
                  <Flex className="justify-center items-center flex-col">
                    <Avatar
                      className="w-[120px] h-[120px] mb-4"
                      size={"large"}
                      src={avatarUrl}
                    />
                    <Title level={2}>Shabir Don</Title>
                    <Flex className="justify-between items-center w-full">
                      <Text className="font-bold text-lg">Rating</Text>
                      <Text className="text-shade-1 font-semibold text-lg">
                        4.0/5.0
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
                        color={successRateColors(72)}
                      >
                        {72}%
                      </Tag>
                    </Flex>
                  </Flex>
                </Col>
              </Row>
            </Card>

            {/* worker end here */}
          </Col>
        </Row>
      </Row>
    </Flex>
  );
};

export default JobDetail;
