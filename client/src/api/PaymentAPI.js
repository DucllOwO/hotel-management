import { userRequest } from "./api";

export const getAllPayment = (positionUser) => {
  return userRequest.get("/payment", {
    params: { user: { position: positionUser } },
  });
};

export const getDayPayment = (positionUser, day) => {
  return userRequest.get(`/payment?day=${day}`, {
    params: { user: { position: positionUser }, type: "day" },
  });
};

export const getMonthPayment = (positionUser, firstDay, lastDay) => {
  return userRequest.get(`/payment?firstDay=${firstDay}&&lastDay=${lastDay}`, {
    params: { user: { position: positionUser }, type: "month" },
  });
};

export const getYearPayment = (positionUser, firstDay, lastDay) => {
  return userRequest.get(`/payment?firstDay=${firstDay}&&lastDay=${lastDay}`, {
    params: { user: { position: positionUser }, type: "year" },
  });
};

export const createPayment = (
  positionUser,
  { name, established_date, total_cost }
) => {
  return userRequest.post("/payment", {
    user: { position: positionUser },
    payment: { name, established_date, total_cost },
  });
};
