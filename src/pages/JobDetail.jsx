import {
  Flex,
  Row,
  Typography,
  Col,
  Card,
  Carousel,
  Avatar,
  Tag,
  Image,
} from "antd";
import React from "react";
import { Calendar, MapPin, Timer, HandCoins } from "lucide-react";
const { Title, Text } = Typography;

const contentStyle = {
  margin: 0,
  height: "260px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
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
            <Flex gap={10} align="center" className="" justify="space-between">
              <Avatar
                size={52}
                src={"https://github.com/shadcn.png"}
                className=""
              />
              <Tag
                color={"green"}
                className="px-4 py-1 font-semibold text-[14px]"
              >
                Completed
              </Tag>

              {/* <Text className="text-lg font-semibold">Md Umer</Text> */}
            </Flex>
            <Flex vertical>
              <span className="font-bold text-[22px] !mb-0">
                Laundry Attendant
              </span>
              <div className="flex justify-between items-center">
                <span className="text-gray-shade-1 font-semibold">
                  Posted 3 days ago
                </span>
              </div>
            </Flex>

            {/* <div className="w-[75%] my-4">
              <Carousel arrows dotPosition="bottom" infinite={false}>
                <div style={contentStyle}>
                  <Image
                    preview={false}
                    className="w-full !object-contain"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </div>
                <div style={contentStyle}>
                  <Image
                    preview={false}
                    className="w-full !object-contain"
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg
"
                  />
                </div>
                <div style={contentStyle}>
                  <Image
                    className="w-full !object-contain"
                    preview={false}
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  />
                </div>
              </Carousel>
            </div> */}

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

              {/* Experience */}
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
          <Col span={6}>
            <Card title="About Job" bordered={false} className="rounded-lg">
              {/* Experience */}
              {/* <Flex vertical className="mb-4">
                <Title level={5}>Experience:</Title>
                <Text className="text-gray-shade-1 font-semibold text-[16px]">
                  {"workerInfo?.experience"}
                </Text>
              </Flex> */}

              <Text className="text-xl font-bold">$500,00</Text>

              <Row className="my-4" gutter={[16, 16]}>
                <Row>
                  <Flex gap={10}>
                    <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                      <Calendar size={20} className="text-gray-shade-1" />
                    </Flex>
                    <Flex vertical gap={0}>
                      <Text className="text-black font-bold">24 Sep 2024</Text>
                      <Text className="text-gray-shade-1">Posted</Text>
                    </Flex>
                  </Flex>
                </Row>

                <Row>
                  <Flex gap={10}>
                    <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                      <MapPin size={20} className="text-gray-shade-1" />
                    </Flex>
                    <Flex vertical gap={0}>
                      <Text className="text-black font-bold">
                        Sans Fransico, CA
                      </Text>
                      <Text className="text-gray-shade-1">Location</Text>
                    </Flex>
                  </Flex>
                </Row>

                <Row>
                  <Flex gap={10}>
                    <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                      <Timer size={20} className="text-gray-shade-1" />
                    </Flex>
                    <Flex vertical gap={0}>
                      <Text className="text-black font-bold">
                        8:00am to 6:00pm
                      </Text>
                      <Text className="text-gray-shade-1">Schedule Time</Text>
                    </Flex>
                  </Flex>
                </Row>
                <Row>
                  <Flex gap={10}>
                    <Flex className="p-3 bg-[#f9fafb] rounded-full items-center justify-center">
                      <HandCoins size={20} className="text-gray-shade-1" />
                    </Flex>
                    <Flex vertical gap={0}>
                      <Text className="text-black font-bold">Carpet Clean</Text>
                      <Text className="text-gray-shade-1">Job-Type</Text>
                    </Flex>
                  </Flex>
                </Row>
              </Row>
            </Card>
          </Col>
        </Row>
      </Row>
    </Flex>
  );
};

export default JobDetail;
