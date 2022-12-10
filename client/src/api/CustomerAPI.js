import { userRequest } from "./api";

export const fetchCustomer = (positionUser) => {
  return userRequest.get("/users", {
    params: { user: { position: positionUser }, type: "customer" },
  });
};

export const fetchCustomerByID = (positionUser, customerID) => {
  return userRequest.get(`/users/${customerID}`, {
    params: { user: { position: positionUser }, type: "customer" },
  });
};
