import { userRequest } from "./api";

export const getUsedRoomByBookingID = (positionUser, bookingID) => {
  return userRequest.get(`/used_room/${bookingID}`, {
    params: { user: { position: positionUser } },
  });
};
