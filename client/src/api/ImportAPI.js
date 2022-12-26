import { userRequest } from "./api";


export const fetchRecord = async (positionUser) => {
    return userRequest.get("/importing", {
      params: { user: { position: positionUser } },
    });
};

export const createRecord = async (positionUser, newRecord) => {
    return userRequest.post("/importing", {
        user: {position: positionUser}, record: newRecord,
    });
}