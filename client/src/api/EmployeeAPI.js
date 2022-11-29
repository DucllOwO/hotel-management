import { userRequest } from "./api";

export const fetchEmployee = (positionUser) => {
  return userRequest.get("/users", {
    params: { user: { position: positionUser }, type: "employee" },
  });
};

export const fetchEmployeeByID = (positionUser, employeeID) => {
  return userRequest.get(`/users/${employeeID}`, {
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
  }
) => {
  return userRequest.post(`/users?type=employee`, {
    user: {
      position: positionUser,
    },
    userInfo: {
      id: id,
      fullname: fullname,
      date_of_birth: new Date(date_of_birth).toLocaleDateString("en-US"),
      phone_number: phone_number,
      start_working_date: new Date(start_working_date).toLocaleDateString(
        "en-US"
      ),
      salary: salary,
      position_id: position_id,
    },
  });
};

export const updateEmployee = (
  positionUser,
  { id: id, fullname, date_of_birth, phone_number, start_working_date, salary }
) => {
  return userRequest.put(`/users/${id.trim()}?type=employee`, {
    user: {
      position: positionUser,
    },
    userInfo: {
      fullname: fullname,
      date_of_birth: new Date(date_of_birth).toLocaleDateString("en-US"),
      phone_number: phone_number,
      start_working_date: new Date(start_working_date).toLocaleDateString(
        "en-US"
      ),
      salary: salary,
    },
  });
};
