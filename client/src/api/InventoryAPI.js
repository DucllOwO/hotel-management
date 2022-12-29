import { userRequest } from "./api";

export const fetchBookingByStatus = (positionUser, status) => {
    return userRequest.get("/inventory", {
      params: { user: { position: positionUser }, status: status },
    });
  }
export const createInventoryRecord = (positionUser, newRecord) => {
  return userRequest.post("/inventory/record", {
    user: {position: positionUser}, record: newRecord
  })
}
export const createInventoryDetail = (positionUser, newDetail) => {
  return userRequest.post("/inventory/detail", {
    user: {position: positionUser}, detail: newDetail
  })
}