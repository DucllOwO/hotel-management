import { userRequest } from "./api";

export const getAllReceipt = (positionUser) => {
  return userRequest.get(`/receipts/`, {
    params: { user: { position: positionUser } },
  });
};
export const updateReceipt = (positionUser, receiptID, newReceipt) => {
  return userRequest.put(`/receipts/${receiptID}`, {
    params: { user: { position: positionUser }, newReceipt: newReceipt },
  });
};
export const getReceiptByBookingID = (positionUser, bookingID) => {
  return userRequest.get(`/receipts/booking/${bookingID}`, {
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
