import { userRequest } from "./api";

export const getAllPayment = (positionUser) => {
  return userRequest.get("/payment", {
    params: { user: { position: positionUser } },
  });
};

export const createPayment = (
  positionUser,
  { name, established_date, total_cost }
) => {
  return userRequest.post("/payment", {
    user: { position: positionUser },
    payment: { name, established_date, total_cost },
  });
};
