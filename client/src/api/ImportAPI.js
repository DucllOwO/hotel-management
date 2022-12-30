import { userRequest } from "./api";

export const fetchRecord = (positionUser) => {
  return userRequest.get("/importing", {
    params: { user: { position: positionUser } },
  });
};

export const fetchRecordDetail = (positionUser, purchaseID) => {
  return userRequest.get(`/importing/detail/${purchaseID}`, {
    params: { user: { position: positionUser } },
  });
};

// purchasedetail = { item_id, purchase_id, amount, price }
export const createRecord = (
  positionUser,
  { total_cost, employee_id },
  purchaseDetails
) => {
  return userRequest.post("/importing", {
    user: { position: positionUser },
    record: { total_cost, employee_id },
    purchaseDetail: purchaseDetails,
  });
};
