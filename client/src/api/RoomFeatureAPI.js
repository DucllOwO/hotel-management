import { userRequest } from "./api";

export const getAllRoomFeature = (positionUser) => {
  return userRequest.get(`/room_features`, {
    params: { user: { position: positionUser } },
  });
};

export const createRoomFeatures = (positionUser, featureName) => {
  return userRequest.post("/room_features", {
    user: { position: positionUser },
    RoomFeature: featureName,
  });
};

export const updateRoomFeatures = (positionUser, id, featureName) => {
  return userRequest.put(`/room_features/${id}`, {
    user: { position: positionUser },
    RoomFeature: featureName,
  });
};

export const deleteRoomFeature = (positionUser, id) => {
  return userRequest.delete(`/room_features/${id}`, {
    params: { user: { position: positionUser } },
  });
};
