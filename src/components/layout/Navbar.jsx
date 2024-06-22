import { useEffect, useState } from "react";
import {
  Avatar,
  Flex,
  Tooltip,
  Typography,
  Popover,
  Tabs,
  Badge,
  Button,
} from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Gear from "../../assets/icons/Gear";
import Bell from "../../assets/icons/Bell";
import { useAuthStore } from "../../stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { baseURL } from "../../configs/axiosConfig";
import CustomAvatar from "../common/CustomAvatar";
import { useDashboardStore } from "../../stores/dashboardStore";
import { checkRole, getTimeFromNow, notifcationUrlHandler } from "../../utils";

const { Text } = Typography;

const Navbar = ({ isOpened, setOpened }) => {
  const [pageName, setPageName] = useState("dashboard");
  const { pathname } = useLocation();
  const params = useParams();

  const { user } = useAuthStore(useShallow((state) => state));

  const pagesName = [
    {
      path: "/dashboard",
      label: "dashboard",
    },
    {
      path: "/dashboard/user/management",
      label: "user management",
    },
    {
      path: `/dashboard/user/worker-info/${params.id}`,
      label: "worker info",
    },
    {
      path: "/dashboard/payment-details",
      label: "payment details",
    },
    {
      path: "/dashboard/settings",
      label: "settings",
    },
    {
      path: "/dashboard/jobs/management",
      label: "jobs management",
    },
    {
      path: `/dashboard/jobs/details/${params.id}`,
      label: "jobs details",
    },
  ];

  const { unReadCount } = useDashboardStore(useShallow((state) => state));
  console.log(unReadCount, "from nav");
  useEffect(() => {
    const pageTitle = pagesName.find((val) => val.path === pathname);
    if (pageTitle && pageTitle.label) {
      setPageName(pageTitle.label);
    }
  }, [pathname]);

  return (
    <Flex justify="space-between" align="center" className="w-100 navbar">
      <Flex
        align="center"
        justify="start"
        gap={16}
        style={{
          padding: "16px",
        }}
      >
        <RxHamburgerMenu
          onClick={() => setOpened(!isOpened)}
          className="menu-icon"
        />
        <Text className="page-name capitalize">{pageName}</Text>
      </Flex>

      {/* // ? navbar right side  */}
      <Flex
        justify="space-between"
        align="center"
        gap={10}
        className="profile-box py-4 px-0"
      >
        {/* // ? avatar and username */}
        <Flex align="center">
          <CustomAvatar
            size={48}
            imgUrl={baseURL + user?.userData?.profilePic}
            name={user?.userData?.name}
          />

          <Tooltip title={user?.userData?.name} className="username-tooltip">
            <Text className="user-name px-2">{user?.userData?.name}</Text>
          </Tooltip>
        </Flex>
        <Flex className="px-4">
          {/* // ? notifications and settings */}
          <Flex gap={16} className="notifications-and-settings">
            <Popover
              content={NotificationsPopover}
              trigger="click"
              placement="bottom"
            >
              <Flex className="cursor-pointer">
                <Badge count={unReadCount} overflowCount={10} offset={[0, -8]}>
                  <Bell />
                </Badge>
              </Flex>
            </Popover>
            <Gear />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const NotificationsPopover = () => {
  const navigate = useNavigate();
  const {
    //  func
    fetchNotifications,
    fetchUnreadCount,
    // data
    notifications,
    unReadCount,

    // loader
    notificationLoader,
  } = useDashboardStore(useShallow((state) => state));

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <Flex
      vertical
      className="request-notifications notification-tabs  max-h-[300px] overflow-y-auto px-1"
      gap={10}
    >
      {!notificationLoader &&
        notifications?.map((item, index) => (
          <Flex
            onClick={() => {
              const url = notifcationUrlHandler(item?.type, item?.link);
              const state =
                item?.type === "register"
                  ? { role: checkRole(item?.message), link: item?.link }
                  : null;
              navigate(url, { state });
            }}
            className={`cursor-pointer hover:bg-[#f0f0f0] w-96 p-2 bg-[#fafafa] request-notification${
              index === 2 ? " unread" : ""
            }`}
            gap={8}
            key={index}
            align="flex-start"
          >
            {/* <Avatar
            size={56}
            src="https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs"
          /> */}

            <Flex vertical gap={10} className="notification-content ">
              <Flex vertical>
                <Flex className="username-and-timestamp" gap={6}>
                  <Text className="username font-bold text-[14px]">
                    {item?.title}
                  </Text>
                  <Text className="notification-timestamp opacity-50 font-semibold">
                    {getTimeFromNow(item?.createdAt)}
                  </Text>
                </Flex>
                <Text className="notification-description">
                  {item?.message}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};

export default Navbar;
