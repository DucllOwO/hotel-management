import { userRequest } from "./api";

export const fetchBookingByStatus = (positionUser, status) => {
    return userRequest.get("/bookings/list", {
      params: { user: { position: positionUser }, status: status },
    });
};

export const updateBookingStatus = (positionUser, newStatus, bookingID) => {
  return userRequest.put(`/bookings/list/${bookingID}`, {
     user: { position: positionUser }, status: newStatus 
  });
};
export const updateUsedRoomTotalCost = (positionUser, usedRoomID, totalCost) => {
  return userRequest.put(`/booking/used_room/${usedRoomID}`, {
    user: { position: positionUser }, totalCost: totalCost 
  })
}
export const updateRoomStatus = (positionUser, newStatus, roomID) => {
  return userRequest.put(`/rooms/status/${roomID}`, {
    user: { position: positionUser }, newStatus: newStatus 
  })
}
export const createReceipt = (positionUser, newReceipt, booking, user) => {
  return userRequest.post("/receipt",
  { user: {position: positionUser}, receipt: newReceipt, booking: booking, employee: user, }
 );
};

export const getInventory = (positionUser, bookingID) => {
  return userRequest.get("/inventory/record",{
    params: { user: {position: positionUser}, booking_id: bookingID }}
 );
}

export const getRoomByBookingID = (positionUser, bookingID) => {
  return userRequest.get("/rooms/booking", {
    params: { user: {position: positionUser}, bookingID: bookingID}
  })
}