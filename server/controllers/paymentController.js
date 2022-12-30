const paymentDAL = require("../DAL/paymentDAL");

const getAllPayment = async (req, res, next) => {
  const { data, error } = await paymentDAL.getAllPayments();
  if (error) return next(error);
  res.status(200).send(data);
};
const getByID = (req, res) => {
  const { id: paymentID } = req.params;
  const { data, error } = paymentDAL.getPaymentByID(paymentID);
  if (error) return next(error);
  res.status(200).send({ data });
};
const createPayment = async (req, res) => {
  const { payment } = req.body;

  if (!payment) return next(BadRequestError());

  const { data, error: insertPaymentError } = await paymentDAL.createNewPayment(
    payment
  );

  if (insertPaymentError) throw insertPaymentError;

  res.status(200).send(data[0]);
};

module.exports = {
  getAllPayment,
  getByID,
  createPayment,
};
