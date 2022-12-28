import { userRequest } from "./api";

export const fetchAccount = (positionUser) => {
  return userRequest.get("/accounts", {
    params: { user: { position: positionUser } },
  });
};

export const createAccount = (positionUser, { username, password }) => {
  return userRequest.post("/accounts", {
    user: { position: positionUser },
    account: { username: username, password },
  });
};

export const deleteAccount = (positionUser, positionUsername) => {
  return userRequest.delete(`/accounts/${positionUsername}`, {
    params: { user: { position: positionUser } },
  });
};

export const updateAccount = (positionUser, username, password) => {
  return userRequest.put(`/accounts/${username}`, {
    user: { position: positionUser },
    account: { password },
  });
};
