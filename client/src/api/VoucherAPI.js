import { userRequest } from "./api";

export const fetchVouchers = (positionUser) => {
  return userRequest.get(`/vouchers`, {
    params: { user: { position: positionUser } },
  });
};
