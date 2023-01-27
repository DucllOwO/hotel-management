import { userRequest } from "./api";

export const fetchBookingByStatus = (positionUser, status) => {
  return userRequest.get("/inventory", {
    params: { user: { position: positionUser }, status: status },
  });
};

export const fetchInventoryDetailByBookingID = (positionUser, bookingID) => {
  return userRequest.get(`/inventory/record?booking_id=${bookingID}`, {
    params: { user: { position: positionUser } },
  });
};
export const fetchInventoryDetailByBookingID_RoomID = (
  positionUser,
  bookingID,
  roomID
) => {
  return userRequest.get(
    `/inventory/record?booking_id=${bookingID}&&room_id=${roomID}`,
    {
      params: { user: { position: positionUser } },
    }
  );
};
export const createInventoryRecord = (positionUser, newRecord) => {
  return userRequest.post("/inventory/record", {
    user: { position: positionUser },
    record: newRecord,
  });
};
export const createInventoryDetail = (positionUser, newDetail) => {
  return userRequest.post("/inventory/detail", {
    user: { position: positionUser },
    detail: newDetail,
  });
};
