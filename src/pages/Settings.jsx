import {
  Avatar,
  Button,
  Col,
  Flex,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import Camera from "../assets/icons/Camera";
import countries from "../data/countries.json";
import ImgCrop from "antd-img-crop";

const { Title, Text } = Typography;

const Settings = () => {
  const [values, setValues] = useState({
    username: "Zubair Arif",
    email: "zubarif234@gmail.com",
    phone: 12340000,
    password: "",
    country: "United States",
  });

  const handleChange = (e) => {
    try {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex className="settings" justify="center">
      <Row className="settings-container">
        <Col span={24} className="settings-container-header"></Col>
        <Col span={24} className="settings-form-container">
          <Col lg={8} md={10} xs={24} className="image-container">
            <UpdateProfileImage />
          </Col>
          <Col lg={16} md={14} xs={24} className="fields-container">
            <Flex vertical className="name-plate">
              <Title level={3}>Zubair Arif</Title>
              <Text>
                Take full control of your account, update your profile.
              </Text>
            </Flex>

            <Flex vertical className="editable-fields">
              {/* // ? update username field */}
              <UpdateFields
                fieldTitle={"Username"}
                fieldName={"username"}
                fieldValue={values.username}
                handleChange={handleChange}
              />

              {/* // ? update email field */}
              <UpdateFields
                fieldTitle={"Email Address"}
                fieldName={"email"}
                fieldValue={values.email}
                handleChange={handleChange}
              />

              {/* // ? update phone field */}
              <UpdateFields
                fieldTitle={"Phone"}
                fieldName={"phone"}
                fieldValue={values.phone}
                handleChange={handleChange}
              />

              {/* // ? update password component */}
              <PasswordField />

              {/* // ? update country component */}
              <CountryField
                fieldValue={values.country}
                handleChange={handleChange}
              />
            </Flex>
          </Col>
        </Col>
      </Row>
    </Flex>
  );
};

const UpdateFields = ({ fieldTitle, fieldName, fieldValue, handleChange }) => {
  const [isEditable, setEditable] = useState(false);

  return (
    <Row className="field-row">
      <Col xs={24} lg={16} className="field">
        <Text className="field-name">{fieldTitle}</Text>
        {isEditable ? (
          <Input
            type={
              fieldName === "email"
                ? "email"
                : fieldName === "phone"
                ? "number"
                : "text"
            }
            value={fieldValue}
            name={fieldName}
            onChange={(e) => handleChange(e)}
          />
        ) : (
          <Text className="field-value">{fieldValue}</Text>
        )}
      </Col>
      <Col xs={24} lg={8} className="btns">
        {isEditable ? (
          <>
            <Button className="grey-btn" onClick={() => setEditable(false)}>
              Cancel
            </Button>
            <Button className="save-btn" onClick={() => setEditable(false)}>
              Save
            </Button>
          </>
        ) : (
          <Button className="grey-btn" onClick={() => setEditable(true)}>
            Edit
          </Button>
        )}
      </Col>
    </Row>
  );
};

const PasswordField = () => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      name === "new_password"
        ? setNewPassword(value)
        : name === "current_password"
        ? setCurrentPassword(value)
        : setConfirmPassword(value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row className="field-row">
      <Col xs={24} lg={16} className="field">
        <Text className="field-name">Password</Text>
        <Text className="field-value">
          <svg
            width="134"
            height="8"
            viewBox="0 0 134 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" fill="#737373" />
            <circle cx="18" cy="4" r="4" fill="#737373" />
            <circle cx="32" cy="4" r="4" fill="#737373" />
            <circle cx="46" cy="4" r="4" fill="#737373" />
            <circle cx="60" cy="4" r="4" fill="#737373" />
            <circle cx="74" cy="4" r="4" fill="#737373" />
            <circle cx="88" cy="4" r="4" fill="#737373" />
            <circle cx="102" cy="4" r="4" fill="#737373" />
            <circle cx="116" cy="4" r="4" fill="#737373" />
            <circle cx="130" cy="4" r="4" fill="#737373" />
          </svg>
        </Text>
      </Col>
      <Col xs={24} lg={8} className="btns">
        <Button className="grey-btn" onClick={() => setModalOpen(true)}>
          Edit
        </Button>
      </Col>

      <Modal
        open={isModalOpened}
        okText={"Update"}
        okButtonProps={{ className: "save-btn" }}
        cancelButtonProps={{ className: "grey-btn" }}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
        className="change-password-modal"
        centered
      >
        <Row className="field-row">
          <Col md={24} className="field">
            <Text className="field-name">Current Password</Text>
            <Input.Password
              placeholder="Enter Your Current Password"
              value={currentPassword}
              name={"current_password"}
              onChange={(e) => handleChange(e)}
            />
          </Col>

          <Col md={24} className="field">
            <Text className="field-name">New Password</Text>
            <Input.Password
              placeholder="Enter Your New Password"
              value={newPassword}
              name={"new_password"}
              onChange={(e) => handleChange(e)}
            />
          </Col>

          <Col md={24} className="field">
            <Text className="field-name">Confirm Password</Text>
            <Input.Password
              placeholder="Confirm Your New Password"
              value={confirmPassword}
              name={"confirm_password"}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
      </Modal>
    </Row>
  );
};

const CountryField = ({ fieldValue, handleChange }) => {
  const [isEditable, setEditable] = useState(false);

  const countriesList = countries?.map((country) => ({
    image: country?.flag,
    label: country?.name,
    value: country?.name,
  }));

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Row className="field-row country-field">
      <Col lg={16} xs={24} className="field">
        <Text className="field-name">Country</Text>
        {isEditable ? (
          <Select
            showSearch
            placeholder="Select Country"
            defaultValue={fieldValue}
            optionFilterProp="children"
            filterOption={filterOption}
            options={countriesList}
            onChange={handleChange}
          />
        ) : (
          <Text className="field-value">{fieldValue}</Text>
        )}
      </Col>
      <Col lg={8} xs={24} className="btns">
        {isEditable ? (
          <>
            <Button className="grey-btn" onClick={() => setEditable(false)}>
              Cancel
            </Button>
            <Button className="save-btn" onClick={() => setEditable(false)}>
              Save
            </Button>
          </>
        ) : (
          <Button className="grey-btn" onClick={() => setEditable(true)}>
            Edit
          </Button>
        )}
      </Col>
    </Row>
  );
};

const UpdateProfileImage = () => {
  const [imageSrc, setImageSrc] = useState(
    "https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs"
  );

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "user-avatar.png",
      status: "done",
      url: "https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs",
    },
  ]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const base64 = await getBase64(newFileList[0]?.originFileObj);
      setImageSrc(base64);
    } else {
      setImageSrc("");
    }
  };

  let uploadRef = null;

  const handleTriggerUpload = () => {
    if (uploadRef) {
      uploadRef.click();
    }
  };

  return (
    <label className="display-picture-container" onClick={handleTriggerUpload}>
      <ImgCrop rotationSlider>
        <Upload
          ref={(node) => {
            uploadRef = node ? node.input : null;
          }}
          accept="image/*"
          listType="picture-circle"
          multiple={false}
          fileList={fileList}
          maxCount={1}
          onChange={onChange}
          showUploadList={false}
        ></Upload>
      </ImgCrop>

      <Avatar src={imageSrc} className="display-picture" />
      <Text className="camera-icon" justify="flex-end">
        <Camera />
      </Text>
    </label>
  );
};

export default Settings;
