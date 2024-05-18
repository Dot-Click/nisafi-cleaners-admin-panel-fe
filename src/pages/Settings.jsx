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
} from "antd";
import React, { useState } from "react";
import Camera from "../assets/icons/Camera";

const { Title, Text } = Typography;

const Settings = () => {
  const [values, setValues] = useState({
    username: "Zubair Arif",
    email: "zubarif234@gmail.com",
    phone: 12340000,
    password: "",
    country: "USA",
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
            Eidit
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
          Eidit
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

  return (
    <Row className="field-row">
      <Col lg={16} xs={24} className="field">
        <Text className="field-name">Country</Text>
        {isEditable ? (
          <Select
            defaultValue={fieldValue}
            options={[]}
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
            Eidit
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

  const handleImagePreviewer = (e) => {
    var reader = new FileReader();

    reader.onload = function () {
      setImageSrc(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);

    setImageSrc(e.target.files[0]);
  };

  return (
    // ? wrapping the avatar in a label tag was the only option to trigger the file type input... useRef and other stuff wasn't working
    <label className="display-picture-container">
      <Avatar src={imageSrc} className="display-picture" />
      <Input
        type="file"
        onChange={handleImagePreviewer}
        id="profileImage"
        name="profileImage"
        className="d-none"
        accept="image/*"
      />
      <Text className="camera-icon" justify="flex-end">
        <Camera />
      </Text>
    </label>
  );
};

export default Settings;
