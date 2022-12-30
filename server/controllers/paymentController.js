const paymentDAL = require("../DAL/paymentDAL");

const getAllPayment = async (req, res, next) => {
  const { type } = req.params;
  const { day, firstDay, lastDay } = req.query;

  switch (type) {
    case "day":
      const { data: dayData, error: dayError } =
        await paymentDAL.getReceiptByDay(day);
      if (dayError) return next(dayError);
      res.status(200).send(dayData);
      break;
    case "month":
      const { data: monthData, error: monthError } =
        await paymentDAL.getReceiptByMonth(firstDay, lastDay);
      if (monthError) return next(monthError);
      res.status(200).send(monthData);
      break;
    case "year":
      const { data: yearData, error: yearError } =
        await paymentDAL.getReceiptByMonth(firstDay, lastDay);
      if (yearError) return next(yearError);
      res.status(200).send(yearData);
      break;

    default:
      const { data, error } = await paymentDAL.getAllPayments();
      if (error) return next(error);
      res.status(200).send(data);
  }
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
