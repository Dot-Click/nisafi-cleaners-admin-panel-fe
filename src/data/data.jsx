import BriefCase from "../assets/icons/BriefCase";
import Worker from "../assets/icons/Worker";
import DollarSign from "../assets/icons/DollarSign";
import Grid from "../assets/icons/Grid";
import UserGear from "../assets/icons/UserGear";
import CreditCard from "../assets/icons/CreditCard";
import GearFilled from "../assets/icons/GearFilled";
// import { BriefcaseBusiness } from "lucide-react";
import { FaBriefcase } from "react-icons/fa";

export const sidebar = [
  {
    id: 1,
    name: "Dashboard",
    key: "dashboard",
    route: ["/dashboard"],
    icon: Grid,
  },
  {
    id: 2,
    name: "User Management",
    key: "user",
    route: ["/dashboard/user/management", "/dashboard/user/worker-info"],
    icon: UserGear,
  },
  {
    id: 3,
    name: "Jobs Management",
    route: ["/dashboard/jobs/management", "/dashboard/jobs/details"],
    icon: FaBriefcase,
  },

  {
    id: 4,
    name: "Payment Details",
    route: ["/dashboard/payment-details"],
    icon: CreditCard,
  },
  {
    id: 5,
    name: "Settings",
    route: ["/dashboard/settings"],
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

export const userData = [
  {
    key: "1",
    name: "Bruce Wayne",
    email: "iambatman@wayneindustry.com",
    register: "21st May 2000",
    phone: "090078603",
    profession: "worker",
    role: "worker",
    certificate: "worker",
    idNumber: "121293203-12812",
    address: "7330 Scheme 33, Gulshan-e-Iqbal",
    image:
      "https://cdn.vox-cdn.com/thumbor/u89Vw8FBkT534OG_QkYMewjYoL8=/0x0:3028x1350/1200x800/filters:focal(1164x235:1648x719)/cdn.vox-cdn.com/uploads/chorus_image/image/70579733/rev_1_TBM_TRL_001_High_Res_JPEG.0.jpeg",
    documents: [
      {
        documentTitle: "ID document (Front)",
        filename: "id-card-front-side.pdf",
        url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
        size: "1 MB",
      },
      {
        documentTitle: "ID document (Back)",
        name: "id-card-back-side.pdf",
        url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
        size: "1.8 MB",
      },
    ],
  },
  {
    key: "2",
    name: "Zubair Arif",
    email: "zubarif@gmail.com",
    register: "3rd Jan 2005",
    phone: "090078601",
    profession: "customer",
    role: "customer",
    certificate: "none",
    idNumber: "121293203-12810",
    address: "6681 Korangi Chay number",
    image:
      "https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs",
    documents: [
      {
        documentTitle: "ID document (Front)",
        filename: "id-card-front-side.pdf",
        url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
        size: "2 MB",
      },
      {
        documentTitle: "ID document (Back)",
        name: "id-card-back-side.pdf",
        url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
        size: "1.5 MB",
      },
    ],
  },
  {
    key: "3",
    name: "John Jons",
    email: "martinmanhunter@gmail.com",
    register: "23rd Mar 1566",
    phone: "090078602",
    profession: "worker",
    role: "worker",
    certificate: "worker",
    idNumber: "121293203-12811",
    address: "6681 Korangi Aath number",
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/34/Martian_Manhunter_Alex_Ross.png",
    documents: [
      {
        documentTitle: "ID document (Front)",
        filename: "id-card-front-side.pdf",
        url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
        size: "1 MB",
      },
      {
        documentTitle: "ID document (Back)",
        name: "id-card-back-side.pdf",
        url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
        size: "1.8 MB",
      },
    ],
  },
  {
    key: "4",
    name: "Clark Kent",
    email: "clarkkent@dailyplanet.com",
    register: "29 Feb 2002",
    phone: "090078604",
    profession: "customer",
    role: "customer",
    certificate: "none",
    idNumber: "121293203-12813",
    address: "6912 Lalo Keth Das number",
    image:
      "https://i0.wp.com/www.heyuguys.com/images/2014/08/Clark-Kent.jpg?fit=962%2C536&ssl=1",
    documents: [
      {
        documentTitle: "ID document (Front)",
        filename: "id-card-front-side.pdf",
        url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
        size: "2 MB",
      },
      {
        documentTitle: "ID document (Back)",
        name: "id-card-back-side.pdf",
        url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
        size: "1.5 MB",
      },
    ],
  },
];
export const workerData = [
  {
    key: "1",
    name: "Md Umer",
    email: "iambatman@wayneindustry.com",
    register: "21st May 2000",
    phone: "090078603",
    profession: "worker",
    role: "worker",
    certificate: "worker",
    idNumber: "121293203-12812",
    address: "7330 Scheme 33, Gulshan-e-Iqbal",
    image:
      "https://cdn.vox-cdn.com/thumbor/u89Vw8FBkT534OG_QkYMewjYoL8=/0x0:3028x1350/1200x800/filters:focal(1164x235:1648x719)/cdn.vox-cdn.com/uploads/chorus_image/image/70579733/rev_1_TBM_TRL_001_High_Res_JPEG.0.jpeg",
    documents: [
      {
        documentTitle: "ID document (Front)",
        filename: "id-card-front-side.pdf",
        url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
        size: "1 MB",
      },
      {
        documentTitle: "ID document (Back)",
        name: "id-card-back-side.pdf",
        url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
        size: "1.8 MB",
      },
    ],
  },
  {
    key: "2",
    name: "Zubair Arif",
    email: "zubarif@gmail.com",
    register: "3rd Jan 2005",
    phone: "090078601",
    profession: "customer",
    role: "customer",
    certificate: "none",
    idNumber: "121293203-12810",
    address: "6681 Korangi Chay number",
    image:
      "https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs",
    documents: [
      {
        documentTitle: "ID document (Front)",
        filename: "id-card-front-side.pdf",
        url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
        size: "2 MB",
      },
      {
        documentTitle: "ID document (Back)",
        name: "id-card-back-side.pdf",
        url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
        size: "1.5 MB",
      },
    ],
  },
  {
    key: "3",
    name: "John Jons",
    email: "martinmanhunter@gmail.com",
    register: "23rd Mar 1566",
    phone: "090078602",
    profession: "worker",
    role: "worker",
    certificate: "worker",
    idNumber: "121293203-12811",
    address: "6681 Korangi Aath number",
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/34/Martian_Manhunter_Alex_Ross.png",
    documents: [
      {
        documentTitle: "ID document (Front)",
        filename: "id-card-front-side.pdf",
        url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
        size: "1 MB",
      },
      {
        documentTitle: "ID document (Back)",
        name: "id-card-back-side.pdf",
        url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
        size: "1.8 MB",
      },
    ],
  },
  {
    key: "4",
    name: "Clark Kent",
    email: "clarkkent@dailyplanet.com",
    register: "29 Feb 2002",
    phone: "090078604",
    profession: "customer",
    role: "customer",
    certificate: "none",
    idNumber: "121293203-12813",
    address: "6912 Lalo Keth Das number",
    image:
      "https://i0.wp.com/www.heyuguys.com/images/2014/08/Clark-Kent.jpg?fit=962%2C536&ssl=1",
    documents: [
      {
        documentTitle: "ID document (Front)",
        filename: "id-card-front-side.pdf",
        url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
        size: "2 MB",
      },
      {
        documentTitle: "ID document (Back)",
        name: "id-card-back-side.pdf",
        url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
        size: "1.5 MB",
      },
    ],
  },
];

export const workerInfo = {
  profilePic:
    "https://media.licdn.com/dms/image/D4D03AQFPflFXxVxifQ/profile-displayphoto-shrink_400_400/0/1690117687492?e=2147483647&v=beta&t=VUNjbhuZImdvC-PCz_fpwh-Q3c0hZfHR0O_L9rLvVvs",
  username: "Jhonson Willy",
  email: "example@gmail.com",
  aboutMe:
    "Meet our diligent laundry experts! With years of experience, they ensure your garments receive the utmost care. From delicate fabrics to tough stains, they handle it all with precision and expertise. Our team is dedicated to providing prompt service and impeccable results, leaving your clothes fresh and rejuvenated every time. Trust our laundry professionals to exceed your expectations and deliver a pristine wardrobe, tailored to perfection. Experience the difference with our meticulous attention to detail and commitment to excellence.",
  qualification: "Graduated",
  experience: "2+ years of experience",
  skills: [
    "Dry cleaning techniques",
    "Stain removal",
    "Garment care",
    "Garment care",
    "Garment care",
    "Garment care",
  ],
  certificate: "Certified Dry Cleaner",
  profession: "Dry Cleaner",
  address: "123 Main Street, Cityville, State",
  joinAt: "January 1, 2023",
  phone: "+92 31213312122",
  rating: 4,
  documents: [
    {
      documentTitle: "ID document (Front)",
      filename: "id-card-front-side.pdf",
      url: "https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf",
      size: "1 MB",
    },
    {
      documentTitle: "ID document (Back)",
      filename: "id-card-back-side.pdf",
      url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
      size: "1.8 MB",
    },
    {
      documentTitle: "ID document (Back)",
      filename: "id-card-back-side.pdf",
      url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
      size: "1.8 MB",
    },
    {
      documentTitle: "ID document (Back)",
      filename: "id-card-back-side.pdf",
      url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
      size: "1.8 MB",
    },
    {
      documentTitle: "ID document (Back)",
      filename: "id-card-back-side.pdf",
      url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
      size: "1.8 MB",
    },
    {
      documentTitle: "ID document (Back)",
      filename: "id-card-back-side.pdf",
      url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
      size: "1.8 MB",
    },
    {
      documentTitle: "ID document (Back)",
      filename: "id-card-back-side.pdf",
      url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
      size: "1.8 MB",
    },
    {
      documentTitle: "ID document (Back)",
      filename: "id-card-back-side.pdf",
      url: "https://www.ibiblio.org/ebooks/Conrad/Heart_Darkness.pdf",
      size: "1.8 MB",
    },
  ],
};

export const jobsData = [
  {
    proposals: 5,
    budget: 5000,
    type: "Regular Laundry",
    date: "2024-06-10",
    location: "New York",
    clientDetail: {
      name: "Md Umer",
      profilePic: "https://github.com/shadcn.png",
    },
  },
];

export const fallImg =
  "data:image/png;base64,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";
