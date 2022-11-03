const{
    getAllPayments,
    getPaymentByID,
    createNewPayment
} = require('../DAL/paymentDAL')

const getAllPayment = (req, res) => {
    res.send(getAllPayments());
};
const getByID = (req, res) => {
    res.send(getPaymentByID(req.query));
};
const createPayment = (req, res) => {
    res.send(createNewPayment(req.params));
};

module.exports = {
    getAllPayment,
    getByID,
    createPayment
}