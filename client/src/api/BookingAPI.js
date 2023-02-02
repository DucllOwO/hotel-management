import { userRequest } from "./api";

const DEDAULT_STATUS_BOOKING = 0;

export const fetchBookingByDate = (positionUser, from, to) => {
  return userRequest.get(`/bookings/room`, {
    params: { user: { position: positionUser }, from: from, to: to },
  });
};

export const createCustomer = (positionUser, newCustomer) => {
  console.log("called");
  console.log(positionUser);
  return userRequest.post("/users?type=customer", {
    user: { position: positionUser },
    userInfo: newCustomer,
  });
};

export const createBooking = (positionUser, customer, room, from, to) => {
  // console.log(from)
  return userRequest.post("/bookings", {
    user: { position: positionUser },
    booking: {
      book_from: from,
      book_to: to,
      customer_id: customer.id,
    },
    rooms: room,
  });
};
