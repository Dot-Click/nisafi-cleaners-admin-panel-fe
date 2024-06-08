import { Flex, Row, Typography, Col, Card, Carousel } from "antd";
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
        <Row span={24} className="settings-form-container w-full h-full p-4">
          <Col span={18}>
            <div className="w-[75%]">
              <Carousel arrows dotPosition="bottom" infinite={false}>
                <div>
                  <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>4</h3>
                </div>
              </Carousel>
            </div>
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

              <Row className="!py-4">
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
