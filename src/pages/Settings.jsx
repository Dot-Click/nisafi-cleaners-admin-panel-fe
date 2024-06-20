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
import { useAuthStore } from "../stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { UserRound } from "lucide-react";
import { baseURL } from "../configs/axiosConfig";
import { errorMessage } from "../services/helpers";
import CustomAvatar from "../components/common/CustomAvatar";
import BannerSettings from "../components/dashboard/BannerSettings";

const { Title, Text } = Typography;

const Settings = () => {
  const [values, setValues] = useState({
    username: "Zubair Arif",
    email: "zubarif234@gmail.com",
    phone: 12340000,
    password: "",
    country: "United States",
  });

  const [isSelectedProfile, setSelectedProfile] = useState(true);

  const { user, loading } = useAuthStore(useShallow((state) => state));

  return (
    <Flex className="settings" justify="center">
      <Row className="settings-container">
        <Col span={24} className="settings-container-header"></Col>
        <Row span={24} className="settings-form-container !w-full min-h-[65vh]">
          <Col lg={8} md={10} sm={24} xs={24}>
            <Flex className="image-container">
              <UpdateProfileImage
                user={user}
                image={user?.userData?.profilePic}
              />
            </Flex>

            <Flex
              vertical
              className="absolute top-32 w-full transform mx-8"
              gap={12}
            >
              <Button
                onClick={() => setSelectedProfile(true)}
                type={isSelectedProfile ? "primary" : "dashed"}
                className={`${isSelectedProfile ? "primary-btn" : ""} w-[80%]`}
              >
                profile setting
              </Button>
              <Button
                onClick={() => setSelectedProfile(false)}
                type={!isSelectedProfile ? "primary" : "dashed"}
                className={`${!isSelectedProfile ? "primary-btn" : ""} w-[80%]`}
              >
                banner setting
              </Button>
            </Flex>
          </Col>

          <Col
            lg={16}
            md={14}
            sm={24}
            xs={24}
            className="fields-container !h-full"
          >
            {isSelectedProfile ? (
              <>
                <Flex vertical className="name-plate">
                  <Title level={3}>{user?.userData?.name}</Title>
                  <Text>
                    Take full control of your account, update your profile.
                  </Text>
                </Flex>

                <Flex vertical className="editable-fields">
                  {/* // ? update email field */}
                  <UpdateFields
                    fieldTitle={"Email Address"}
                    fieldName={"email"}
                    fieldValue={user?.userData?.email}
                    isEditAllowed={false}
                  />
                  {/* // ? update username field */}
                  <UpdateFields
                    fieldTitle={"Username"}
                    fieldName={"name"}
                    fieldValue={user?.userData?.name}
                  />
                  {/* // ? update phone field */}
                  <UpdateFields
                    fieldTitle={"Phone"}
                    fieldName={"phone"}
                    fieldValue={user?.userData?.phone || "N/A"}
                  />

                  {/* // ? update password component */}
                  <PasswordField />

                  {/* // ? update country component */}
                </Flex>
              </>
            ) : (
              <BannerSettings />
            )}
          </Col>
        </Row>
      </Row>
    </Flex>
  );
};

const UpdateFields = ({
  fieldTitle,
  fieldName,
  fieldValue,
  isEditAllowed = true,
}) => {
  const [isEditable, setEditable] = useState(false);
  const [newVal, setNewVal] = useState(fieldValue);
  const { updateProfile, loading } = useAuthStore(useShallow((state) => state));

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
            defaultValue={newVal}
            name={fieldName}
            onChange={(e) => setNewVal(e.target.value)}
          />
        ) : (
          <Text className="field-value">{fieldValue}</Text>
        )}
      </Col>
      {isEditAllowed && (
        <Col xs={24} lg={8} className="btns">
          {isEditable ? (
            <>
              <Button className="grey-btn" onClick={() => setEditable(false)}>
                Cancel
              </Button>
              <Button
                className="save-btn"
                onClick={async () => {
                  const res = await updateProfile({ [fieldName]: newVal });
                  if (res) {
                    setEditable(false);
                  }
                }}
                loading={loading}
              >
                Save
              </Button>
            </>
          ) : (
            <Button className="grey-btn" onClick={() => setEditable(true)}>
              Edit
            </Button>
          )}
        </Col>
      )}
    </Row>
  );
};

const PasswordField = () => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { updateProfile, loading } = useAuthStore(useShallow((state) => state));

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
        okButtonProps={{ className: "save-btn", loading: loading }}
        cancelButtonProps={{ className: "grey-btn" }}
        onOk={async () => {
          if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword ||
            newPassword === "" ||
            confirmPassword === "" ||
            currentPassword === ""
          ) {
            return errorMessage("Please fill all fields");
          }
          if (newPassword !== confirmPassword) {
            return errorMessage("Password and Confirm Password does not match");
          }
          // call api to update password
          const res = await updateProfile({
            password: newPassword.toString(),
            oldPassword: currentPassword.toString(),
          });
          if (res) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setModalOpen(false);
          }
        }}
        onCancel={() => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setModalOpen(false);
        }}
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

const UpdateProfileImage = (props) => {
  const [imageSrc, setImageSrc] = useState(props.image);
  const { updateProfile } = useAuthStore(useShallow((state) => state));

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "user-avatar.png",
      status: "done",
      url:
        "https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs",
    },
  ]);

  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log("newFileList", newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      let imageUrl;
      const reader = new FileReader();
      reader.readAsDataURL(newFileList[0].originFileObj);
      reader.onload = () => {
        imageUrl = reader.result;
        setImageSrc(imageUrl);
      };
      const formData = new FormData();
      formData.append("image", newFileList[0].originFileObj);
      const res = await updateProfile(formData);
      console.log("res", res);

      // setImageSrc(base64);
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
      {console.log("imageSrc", imageSrc)}
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

      <CustomAvatar
        imgUrl={
          imageSrc?.includes("uploads") ? `${baseURL}${imageSrc}` : imageSrc
        }
        name={props.user?.userData?.name}
        className={"display-picture"}
      />
      <Text className="camera-icon" justify="flex-end">
        <Camera />
      </Text>
    </label>
  );
};

export default Settings;
