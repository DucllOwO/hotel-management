import { publicRequest } from "./api";

export const login = (username, password) => {
  return publicRequest.post("/auth/login", {
    username,
    password,
  });
};
