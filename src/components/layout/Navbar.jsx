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
          <CustomAvatar size={48} imgUrl={user?.userData?.profilePic} />
          {console.log("user.user.profilePic", user.userData.profilePic)}
          <Tooltip title={user?.userData?.name} className="" placement="bottom">
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
            <Link to={"/dashboard/settings"} className="cursor-pointer">
              <Gear />
            </Link>
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
  const messages = [
    // {
    //   title: "New Job Added",
    //   message: "Ali Rehman has posted new job",
    //   read: true,
    //   createdAt: "2024-06-22T12:09:24.338+00:00",
    //   link: "6676bef41d4d3c3d94955d7d",
    //   type: "job",
    // },
    // {
    //   title: "Payment requested",
    //   message: "Ali Rehman has requested for payment",
    //   read: false,
    //   createdAt: "2024-06-22T12:09:24.338+00:00",
    //   link: "6676bef41d4d3c3d94955d7d",
    //   type: "job",
    // },
    // {
    //   title: "Payment requested",
    //   message: "Ali Rehman has requested for payment",
    //   read: true,
    //   createdAt: "2024-06-22T12:09:24.338+00:00",
    //   link: "6676bef41d4d3c3d94955d7d",
    //   type: "job",
    // },
  ];
  return (
    <Flex
      vertical
      className="request-notifications notification-tabs  max-h-[300px] overflow-y-auto px-1"
      gap={10}
    >
      {notifications?.length > 0 ? (
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
            className={`cursor-pointer hover:bg-[#f0f0f0] rounded-md w-96 p-2  request-notification border-b-2 ${
              item?.read ? "bg-[#fafafa]" : "bg-[#ebe9e9]"
            }`}
            gap={8}
            key={index}
            align="flex-start"
          >
            {/* Avatar here 👇 */}
            <Flex vertical gap={10} className="notification-content ">
              <Flex vertical>
                <Flex className="username-and-timestamp" gap={6}>
                  {!item?.read && <Badge size={"small"} status="success" />}
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
        ))
      ) : (
        <Text className="text-gray-shade-1 font-semibold text-[16px] py-2 text-center">
          Notifications not found
        </Text>
      )}
    </Flex>
  );
};

export default Navbar;
