import BriefCase from "../assets/icons/BriefCase";
import Worker from "../assets/icons/Worker";
import DollarSign from "../assets/icons/DollarSign";
import Grid from "../assets/icons/Grid";
import UserGear from "../assets/icons/UserGear";
import CreditCard from "../assets/icons/CreditCard";
import GearFilled from "../assets/icons/GearFilled";

export const sidebar = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    icon: Grid,
  },
  {
    id: 2,
    name: "User Management",
    link: "/dashboard/user-managment",
    icon: UserGear,
  },
  {
    id: 3,
    name: "Payment Details",
    link: "/payment-details",
    icon: CreditCard,
  },
  {
    id: 4,
    name: "Settings",
    link: "/settings",
    icon: GearFilled,
  },
];

export const dashboardStats = [
  {
    data: 300,
    title: "Total Job Posts",
    type: "jobs",
    icon: BriefCase,
    previousData: 250,
    chartData: [10, 15, 22, 19, 25, 28, 32],
  },
  {
    data: 200,
    title: "Total Workers",
    type: "workers",
    icon: Worker,
    previousData: 180,
    chartData: [9, 16, 20, 23, 19, 26, 35],
  },
  {
    data: 5879,
    title: "Total Revenue",
    type: "revenue",
    icon: DollarSign,
    previousData: 6000,
    chartData: [35, 29, 32, 28, 26, 21, 27],
  },
];

export const recentOrders = [
  {
    orderNumber: "#1232321",
    orderStatus: "Processing",
    customer: { firstName: "Customer", lastName: "01" },
    orderDate: new Date(),
    orderFee: 100,
    orderType: "Wash Only Packeges",
  },
  {
    orderNumber: "#1232322",
    orderStatus: "completed",
    customer: { firstName: "Customer", lastName: "02" },
    orderDate: new Date(),
    orderFee: 95,
    orderType: "Dry Clean Packeges",
  },
  {
    orderNumber: "#1232323",
    orderStatus: "completed",
    customer: { firstName: "Customer", lastName: "03" },
    orderDate: new Date(),
    orderFee: 90,
    orderType: "Wash Only Packeges",
  },
  {
    orderNumber: "#1232324",
    orderStatus: "processing",
    customer: { firstName: "Customer", lastName: "04" },
    orderDate: new Date(),
    orderFee: 115,
    orderType: "Dry Clean Packeges",
  },
  {
    orderNumber: "#1232325",
    orderStatus: "processing",
    customer: { firstName: "Customer", lastName: "05" },
    orderDate: new Date(),
    orderFee: 125,
    orderType: "Dry Clean Packeges",
  },
  {
    orderNumber: "#1232326",
    orderStatus: "completed",
    customer: { firstName: "Customer", lastName: "06" },
    orderDate: new Date(),
    orderFee: 100,
    orderType: "Dry Clean Packeges",
  },
  {
    orderNumber: "#1232327",
    orderStatus: "processing",
    customer: { firstName: "Customer", lastName: "07" },
    orderDate: new Date(),
    orderFee: 100,
    orderType: "Wash Only Packeges",
  },
  {
    orderNumber: "#1232328",
    orderStatus: "complete",
    customer: { firstName: "Customer", lastName: "08" },
    orderDate: new Date(),
    orderFee: 100,
    orderType: "Dry Clean Packeges",
  },
];
