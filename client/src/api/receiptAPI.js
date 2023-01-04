import { userRequest } from "./api";

export const getDayReceipt = (positionUser, day) => {
  return userRequest.get(`/receipts/day?day=${day}`, {
    params: { user: { position: positionUser } },
  });
};
export const getMonthReceipt = (positionUser, firstDay, lastDay) => {
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
