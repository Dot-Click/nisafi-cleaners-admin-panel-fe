import moment from "moment";
export const getTimeFromNow = (date) => {
  const currentDate = moment(date);
  return currentDate.fromNow();
};

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};
