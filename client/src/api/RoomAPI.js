import { userRequest } from "./api";

export const fetchRoomByStatus = (positionUser, status) => {
  return userRequest.get(`/rooms`, {
    params: { user: { position: positionUser }, status: status },
  });
};
