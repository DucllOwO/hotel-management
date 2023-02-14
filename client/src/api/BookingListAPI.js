import { userRequest } from "./api";

export const fetchBookingByStatus = (positionUser, status) => {
  return userRequest.get("/bookings/list", {
    params: { user: { position: positionUser }, status: status },
  });
};

export const updateBookingStatus = (positionUser, newStatus, bookingID) => {
  return userRequest.put(`/bookings/list/${bookingID}`, {
    user: { position: positionUser },
    status: newStatus,
  });
};

export const createReceipt = (positionUser, newReceipt, booking, user) => {
  return userRequest.post("/receipts", {
    user: { position: positionUser },
    receipt: newReceipt,
    booking: booking,
    employee: user,
  });
};

export const getInventory = (positionUser, bookingID) => {
  return userRequest.get("/inventory/record", {
    params: { user: { position: positionUser }, booking_id: bookingID },
  });
};

export const getRoomByBookingID = (positionUser, bookingID) => {
  return userRequest.get("/rooms/booking", {
    params: { user: { position: positionUser }, bookingID: bookingID },
  });
};

export const updateRoomStatus = (positionUser, bookingID, newStatus) => {
  return userRequest.put(`/rooms/${bookingID}`, 
    { user: { position: positionUser }, room: newStatus},
  );
};
