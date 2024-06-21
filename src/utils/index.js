import moment from "moment";
export const getTimeFromNow = (date) => {
  const currentDate = moment(date);
  return currentDate.fromNow();
};

export const formatDateString = (dateString) => {
  return moment(dateString).format("MMMM Do YYYY");
};

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export const splittingSkills = (skills) => {
  return skills?.split(",")?.slice(1);
};

export const capitalizeFirstLetter = (str) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};

export const successRateColors = (rate) => {
  let color;
  if (rate <= 40) {
    color = "red";
  } else if (rate > 40 && rate <= 70) {
    color = "yellow";
  } else {
    color = "green";
  }
  return color;
};

export const getStatusColors = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "green";
    case "cancelled":
      return "red";
    case "disputed":
      return "purple";
    case "in-progress":
      return "orange";
    case "open":
      return "blue";

    default:
      break;
  }
};

export const statsColorHandler = (type) => {
  switch (type) {
    case "jobs":
      // return "#0CCB93";
      return "green";
    case "workers":
      // return "#F56060";
      return "red";
    case "revenue":
      // return "#0BA8D8";
      return "blue";

    default:
      break;
  }
};
