import { userRequest } from "./api";

export const getAllReceipt = (positionUser) => {
  return userRequest.get(`/receipts/`, {
    params: { user: { position: positionUser } },
  });
};
export const payReceipt = (positionUser, receiptID) => {
  return userRequest.put(`/receipts/${receiptID}`, {
    params: { user: { position: positionUser } },
  });
};
export const getDayReceipt = (positionUser, day) => {
  return userRequest.get(`/receipts/day?day=${day}`, {
    params: { user: { position: positionUser } },
  });
};
export const getMonthReceipt = (positionUser, firstDay, lastDay) => {
  console.log(firstDay, lastDay);
  return userRequest.get(
    `/receipts/month?firstDay=${firstDay}&&lastDay=${lastDay}`,
    {
      params: { user: { position: positionUser } },
    }
  );
};
export const getYearReceipt = (positionUser, firstDay, lastDay) => {
  return userRequest.get(
    `/receipts/year?firstDay=${firstDay}&&lastDay=${lastDay}`,
    {
      params: { user: { position: positionUser } },
    }
  );
};
