import { userRequest } from "./api";

export const fetchRoomByStatus = (positionUser, status) => {
  return userRequest.get(`/rooms`, {
    params: { user: { position: positionUser }, status: status },
  });
};

export const createRoom = (positionUser, { room_name, room_type_id }) => {
  return userRequest.post(`/rooms`, {
    user: { position: positionUser },
    room: {
      room_name,
      room_type_id,
      status: 0,
      is_active: true,
    },
  });
};

export const updateRoom = (
  positionUser,
  roomID,
  { room_name, room_type_id }
) => {
  return userRequest.put(`/rooms/${roomID}`, {
    user: { position: positionUser },
    room: {
      room_name,
      room_type_id,
    },
  });
};

export const hideRoom = (positionUser, roomID) => {
  return userRequest.put(`/rooms/${roomID}`, {
    user: { position: positionUser },
    room: {
      is_active: false,
    },
  });
};

export const fetchRoom = async (positionUser) => {
  return userRequest.get("/rooms", {
    params: { user: { position: positionUser } },
  });
};
