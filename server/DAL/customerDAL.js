const supabase = require("../database");

const TABLE_NAME = "customer";

const getAllCustomer = () => {
  return supabase.from(TABLE_NAME).select("*").order("id", { ascending: true });
};

const getCustomerByID = (CustomerID) => {
  return supabase.from(TABLE_NAME).select().eq("id", CustomerID);
};

const insertCustomer = (Customer) => {
  return supabase.from(TABLE_NAME).insert(Customer);
};

const updateCustomer = (Customer, id) => {
  return supabase
    .from(TABLE_NAME)
    .update({ ...Customer })
    .eq("id", id);
};

const deleteCustomer = (id) => {
  return supabase.from(TABLE_NAME).delete().eq("id", id);
};

//const getCustomer

module.exports = {
  getAllCustomer,
  insertCustomer,
  getCustomerByID,
  updateCustomer,
  deleteCustomer,
};
