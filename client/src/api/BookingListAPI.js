import { userRequest } from "./api";

export const fetchBookingByStatus = (positionUser, status) => {
    return userRequest.get("/bookings/list", {
      params: { user: { position: positionUser }, status: status },
    });
}

export const updateBookingStatus = (positionUser, newStatus, bookingID) => {
  return userRequest.put(`/bookings/list/${bookingID}`, {
     user: { position: positionUser }, status: newStatus 
  });
}