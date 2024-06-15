import React, { useEffect } from "react";
import { Image, Row, Flex, Collapse, Button, Typography, Skeleton } from "antd";
import { useShallow } from "zustand/react/shallow";
import { useBannerStore } from "../../stores/bannerStore";
import { Link } from "lucide-react";
import { avatarUrl } from "../../configs/axiosConfig";
import { showConfirm } from "../../utils/modal";
const { Title, Text } = Typography;

const BannerSettings = () => {
  const {
    // func
    fetchBanners,
    deleteBanner,
    // data
    bannerList,
    // loader
    bannersLoader,
    delbannerLoader,
  } = useBannerStore(useShallow((state) => state));
  useEffect(() => {
    fetchBanners();
  }, []);

  const deleteHandler = async (id) => {
    // const res = await deleteBanner(id);
    // if (res) {
    //   fetchBanners();
    // }
    alert(id);
  };

  const handleClick = (id) => {
    showConfirm(
      "Delete",
      "Are you sure you want to delete?",
      () => deleteHandler(id),
      delbannerLoader
    );
  };

  return (
    <Row>
      <Button className="primary-btn mt-4 ml-auto mx-4">Add</Button>
      {bannersLoader
        ? Array.from({ length: 3 }).map((_, index) => (
            <Row key={index} className="w-full">
              <Skeleton active className="!w-full !h-[120px] mx-4 my-4" />
            </Row>
          ))
        : bannerList?.map((value, index) => (
            <Row key={index} className="w-full">
              <Collapse
                defaultActiveKey={[value?._id?.toString()]}
                className="w-full mx-4 my-4"
                items={[
                  {
                    key: "1",
                    label: "Home Banner",
                    label: (
                      <Flex justify="space-between" align="center">
                        <Text>Home Banner</Text>
                        <Flex justify="" align="center" gap={10}>
                          <Link size={16} className="see-all" />
                          <Text className="see-all">{value?.url}</Text>
                        </Flex>
                      </Flex>
                    ),
                    children: (
                      <Flex justify="space-between" align="center">
                        <Image
                          className="!size-[96px]"
                          preview={true}
                          src={avatarUrl}
                        />
                        <Button
                          onClick={() => handleClick(value?._id)}
                          type="dashed"
                          danger
                        >
                          Delete
                        </Button>
                      </Flex>
                    ),
                  },
                ]}
              />
            </Row>
          ))}
    </Row>
  );
};

export default BannerSettings;
