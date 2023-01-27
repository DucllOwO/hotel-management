const receiptDAL = require("../DAL/receiptDAL");
const dayjs = require("dayjs");
const { BadRequestError } = require("../middlewares/errorHandler");
const getReceiptByTime = async (req, res, next) => {
  //const { date}

  const { data, error } = await receiptDAL.getAllReceipt();
  console.log(data);

  if (error) return next(error);

  res.status(200).send(data);
};
const updateReceipt = async (req, res, next) => {
  const {id} = req.params;
  const {newReceipt} = req.body.params;

  if(!id || !newReceipt) return next(BadRequestError());

  const {data, error} = await receiptDAL.updateReceipt(id, newReceipt);

  if(error) return next(error);

  res.status(200).send(data);
}
const getReceiptByBookingID = async (req, res, next) => {
  const {bookingID} = req.params;

  if(!bookingID) return next(BadRequestError());

  const {data, error} = await receiptDAL.getReceiptByBookingID(bookingID);

  if(error) return next(error);

  res.status(200).send(data[0]);
}
const getReceiptByDay = async (req, res, next) => {
  const { day } = req.query;

  const { data, error } = await receiptDAL.getReceiptByDay(dayjs(day));
  console.log(data);

  if (error) return next(error);

  res.status(200).send(data);
};
const getReceiptByMonth = async (req, res, next) => {
  const { firstDay, lastDay } = req.query;

  const { data, error } = await receiptDAL.getReceiptByMonth(
    dayjs(firstDay),
    dayjs(lastDay)
  );

  if (error) return next(error);

  res.status(200).send(data);
};
const getReceiptByYear = async (req, res, next) => {
  const { firstDay, lastDay } = req.query;

  const { data, error } = await receiptDAL.getReceiptByYear(firstDay, lastDay);
  console.log(data);

  if (error) return next(error);

  res.status(200).send(data);
};

const createReceipt = async (req, res, next) => {
  const { receipt, employee, booking } = req.body;

  if (!receipt || !employee || !booking) return next(BadRequestError());

  const { data: newReceipt, error: insertReceiptError } =
    await receiptDAL.createReceipt({
      ...receipt,
      employee_id: employee?.id,
      booking_id: booking?.id,
      employee_name: employee?.fullname,
      checkin_time: booking?.checkin_time,
    });

  if (insertReceiptError) return next(insertReceiptError);
  console.log(newReceipt);
  res.status(201).send(newReceipt);
};

module.exports = {
  getReceiptByTime,
  createReceipt,
  getReceiptByDay,
  getReceiptByMonth,
  getReceiptByYear,
  getReceiptByBookingID,
  updateReceipt
};
