import { userRequest } from "./api";

export const getRoomUtilsByRoomTypeID = (positionUser, roomTypeID) => {
  return userRequest.get(`/has_room_features/${roomTypeID}`, {
    params: { user: { position: positionUser } },
  });
};

export const createRoomFeaturesByRoomTypeID = (
  positionUser,
  roomTypeID,
  utils
) => {
  return userRequest.post(`/has_room_features`, {
    user: {
      position: positionUser,
    },
    roomTypeID,
    utils,
  });
};

export const updateRoomFeaturesByRoomTypeID = (
  positionUser,
  roomTypeID,
  checkUtils = [],
  unCheckUtils = []
) => {
  return userRequest.put(`/has_room_features`, {
    user: {
      position: positionUser,
    },
    roomTypeID,
    checkUtils,
    unCheckUtils,
  });
};
