import { userRequest } from "./api";

const getUsedItemByBookingID = (positionUser, bookingID) => {
  return userRequest.get(`/used_room`);
};
