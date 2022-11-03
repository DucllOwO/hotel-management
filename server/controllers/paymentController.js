const{
    getAllPayment,
    getPaymentByID,
    createNewPayment
} = require('../DAL/paymentDAL')

const getAllPayment = (req, res) => {
    res.send(getAllPayment());
};
const getPaymentByID = (req, res) => {
    res.send(getPaymentByID(req.query));
};
const createNewPayment = (req, res) => {
    res.send(createNewPayment(req.params));
};

module.exports = {
    getAllPayment,
    getPaymentByID,
    createNewPayment
}