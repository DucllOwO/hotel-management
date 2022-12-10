import { userRequest } from "./api";

const DEDAULT_STATUS_BOOKING = 0;

export const fetchBookingByDate = (positionUser, from, to) => {
  return userRequest.get("/bookings/room", {
    params: { user: { position: positionUser }, from: from, to: to },
  });
};

export const createBooking = (positionUser, customer, room, from, to) => {
  return userRequest.post("/bookings", {
    user: { position: positionUser },
    booking: {
      book_from: from,
      book_to: to,
      status: DEDAULT_STATUS_BOOKING,
      deposit: room.price,
      customer_id: customer.id,
    },
  });
};
