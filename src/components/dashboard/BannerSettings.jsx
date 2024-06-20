import React, { useEffect, useState } from "react";
import {
  Image,
  Row,
  Col,
  Flex,
  Collapse,
  Button,
  Typography,
  Skeleton,
  Form,
  Input,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useShallow } from "zustand/react/shallow";
import { useBannerStore } from "../../stores/bannerStore";
import { Link } from "lucide-react";
import { baseURL } from "../../configs/axiosConfig";
import { showConfirm } from "../../utils/modal";
import GeneralModal from "../Modals/GeneralModal";
import { errorMessage } from "../../services/helpers";
import { fallImg } from "../../data/data";
const { Title, Text } = Typography;

const BannerSettings = () => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [file, setfile] = useState(null);
  const [showFile, setshowFile] = useState([]);

  const {
    // func
    fetchBanners,
    deleteBanner,
    uploadBanner,
    // data
    bannerList,
    // loader
    bannersLoader,
    delbannerLoader,
    uploadbannerLoader,
  } = useBannerStore(useShallow((state) => state));
  useEffect(() => {
    fetchBanners();
  }, []);

  const deleteHandler = async (id) => {
    const res = await deleteBanner(id);
    if (res) {
      fetchBanners();
    }
  };

  const handleClick = (id) => {
    showConfirm(
      "Delete",
      "Are you sure you want to delete?",
      () => deleteHandler(id),
      delbannerLoader
    );
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleChange = (file) => {
    setshowFile(file);
    setfile(file.fileList[0] || null);
  };

  useEffect(() => {
    console.log("file after setting:", file);
  }, [file]);

  const onFinish = async (values) => {
    if (!file) {
      errorMessage("Please upload a banner image");
      return;
    }

    console.log("fileleleeee", file);
    const formdata = new FormData();
    formdata.append("url", `https://${values.url}`);
    formdata.append("image", file.originFileObj);

    const res = await uploadBanner(formdata);
    if (res) {
      form.resetFields();
      setModalOpen(false);
      fetchBanners();
      setfile(null);
    }
  };

  const onFinishFailed = (errorInfo) => {
    return false;
  };

  return (
    <>
      <Row className="min-h-0">
        <Button
          onClick={() => setModalOpen(true)}
          className="primary-btn mt-4 ml-auto mx-4"
        >
          Add
        </Button>
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
                            src={baseURL + value?.image}
                            fallback={fallImg}
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

      <GeneralModal
        open={isModalOpened}
        handleCancel={handleCancel}
        component={
          <Col className="w-full">
            <Title level={3}>Add Banner</Title>

            <Form
              form={form}
              layout="vertical"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 24,
              }}
              style={{
                maxWidth: "500px",
                width: "100%",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Col className="flex-1 !m-0">
                <Text className="login-lable font-semibold">Url</Text>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter url!",
                    },
                  ]}
                  name="url"
                  className="flex-1"
                >
                  <Input
                    name="url"
                    addonBefore="http://"
                    className="login-input1 py-2 flex-1 w-full"
                  />
                </Form.Item>
              </Col>

              <Col className="mt-2">
                <Upload
                  action={""}
                  listType="picture"
                  className="upload-list-inline hide-tooltip"
                  multiple={false}
                  onChange={handleChange}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Col>

              <Form.Item>
                <Button
                  loading={uploadbannerLoader}
                  htmlType="submit"
                  className="primary-btn mt-4 ml-auto mx-4"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        }
      />
    </>
  );
};

export default BannerSettings;
