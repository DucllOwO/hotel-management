const paymentDAL = require("../DAL/paymentDAL");

const getAllPayment = async (req, res, next) => {
  const { from, to } = req.paginatedResult;

  const { data, error } = await paymentDAL.getAllPayments(from, to);
  if (error) return next(error);
  res.status(200).send(data);
};
const getByID = (req, res) => {
  const { id: paymentID } = req.params;
  const { data, error } = paymentDAL.getPaymentByID(paymentID);
  if (error) return next(error);
  res.status(200).send({ data });
};
const createPayment = (req, res) => {
  const { payment } = req.body;

  if (!payment) return next(BadRequestError());

  const { error: insertPaymentError } = paymentDAL.createNewPayment({
    ...payment,
  });

  if (insertPaymentError) return next(insertPaymentError);
  res.status(201).send("Created");
};

module.exports = {
  getAllPayment,
  getByID,
  createPayment,
};
