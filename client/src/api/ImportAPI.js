import { userRequest } from "./api";


export const fetchRecord = async (positionUser) => {
    return userRequest.get("/importing", {
      params: { user: { position: positionUser } },
    });
  };