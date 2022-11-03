const{
    getAllCustomer,
    createNewCustomer,
    updateCustomerInformation
} = require('../DAL/customerDAL')


const getAllCustomer = (req, res) => {
    res.send(getAllCustomer());
};

const createNewCustomer = (req, res) =>{
    res.send(createNewCustomer(req.body));
};
const updateCustomerInformation = (req, res) => {
    res.send(updateCustomerInformation());
};

module.exports = {
    getAllCustomer,
    createNewCustomer,
    updateCustomerInformation
}