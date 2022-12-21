import { userRequest } from "./api";

export const getAllRoomType = (positionUser) => {
  return userRequest.get("/roomtypes", {
    params: { user: { position: positionUser } },
  });
};

export const getRoomUtilsByRoomTypeID = (positionUser, roomTypeID) => {
  return userRequest.get(`/has_room_features/${roomTypeID}`, {
    params: { user: { position: positionUser } },
  });
};
