const supabase = require("../database");

const TABLE_NAME = "employee";

const getAllEmployee = () => {
  return supabase.from(TABLE_NAME).select("*");
};

const getEmployeeByID = (EmployeeID) => {
  return supabase.from(TABLE_NAME).select().eq("id", EmployeeID);
};

const insertEmployee = (Employee) => {
  return supabase.from(TABLE_NAME).insert(Employee);
};

const updateEmployee = (Employee, id) => {
  return supabase
    .from(TABLE_NAME)
    .update({ ...Employee })
    .eq("id", id);
};

const deleteEmployee = (id) => {
  return supabase.from(TABLE_NAME).delete().eq("id", id);
};

//const getEmployee

module.exports = {
  getAllEmployee,
  insertEmployee,
  getEmployeeByID,
  updateEmployee,
  deleteEmployee,
};
