import pagenotfound from "../assets/404.png";
import { Link } from "react-router-dom";
import { Flex, Image, Button, Row, Col } from "antd";

const NotFound = () => {
  return (
    <Col className="h-screen">
      <Image
        preview={false}
        src={pagenotfound}
        style={{
          width: "40%",
        }}
        className="!h-264-[px] w-full object-contain my-4 mx-auto"
      />
      <Row className="w-full">
        <Flex className="mx-auto">
          <Link to={"/"}>
            <Button className="primary-btn px-8 py-2 h-full w-full">
              Back To Home
            </Button>
          </Link>
        </Flex>
      </Row>
    </Col>
  );
};

export default NotFound;
