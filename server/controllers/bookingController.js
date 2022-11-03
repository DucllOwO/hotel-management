<<<<<<< HEAD

=======
const bookingDAL = require("../DAL/bookingDAL");
const customerDAL = require("../DAL/customerDAL");
const { BadRequestError } = require("../middlewares/errorHandler");
>>>>>>> backend

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

// tao booking khong can check phong trong vi chi co status available moi co nut dat phong
const createBooking = async (req, res, next) => {
  const { booking, customer, voucher } = req.body;

  if (!booking || !customer) return next(BadRequestError());

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

<<<<<<< HEAD
const createBooking = (req, res) => {
  res.send("k");
=======
const deleteBooking = async (req, res, next) => {
  const { id } = req.params;

  const { error } = await bookingDAL.deleteBooking(id);

  if (error) return next(error);

  res.status(204).send();
>>>>>>> backend
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
