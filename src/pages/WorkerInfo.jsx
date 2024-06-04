import React, { useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Flex,
  Input,
  Modal,
  Row,
  Image,
  Typography,
  Rate,
  Card,
} from "antd";
const { Title, Text } = Typography;
import { workerInfo } from "../data/data";
import { Link } from "react-router-dom";
import pdfImage from "../../public/images/icons/pdf.png";
import Download from "../assets/icons/Download";
import { useMobile, useTablet } from "../services/hooks/mediaquery";
import { Copy } from "lucide-react";
import { successMessage, showInfo } from "../services/helpers";

const WorkerInfo = () => {
  const tablet = useTablet();
  const mobile = useMobile();

  const copyTextToClipboard = (text) => {
    // successMessage("Copied!🎉");
    // showInfo("Copied");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // alert(text);
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  const Document = ({ title, documentURL, documentName, fileSize }) => {
    const trimDocumentName = () => {
      const stringLength = documentName?.length;
      const stringBegin = documentName?.slice(0, 7);
      const stringEnd = documentName?.slice(stringLength - 12, stringLength);
      return `${stringBegin}...${stringEnd}`;
    };

    return (
      <Col lg={8} md={12} xs={24}>
        <Row vertical gap={10} align="flex" className="h-100">
          <Col>
            <Text className="font-semibold">{title}</Text>
            <Flex className="shadow-sm rounded-md" gap={16} vertical>
              <Flex className="pdf">
                <Link to={documentURL} target="_blank">
                  <Flex className="pdf-document cursor-pointer">
                    {/* // ? using the native iframe tag because there's no Iframe component in antd */}
                    <iframe
                      src={documentURL}
                      title={`${documentName}?#view=fitH`}
                      type="application/pdf"
                      className="pdf-iframe overflow-x-hidden overflow-y-hidden"
                      height={300}
                      width={"100%"}
                    />
                  </Flex>
                  <Flex className="pdf-document-footer">
                    <Image src={pdfImage} width={40} alt="pdf-icon" />
                  </Flex>
                </Link>
              </Flex>

              {/* // ? document title and download button */}
              <Flex
                justify="space-between"
                gap={16}
                className="pdf-title px-4 py-2"
              >
                <Flex vertical className="name-and-size">
                  <Text className="file-name">
                    {documentName?.length > 11
                      ? trimDocumentName()
                      : documentName}
                  </Text>
                  <Text className="file-size">{fileSize}</Text>
                </Flex>
                <Link download={documentURL} target="_blank">
                  <Download />
                </Link>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Col>
    );
  };
  return (
    <Flex className="settings" justify="center">
      <Row className="settings-container">
        <Col span={24} className="settings-container-header"></Col>
        <Col span={24} className="settings-form-container">
          <Row className="border-0 pb-4">
            <Col lg={6} md={22} sm={22} sx={22} className="mx-6 border-0">
              <Flex
                className="border-0 border-red-400 flex -translate-y-[100px]"
                vertical
                align="center"
              >
                <Avatar
                  src={workerInfo.profilePic}
                  className="display-avatar  border-0 border-purple-600"
                />
                <Text level={4} className="text-center pt-2 text-lg font-bold">
                  {workerInfo.username}
                </Text>

                <Flex gap={"small"} align="center">
                  <Rate
                    disabled
                    defaultValue={workerInfo?.rating}
                    style={{
                      fontSize: 16,
                    }}
                  />
                  <Text>{workerInfo?.rating?.toFixed(1)}</Text>
                </Flex>
              </Flex>

              {/* personal Details */}

              <Flex
                vertical={true}
                className="w-fit"
                justify="center"
                gap={"middle"}
              >
                {/* name */}
                <Flex className="bg-[#f9fafb] px-4 py-1 rounded-lg" vertical>
                  <Title level={5}>Name</Title>
                  <Text className="text-gray-shade-1 font-semibold">
                    {workerInfo?.username}
                  </Text>
                </Flex>
                {/* email */}
                <Flex className="bg-[#f9fafb] px-4 py-1 rounded-lg" vertical>
                  <Title level={5}>Email</Title>
                  <Flex gap={15}>
                    <Text className="text-gray-shade-1 font-semibold">
                      {workerInfo?.email}
                    </Text>
                    <Copy
                      className="cursor-pointer text-gray-shade-1"
                      onClick={() => copyTextToClipboard(workerInfo.email)}
                    />
                  </Flex>
                </Flex>

                {/* Phone */}
                <Flex className="bg-[#f9fafb] px-4 py-1 rounded-lg" vertical>
                  <Title level={5}>Phone</Title>
                  <Text className="text-gray-shade-1 font-semibold">
                    {workerInfo?.phone}
                  </Text>
                </Flex>

                {/* JoinAt */}
                <Flex className="bg-[#f9fafb] px-4 py-1 rounded-lg" vertical>
                  <Title level={5}>JoinAt</Title>
                  <Text className="text-gray-shade-1 font-semibold">
                    {workerInfo?.joinAt}
                  </Text>
                </Flex>

                {/* address */}
                <Flex className="bg-[#f9fafb] px-4 py-1 rounded-lg" vertical>
                  <Title level={5}>Address</Title>
                  <Text className="text-gray-shade-1 font-semibold">
                    {workerInfo?.address}
                  </Text>
                </Flex>
              </Flex>
            </Col>
            <Col lg={16} md={24} className="my-4">
              <Flex
                className="mb-4 items-end mx-4  "
                justify="flex-end"
                gap={"middle"}
              >
                <Button className="primary-btn">Accept</Button>
                <Button className="danger-btn">Reject</Button>
              </Flex>
              <Card title="About Worker" bordered={false}>
                <Text className="text-gray-shade-1 font-semibold">
                  {workerInfo?.aboutMe}
                </Text>

                {/* Qualification */}
                <Flex vertical className="my-4">
                  <Title level={5}>Profession:</Title>
                  <Text className="text-gray-shade-1 font-semibold">
                    {workerInfo?.profession}
                  </Text>
                </Flex>
                {/* skills */}
                <Title level={5}>Skills:</Title>
                <Flex wrap={"wrap"} gap={"middle"} className="mb-4">
                  {workerInfo?.skills?.map((i, index) => (
                    <Flex
                      key={index}
                      wrap={"wrap"}
                      className="rounded-lg bg-[#EDEFEF] px-4 py-[6px] w-fit font-semibold flex-wrap"
                    >
                      <Text className="capitalize">{i}</Text>
                    </Flex>
                  ))}
                </Flex>

                {/* Experience */}
                <Flex vertical className="mb-4">
                  <Title level={5}>Experience:</Title>
                  <Text className="text-gray-shade-1 font-semibold text-[16px]">
                    {workerInfo?.experience}
                  </Text>
                </Flex>
                {/* Qualification */}
                <Flex vertical className="mb-4 ">
                  <Title level={5}>Qualification:</Title>
                  <Text className="text-gray-shade-1 font-semibold">
                    {workerInfo?.qualification}
                  </Text>
                </Flex>

                {/* docunm */}
                <Title level={5}>Documents:</Title>
                <Row gutter={[16, 16]}>
                  {workerInfo?.documents?.map((doc, index) => {
                    return (
                      <Document
                        key={index}
                        title={doc?.documentTitle}
                        documentName={doc?.filename}
                        documentURL={doc?.url}
                        fileSize={doc?.size}
                      />
                    );
                  })}
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Flex>
  );
};

export default WorkerInfo;
