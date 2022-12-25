import { userRequest } from "./api";

export const getAllRoomFeature = (positionUser) => {
  return userRequest.get(`/room_features`, {
    params: { user: { position: positionUser } },
  });
};
