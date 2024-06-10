import moment from "moment";
export const getTimeFromNow = (date) => {
  const currentDate = moment(date);
  return currentDate.fromNow();
};

export const formatDate = (dateString) => {
  return moment(dateString).format("MMMM Do YYYY");
};

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export const splittingSkills = (skills) => {
  return skills
    ?.split(",")
    ?.slice(1)
    ?.map((item) => item?.trim());
};

export const capitalizeFirstLetter = (str) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};
