import { toTitleCase } from "../Utils/formatter";
import { userRequest } from "./api";

export const fetchEmployee = (positionUser) => {
  return userRequest.get("/users", {
    params: { user: { position: positionUser }, type: "employee" },
  });
};

export const fetchEmployeeByID = (positionUser, employeeID) => {
  return userRequest.get(`/users/${employeeID.trim()}`, {
    params: { user: { position: positionUser }, type: "employee" },
  });
};

export const fetchEmployeeByUsername = (positionUser, username) => {
  return userRequest.get(`/users/employee/${username}`, {
    params: { user: { position: positionUser }, type: "employee" },
  });
};

export const deleteEmployee = (positionUser, employeeID) => {
  return userRequest.delete(`/users/${employeeID.trim()}`, {
    params: {
      user: {
        position: positionUser,
      },
      type: "employee",
    },
  });
};

export const createEmployee = async (
  positionUser,
  {
    id,
    fullname,
    date_of_birth,
    phone_number,
    start_working_date,
    salary,
    position_id,
    username,
    email,
  }
) => {
  return userRequest.post(`/users?type=employee`, {
    user: {
      position: positionUser,
    },
    userInfo: {
      id: id,
      fullname: toTitleCase(fullname.trim()),
      date_of_birth: new Date(date_of_birth).toLocaleDateString("en-US"),
      phone_number: phone_number,
      start_working_date: new Date(start_working_date).toLocaleDateString(
        "en-US"
      ),
      salary: salary,
      position_id: position_id,
      username: username,
      email: email,
    },
  });
};

export const updateEmployee = (
  positionUser,
  {
    id,
    fullname,
    date_of_birth,
    phone_number,
    start_working_date,
    position_id,
    email,
  }
) => {
  return userRequest.put(`/users/${id.trim()}?type=employee`, {
    user: {
      position: positionUser,
    },
    userInfo: {
      fullname: fullname,
      date_of_birth: new Date(date_of_birth),
      phone_number: phone_number,
      start_working_date: new Date(start_working_date),
      position_id: position_id,
      email: email,
    },
  });
};
