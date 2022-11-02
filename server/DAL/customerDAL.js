const supabase = require("../database");

const TABLE_NAME = "customer";

const getAllCustomer = () => {
  return supabase.from(TABLE_NAME).select("*");
};

const getCustomer = (CustomerID) => {
  return supabase.from(TABLE_NAME).select().eq("id", CustomerID);
};

const getCustomerByID = (CustomerID) => {
  return supabase.from(TABLE_NAME).select().eq("id", CustomerID);
};

const insertCustomer = (Customer) => {
  return supabase.from(TABLE_NAME).insert(Customer);
};

//const getCustomer

module.exports = {
  getAllCustomer,
  getCustomer,
  insertCustomer,
  getCustomerByID,
};
