import { userRequest } from "./api";

export const fetchBookingByStatus = (positionUser, status) => {
    return userRequest.get("/inventory", {
      params: { user: { position: positionUser }, status: status },
    });
  }