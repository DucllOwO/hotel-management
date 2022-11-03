const{
    getAllCustomers,
    createNewCustomer,
    updateCustomerInformation
} = require('../DAL/customerDAL')


const getAllCustomer = (req, res) => {
    res.send(getAllCustomer());
};

const createCustomer = (req, res) =>{
    res.send(createNewCustomer(req.body));
};
const updateInformation = (req, res) => {
    res.send(updateCustomerInformation());
};

module.exports = {
    getAllCustomer,
    createCustomer,
    updateInformation
}