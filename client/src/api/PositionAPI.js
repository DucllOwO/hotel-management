import { userRequest } from "./api";

export const fetchPosition = (positionUser) => {
  return userRequest.get(`/positions`, {
    params: { user: { position: positionUser } },
  });
};

export const fetchPositionByID = (positionUser, positionID) => {
  return userRequest.get(`/positions/${positionID}`, {
    params: { user: { position: positionUser } },
  });
};

export const updatePosition = (
  positionUser,
  name,
  id,
  featuresForAddPermissions,
  featuresForRemovePermissions
) => {
  return userRequest.put(`/positions/${id}`, {
    user: {
      position: positionUser,
    },
    position: {
      editedName: name,
    },
    featuresForAddPermissions,
    featuresForRemovePermissions,
  });
};

export const addPosition = (positionUser, name, featuresForAddPermissions) => {
  return userRequest.post(`/positions`, {
    user: {
      position: positionUser,
    },
    position: {
      name: name,
    },
    featuresForAddPermissions: featuresForAddPermissions,
  });
};

export const deletePosition = (positionUser, posID) => {
  return userRequest.delete(`/positions/${posID}`, {
    params: {
      user: {
        position: positionUser,
      },
    },
  });
};
