import { Avatar, Button, Col, Flex, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import Camera from "../assets/icons/Camera";

const { Title, Text } = Typography;

const Settings = () => {
  const [values, setValues] = useState({
    username: "Zubair Arif",
    email: "zubarif234@gmail.com",
    phone: "+1234 0000",
    password: "",
    country: "US",
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
              <UpdateFields
                fieldTitle={"Username"}
                fieldName={"username"}
                fieldValue={values.username}
                handleChange={handleChange}
              />
              <UpdateFields
                fieldTitle={"Email Address"}
                fieldName={"email"}
                fieldValue={values.email}
                handleChange={handleChange}
              />
              <UpdateFields
                fieldTitle={"Phone"}
                fieldName={"phone"}
                fieldValue={values.phone}
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
      <Col md={16} className="field">
        <Text className="field-name">{fieldTitle}</Text>
        {isEditable ? (
          <Input
            value={fieldValue}
            name={fieldName}
            onChange={(e) => handleChange(e)}
          />
        ) : (
          <Text className="field-value">{fieldValue}</Text>
        )}
      </Col>
      <Col md={8} className="btns">
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
