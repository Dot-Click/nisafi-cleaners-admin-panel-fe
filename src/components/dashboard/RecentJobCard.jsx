import { Col, Flex, Tag, Typography } from "antd";
import { MapPin } from "lucide-react";
import {
  capitalizeFirstLetter,
  formatDateString,
  getStatusColors,
} from "../../utils";
import { Link } from "react-router-dom";
const { Text, Title } = Typography;

const RecentJobCard = ({ job }) => {
  return (
    <Col xxl={6} lg={12} sm={24} md={12} xs={24} className="order-card">
      <Flex className="inner-card" vertical gap={12}>
        <Flex
          justify="space-between"
          gap={10}
          className="order-status-and-number"
        >
          <Text className="order-number">
            {formatDateString(job?.createdAt)}
          </Text>
          <Tag
            color={getStatusColors(job?.status)}
            className="px-4 py-1 font-semibold text-[14px] capitalize"
          >
            {job?.status}
          </Tag>
        </Flex>
        <Text className="customer-name !mb-0 !pb-0">{job?.type}</Text>

        <Flex align={"center"} gap={5}>
          <MapPin size={17} className="text-gray-shade-1" />
          <Text className=" text-[14px] text-gray-shade-1">
            {job?.location?.string}
          </Text>
        </Flex>
        <Flex justify="space-between" align="center">
          <Text className="font-semibold text-lg text-gray-shade-1">
            CFA {job?.budget}
          </Text>
          <Link
            to={`/dashboard/job/details/${job._id}`}
            className="font-semibold see-all"
          >
            View Detail
          </Link>
        </Flex>
      </Flex>
    </Col>
  );
};

export default RecentJobCard;
