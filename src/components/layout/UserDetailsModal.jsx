import { Button, Col, Flex, Image, Modal, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import pdfImage from "/images/icons/pdf.png";
import Download from "../../assets/icons/Download";

const { Text } = Typography;

const UserDetailsModal = ({ isOpened, handleCloseModal, data }) => {
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
          <Col lg={8} md={12} xs={24} className="modal-card">
            <Flex vertical gap={10} align="flex" className="h-100">
              <Text className="field-label">Profile Image</Text>
              <Flex className="modal-card-inner">
                <Image
                  src={data?.image}
                  fallback="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp"
                />
              </Flex>
            </Flex>
          </Col>

          {/* // ? document component */}
          {data?.documents?.map((doc, index) => {
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

          {/* // ? personal information */}
          <Col lg={8} md={12} xs={24} className="modal-card">
            <Flex className="modal-card-inner fields-card" vertical>
              <Text className="field-label">Personal Information</Text>

              <Flex vertical className="card-fields">
                <Text className="field-name">Full Name:</Text>
                <Text className="field-value">{data?.name}</Text>
              </Flex>

              <Flex vertical className="card-fields">
                <Text className="field-name">Email Address:</Text>
                <Text className="field-value">{data?.email}</Text>
              </Flex>

              <Flex vertical className="card-fields">
                <Text className="field-name">Phone Number:</Text>
                <Text className="field-value">{data?.phone}</Text>
              </Flex>
            </Flex>
          </Col>

          {/* // ? additional information */}
          <Col lg={8} md={12} xs={24} className="modal-card">
            <Flex className="modal-card-inner fields-card" vertical>
              <Text className="field-label">Additional Information</Text>

              <Flex vertical className="card-fields">
                <Text className="field-name">Profession:</Text>
                <Text className="field-value">{data?.profession}</Text>
              </Flex>

              <Flex vertical className="card-fields">
                <Text className="field-name">ID Number:</Text>
                <Text className="field-value">{data?.idNumber}</Text>
              </Flex>

              <Flex vertical className="card-fields">
                <Text className="field-name">Certificate:</Text>
                <Text className="field-value">{data?.certificate}</Text>
              </Flex>
            </Flex>
          </Col>

          {/* // ? address information */}
          <Col lg={8} md={12} xs={24} className="modal-card last-card">
            <Flex className="modal-card-inner fields-card">
              <Flex vertical className="card-fields">
                <Text className="field-name">Address:</Text>
                <Text className="field-value">{data?.address}</Text>
              </Flex>
            </Flex>

            <Flex className="btns" gap={10}>
              <Button className="primary-btn" onClick={handleCloseModal}>
                Accept
              </Button>
              <Button className="danger-btn" onClick={handleCloseModal}>
                Reject
              </Button>
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
    <Col lg={8} md={12} xs={24} className="modal-card document-card">
      <Flex vertical gap={10} align="flex" className="h-100">
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
                {documentName?.length > 11 ? trimDocumentName() : documentName}
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
