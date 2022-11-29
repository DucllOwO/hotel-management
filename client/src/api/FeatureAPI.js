import { userRequest } from "./api";

export const fetchFeatures = (positionUser) => {
  return userRequest.get(`/features`, {
    params: { user: { position: positionUser } },
  });
};
