import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Flex,
  Skeleton,
  Row,
  Image,
  Typography,
  Rate,
  Card,
  Progress,
  Tag,
} from "antd";
const { Title, Text } = Typography;
import { Link, useParams } from "react-router-dom";
import pdfImage from "../../public/images/icons/pdf.png";
import Download from "../assets/icons/Download";
import { CheckCheck, Copy } from "lucide-react";
import { successMessage } from "../services/helpers";
import { useShallow } from "zustand/react/shallow";
import { useUserManagementStore } from "../stores/userManagementStore";
import {
  capitalizeFirstLetter,
  formatDateString,
  splittingSkills,
} from "../utils";
import { baseURL } from "../configs/axiosConfig";
import { showConfirm } from "../utils/modal";
import LoadingBar from "react-top-loading-bar";

const WorkerInfo = () => {
  const { id } = useParams();
  const [showCheck, setShowCheck] = useState(false);
  const [progress, setProgress] = useState(20);
  const {
    // func
    fetchUserDetail,
    approveWorker,
    // data
    userDetail,
    // loaders
    userDetailLoader,
    approvalLoader,
  } = useUserManagementStore(useShallow((state) => state));

  useEffect(() => {
    fetchUserDetail(id);
  }, []);

  useEffect(() => {
    setProgress(100);
  }, [userDetail]);

  const copyTextToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowCheck(true);
        setTimeout(() => {
          setShowCheck(false);
        }, 1500);
        successMessage("Copied!🎉");
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  const updateWorkerStatus = async (status) => {
    const res = await approveWorker(id, status);
    if (res) {
      fetchUserDetail(id);
    }
  };

  const handleOkClick = (status) => {
    showConfirm(
      "Update",
      "Are you sure you want to update status",
      () => updateWorkerStatus(status),
      approvalLoader
    );
  };

  const Document = ({ title, documentURL, documentName, fileSize }) => {
    const trimDocumentName = () => {
      const stringLength = documentName?.length;
      const stringBegin = documentName?.slice(0, 7);
      const stringEnd = documentName?.slice(stringLength - 12, stringLength);
      return `${stringBegin}...${stringEnd}`;
    };

    return (
      <Col lg={8} md={12} xs={24} className="">
        <Row vertical gap={10} align="flex" className="h-100">
          <Col>
            <Text className="font-semibold">{title}</Text>
            <Flex className="shadow-sm rounded-md" gap={16} vertical>
              <Flex className="pdf">
                <Link to={documentURL} target="_blank">
                  <Flex className="pdf-document cursor-pointer">
                    {/* // ? using the native iframe tag because there's no Iframe component in antd */}
                    <iframe
                      // src={documentURL}
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(documentURL)}&embedded=true`}
  
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
            
                
                <a
                  href={documentURL}
                  // download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download />
                </a>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Col>
    );
  };

  return (
    <>
      <LoadingBar
        height={4}
        color={"#C3EAF5"}
        progress={progress}
        onLoaderFinished={() => {}}
      />

      <Flex className="settings" justify="center" vertical>
        <Link
          to={-1}
          className="welcome-text back-text d-flex align-items-center pb-2"
        >
          {" "}
          <svg
            className="me-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={20}
          >
            <path
              d="M10.1 23a1 1 0 000-1.41L5.5 17h23.55a1 1 0 000-2H5.53l4.57-4.57A1 1 0 008.68 9l-6.36 6.37a.9.9 0 000 1.27L8.68 23a1 1 0 001.42 0z"
              data-name="Layer 2"
            ></path>
          </svg>{" "}
          Back
        </Link>
        <Row className="settings-container">
          <Col span={24} className="settings-container-header"></Col>
          <Col span={24} className="settings-form-container">
            <Row gutter={[16, 16]} className="px-6 py-4" wrap>
              <Col lg={7} md={24} sm={24} sx={24} className="border-0">
                <Flex
                  className="border-0 border-red-400 flex -translate-y-[100px]"
                  vertical
                  align="center"
                >
                  {userDetailLoader ? (
                    <Skeleton.Avatar active shape="circle" size={180} />
                  ) : (
                    <Image
                      preview={false}
                      size={"large"}
                      src={userDetail?.profilePic}
                      fallback={`https://placehold.co/180x180/6BC3E6/white?text=${capitalizeFirstLetter(
                        userDetail?.name?.charAt(0)
                      )}`}
                      className="display-avatar border-0 border-purple-600 !w-[180px] !h-[180px] rounded-full bg-slate-300 !aspect-square !object-contain !cursor-default"
                    />
                  )}

                  <Row className="w-full" align="center" justify="center">
                    <Col lg={24} md={24} sm={24}>
                      <Text
                        level={4}
                        className="capitalize text-center pt-2 text-lg font-bold block "
                      >
                        {userDetail?.name}
                      </Text>
                    </Col>
                    <Col
                      lg={24}
                      md={24}
                      sm={24}
                      justify="center"
                      align="center"
                      gap="10"
                    >
                      {userDetail?.avgRating && (
                        <>
                          <Rate
                            disabled
                            defaultValue={userDetail?.avgRating}
                            style={{
                              fontSize: 16,
                              marginRight: 10,
                            }}
                            className=""
                          />
                          <Text>{userDetail?.avgRating?.toFixed(1)}</Text>
                        </>
                      )}
                    </Col>
                    <Col lg={16} md={13} sm={13} xs={18}>
                      <Progress
                        percent={userDetail?.successRate?.toFixed(0)}
                        status="active"
                        strokeColor="#87D068"
                      />
                    </Col>
                  </Row>
                </Flex>

                {/* personal Details */}

                <Row
                  vertical={false}
                  className="w-fit wrap"
                  justify="center"
                  gap={"middle"}
                  gutter={[16, 16]}
                >
                  {/* email */}
                  <Col gap={"large"} lg={24} md={12} sm={12} xs={24}>
                    <Flex
                      className="bg-[#f9fafb] px-4 py-1 rounded-lg  min-w-[200px]"
                      vertical
                    >
                      <Title level={5}>Email</Title>
                      <Flex gap={15}>
                        {userDetailLoader ? (
                          <Skeleton.Input
                            active={true}
                            size={22}
                            className="mb-1"
                          />
                        ) : (
                          <>
                            <Text className="text-gray-shade-1 font-semibold">
                              {userDetail?.email}
                            </Text>

                            {showCheck ? (
                              <CheckCheck
                                size={18}
                                className="cursor-pointer text-gray-shade-1 transition-all"
                              />
                            ) : (
                              <Copy
                                size={18}
                                className="cursor-pointer text-gray-shade-1 transition-all"
                                onClick={() =>
                                  copyTextToClipboard(userDetail?.email)
                                }
                              />
                            )}
                          </>
                        )}
                      </Flex>
                    </Flex>
                  </Col>

                  {/* Phone */}
                  <Col gap={"large"} lg={24} md={12} sm={12} xs={24}>
                    <Flex
                      className="bg-[#f9fafb] px-4 py-1 rounded-lg min-w-[200px]"
                      vertical
                    >
                      <Title level={5}>Phone Number</Title>
                      {userDetailLoader ? (
                        <Skeleton.Input
                          active={true}
                          size={22}
                          className="mb-1"
                        />
                      ) : (
                        <Text className="text-gray-shade-1 font-semibold">
                          {userDetail?.phone}
                        </Text>
                      )}
                    </Flex>
                  </Col>

                  {/* JoinAt */}
                  <Col gap={"large"} lg={24} md={12} sm={12} xs={24}>
                    <Flex
                      className="bg-[#f9fafb] px-4 py-1 rounded-lg min-w-[200px]"
                      vertical
                    >
                      <Title level={5}>Joining Date</Title>
                      {userDetailLoader ? (
                        <Skeleton.Input
                          active={true}
                          size={22}
                          className="mb-1"
                        />
                      ) : (
                        <Text className="text-gray-shade-1 font-semibold">
                          {formatDateString(userDetail?.createdAt)}
                        </Text>
                      )}
                    </Flex>
                  </Col>

                  <Col gap={"large"} lg={24} md={12} sm={12} xs={24}>
                    <Flex
                      className="bg-[#f9fafb] px-4 py-1 rounded-lg min-w-[200px]"
                      vertical
                    >
                      <Title level={5}>Address</Title>

                      {userDetailLoader ? (
                        <Skeleton.Input
                          active={true}
                          size={22}
                          className="mb-1"
                        />
                      ) : (
                        <Text className="text-gray-shade-1 font-semibold">
                          {userDetail?.address || "Nil"}
                        </Text>
                      )}
                    </Flex>
                  </Col>

                  {/* address */}
                </Row>
              </Col>
              <Col lg={17} md={24} sm={24} sx={24}>
                <Flex
                  className="mb-4 items-end mx-4  "
                  justify="flex-end"
                  gap={"middle"}
                >
                  {userDetail?.adminApproval === "pending" ? (
                    <>
                      <Button
                        onClick={() => handleOkClick("approved")}
                        className="primary-btn"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleOkClick("rejected")}
                        className="danger-btn"
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Tag
                      color={
                        userDetail?.adminApproval === "rejected"
                          ? "red"
                          : "green"
                      }
                      className="!capitalize px-4 py-1  text-[16px]"
                    >
                      {userDetail?.adminApproval}
                    </Tag>
                  )}
                </Flex>
                <Card title="About Worker" bordered={false}>
                  {userDetailLoader ? (
                    <Skeleton active className="!w-full" />
                  ) : (
                    <Text className="text-gray-shade-1 font-semibold">
                      {capitalizeFirstLetter(userDetail?.aboutMe)}
                    </Text>
                  )}

                  {/* Qualification */}
                  <Flex vertical className="my-4">
                    <Title level={5}>Profession:</Title>
                    {userDetailLoader ? (
                      <>
                        <Skeleton.Input active={true} block={true} size={22} />
                      </>
                    ) : (
                      <Text className="text-gray-shade-1 font-semibold">
                        {userDetail?.profession}
                      </Text>
                    )}
                  </Flex>
                  {/* skills */}
                  <Title level={5}>Skills:</Title>
                  <Flex wrap={"wrap"} gap={"middle"} className="mb-4">
                    {userDetailLoader ? (
                      <div className="flex gap-2 w-full flex-wrap">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <Skeleton.Input key={index} active={true} size={22} />
                        ))}
                      </div>
                    ) : (
                      splittingSkills(userDetail?.skills)?.map((i, index) => (
                        <Flex
                          key={index}
                          wrap={"wrap"}
                          className="rounded-lg bg-[#EDEFEF] px-4 py-[6px] w-fit font-semibold flex-wrap"
                        >
                          <Text className="capitalize">{i}</Text>
                        </Flex>
                      ))
                    )}
                  </Flex>

                  {/* Experience */}
                  <Flex vertical className="mb-4">
                    <Title level={5}>Experience:</Title>
                    {userDetailLoader ? (
                      <Skeleton.Input active={true} block={true} size={22} />
                    ) : (
                      <Text className="text-gray-shade-1 font-semibold text-[16px]">
                        {userDetail?.experience}
                      </Text>
                    )}
                  </Flex>
                  {/* Qualification */}
                  <Flex vertical className="mb-4 ">
                    <Title level={5}>Qualification:</Title>
                    {userDetailLoader ? (
                      <Skeleton.Input active={true} block={true} size={22} />
                    ) : (
                      <Text className="text-gray-shade-1 font-semibold">
                        {capitalizeFirstLetter(userDetail?.qualification)}
                      </Text>
                    )}
                  </Flex>

                  {/* doc */}
                  <Title level={5}>Documents:</Title>
                  <Row gutter={[16, 16]}>
                    {userDetailLoader ? (
                      Array.from({ length: 2 }).map((_, index) => (
                        <Skeleton.Node
                          key={index}
                          active={true}
                          size={64}
                          className="!size-[264px] mx-2"
                        >
                          <></>
                        </Skeleton.Node>
                      ))
                    ) : userDetail?.idDocs?.length > 0 ? (
                      userDetail?.idDocs?.map((doc, index) => (
                        <Document
                          key={index}
                          title={doc?.documentTitle}
                          documentName={doc?.filename}
                          documentURL={doc}
                          fileSize={doc?.size}
                        />
                      ))
                    ) : (
                      <Text className="text-gray-shade-1 font-semibold text-[16px] px-2">
                        No Documents found!
                      </Text>
                    )}
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Flex>
    </>
  );
};

export default WorkerInfo;
