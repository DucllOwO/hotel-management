import { userRequest } from "./api";

export const fetchAccount = (positionUser) => {
  return userRequest.get("/accounts", {
    params: { user: { position: positionUser } },
  });
};

export const updateAccount = (positionUser, username, password) => {
  return userRequest.put(`/accounts/${username}`, {
    user: { position: positionUser },
    account: { password },
  });
};
