import { userRequest } from "./api";


export const fetchRecord = async (positionUser) => {
    const { data } = await userRequest.get("/importing", {
      params: { user: { position: positionUser } },
    });
  };