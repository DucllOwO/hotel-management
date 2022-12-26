import { userRequest } from "./api";

export const fetchItems = (positionUser) => {
  return userRequest.get("/items", {
    params: { user: { position: positionUser } },
  });
};

export const createItem = (positionUser, newItem) => {
  return userRequest.post("/items", {
    user: {position: positionUser}, item: newItem,
  });
};

export const updateItem = (positionUser, itemID, newItem) => {
  return userRequest.put(`/items/${newItem.id}`, {
    user: { position: positionUser }, itemID: itemID, newItem: newItem
  })
}
