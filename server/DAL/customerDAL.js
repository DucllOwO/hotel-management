<<<<<<< HEAD
const supabase = require('../database');

async function getAllCustomers()
{
    const{data, error} = await supabase
    .from('customer')
    .select();
    return {data, error};
};
async function createNewCustomer(newCustomer)
{
    const{data, error} = await supabase
    .from('customer')
    .insert({
        id: newCustomer.id,
        firstname: newCustomer.firstname,
        lastname: newCustomer.lastname,
        date_of_birth: newCustomer.date_of_birth,
        phone_number: newCustomer.phone_number
    })
};
async function updateCustomerInformation(newInformation)
{
    const{data, error} = await supabase
    .from('customer')
    .update({
        firstname: newCustomer.firstname,
        lastname: newCustomer.lastname,
        date_of_birth: newCustomer.date_of_birth,
        phone_number: newCustomer.phone_number
    })
    .eq('id', newInformation.id);
    return {data, error};
}
module.exports = {
    getAllCustomers,
    createNewCustomer,
    updateCustomerInformation
}
=======
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
>>>>>>> backend
