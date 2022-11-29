export const formatDate = (date) => {
  const dateObj = new Date(date);

  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
};

export const formatterInt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
