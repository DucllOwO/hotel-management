import { userRequest } from "./api";

export const getAllRoomType = (positionUser) => {
  return userRequest.get("/roomtypes", {
    params: { user: { position: positionUser } },
  });
};

export const getRoomTypeByID = (positionUser, id) => {
  return userRequest.get(`/roomtypes/${id}`, {
    params: { user: { position: positionUser } },
  });
};

export const createRoomType = (positionUser, roomType) => {
  return userRequest.post(`/roomtypes`, {
    user: {
      position: positionUser,
    },
    roomType: roomType,
  });
};

export const updateRoomType = (positionUser, roomTypeID, RoomType) => {
  return userRequest.put(`/roomtypes/${roomTypeID}`, {
    user: {
      position: positionUser,
    },
    roomType: RoomType,
  });
};

export const hideRoomType = (positionUser, roomTypeID) => {
  return userRequest.delete(`/roomtypes/${roomTypeID}`, {
    params: { user: { position: positionUser } },
  });
};
