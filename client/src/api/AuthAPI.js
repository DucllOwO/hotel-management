import { publicRequest } from "./api";

export const loginAPI = (username, password) => {
  return publicRequest.post("/auth/login", {
    username,
    password,
  });
};
