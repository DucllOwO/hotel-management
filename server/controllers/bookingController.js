const bookingDAL = require("../DAL/bookingDAL");
const customerDAL = require("../DAL/customerDAL");

const getAllBookings = async (req, res, next) => {
  const { data, error } = await bookingDAL.getAllBooking();
  if (error) return next(error);

  res.status(200).send({ data });
};

const getBooking = async (req, res, next) => {
  const { id: bookingID } = req.params;
  const { data, error } = await bookingDAL.getBooking(bookingID);

  if (error) return next(error);
  if (!data[0]) return next(throwErrorDataUnavailable());

  res.status(200).send({ data: data[0] });
};

const createBooking = async (req, res, next) => {
  const { booking, customer, voucher } = req.body;

  if (!booking || !customer) return res.status(400).send("Bad request");

  //CHECK ROOM AVAILABLE

  const { data: customerTemp, error: customerTempError } =
    await customerDAL.getCustomerByID(customer?.id);

  if (customerTempError) return next(customerTempError);

  if (!customerTemp[0]) {
    const { error: insertError } = await customerDAL.insertCustomer(customer);

    if (insertError) return next(insertError);
  }

  const { error: insertBookingError } = await bookingDAL.insertBooking({
    voucher_id: voucher?.id,
    customer_id: customer?.id,
    ...booking,
  });

  if (insertBookingError) return next(insertBookingError);

  res.status(201).send("Created");
};

const deleteBooking = (req, res) => {
  res.send("deleting Booking");
};

const throwErrorDataUnavailable = () => {
  const err = new Error("Data is not available");
  err.status = 400;
  return err;
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
};
