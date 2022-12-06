export const formatDate = (date) => {
  const dateObj = new Date(date);

  return `${dateObj.getDate()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getFullYear()}`;
};

export const formatterInt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const toTitleCase = (str) => {
  return str.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};
