import { Col, Flex, Image, Modal, Row, Typography } from "antd";
import React from "react";
import { FaCloudDownloadAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import pdfImage from "/images/icons/pdf.png";
import Download from "../../assets/icons/Download";

const { Text } = Typography;

const UserDetailsModal = ({ isOpened, handleCloseModal }) => {
  return (
    <>
      {/* // ? user details modal */}
      <Modal
        open={isOpened}
        footer={null}
        onCancel={handleCloseModal}
        destroyOnClose
        className="user-details-modal"
        centered
        width={1200}
      >
        <Row className="modal-container">
          <Col xl={8} lg={12} xs={24} className="modal-card">
            <Flex vertical gap={10} align="flex" className="h-100">
              <Text className="field-label">Profile Image</Text>
              <Flex className="modal-card-inner">
                <Image src="https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs" />
              </Flex>
            </Flex>
          </Col>

          {/* // ? document component */}
          <Document
            title={"ID document (Front)"}
            documentName={"id-card-front-side.pdf"}
            documentURL={
              "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf"
            }
            fileSize={"2 MB"}
          />

          {/* // ? document component */}
          <Document
            title={"ID document (Back)"}
            documentName={"id-card-back-side.pdf"}
            documentURL={
              "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf"
            }
            fileSize={"1.5 MB"}
          />

          {/* // ? personal information */}
          <Col xl={8} lg={12} xs={24} className="modal-card">
            <Flex className="modal-card-inner fields-card" vertical>
              <Text className="field-label">Personal Information</Text>

              <Flex vertical className="card-fields">
                <Text className="field-name">Full Name:</Text>
                <Text className="field-value">Johnson Willy</Text>
              </Flex>

              <Flex vertical className="card-fields">
                <Text className="field-name">Email Address:</Text>
                <Text className="field-value">johonsonwilly@gmail.com</Text>
              </Flex>

              <Flex vertical className="card-fields">
                <Text className="field-name">Phone Number:</Text>
                <Text className="field-value">+122333 444 000</Text>
              </Flex>
            </Flex>
          </Col>

          {/* // ? additional information */}
          <Col xl={8} lg={12} xs={24} className="modal-card">
            <Flex className="modal-card-inner fields-card" vertical>
              <Text className="field-label">Additional Information</Text>

              <Flex vertical className="card-fields">
                <Text className="field-name">Profession:</Text>
                <Text className="field-value">Professional Cleaner</Text>
              </Flex>

              <Flex vertical className="card-fields">
                <Text className="field-name">ID Number:</Text>
                <Text className="field-value">121293203-12810</Text>
              </Flex>

              <Flex vertical className="card-fields">
                <Text className="field-name">Certificate:</Text>
                <Text className="field-value">Cleaner</Text>
              </Flex>
            </Flex>
          </Col>

          {/* // ? address information */}
          <Col xl={8} lg={12} xs={24} className="modal-card">
            <Flex className="modal-card-inner fields-card" vertical>
              <Flex vertical className="card-fields">
                <Text className="field-name">Address:</Text>
                <Text className="field-value">
                  Uherová 4, Poprad, Slovakia, 05801
                </Text>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Modal>
    </>
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
    <Col xl={8} lg={12} xs={24} className="modal-card">
      <Flex vertical gap={10} align="flex">
        <Text className="field-label">{title}</Text>
        <Flex className="modal-card-inner" gap={16} vertical>
          <Flex className="pdf">
            <Link to={documentURL} target="_blank">
              <Flex className="pdf-document cursor-pointer">
                {/* // ? using the native iframe tag because there's no Iframe component in antd */}
                <iframe
                  src={documentURL}
                  title={`${documentName}?#view=fitH`}
                  type="application/pdf"
                  className="pdf-iframe"
                />
              </Flex>
              <Flex className="pdf-document-footer">
                <Image src={pdfImage} width={40} alt="pdf-icon" />
              </Flex>
            </Link>
          </Flex>

          {/* // ? document title and download button */}
          <Flex justify="space-between" gap={16} className="pdf-title">
            <Flex vertical className="name-and-size">
              <Text className="file-name">
                {documentName.length > 11 ? trimDocumentName() : documentName}
              </Text>
              <Text className="file-size">{fileSize}</Text>
            </Flex>
            <Link download={documentURL} target="_blank">
              <Download />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Col>
  );
};

export default UserDetailsModal;
