const receiptDAL = require("../DAL/receiptDAL");

const getAllReceipt = async (req, res, next) => {
  const { from, to } = req.paginatedResult;

  const { data, error } = await receiptDAL.getAllReceipt(from, to);
  console.log(data)
  if (error) return next(error);
  res.status(200).send(data);
};
const createReceipt = async (req, res, next) => {
  const { receipt, employee, booking } = req.body;

  if (!receipt || !employee || !booking) return next(BadRequestError());

  const {data: newReceipt, error: insertReceiptError } = await receiptDAL.createReceipt({
    employee_id: employee?.id,
    booking_id: booking?.id,
    employee_name: employee?.name,
    checkin_time: booking?.checkin_time,
    ...receipt
  });

  if (insertReceiptError) return next(insertReceiptError);
  console.log(newReceipt)
  res.status(201).send(newReceipt);
};

module.exports = {
  getAllReceipt,
  createReceipt,
};
