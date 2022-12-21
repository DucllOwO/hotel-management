import { userRequest } from "./api";

export const fetchItems = (positionUser) => {
  return userRequest.get("/items", {
    params: { user: { position: positionUser } },
  });
};
