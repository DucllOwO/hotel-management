const supabase = require('../database');

async function getAllCustomer()
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
    getAllCustomer,
    createNewCustomer,
    updateCustomerInformation
}