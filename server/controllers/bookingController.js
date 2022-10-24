const DAL = require('../DAL/AccountDAL');

const getAllBookings = (req, res) => {
  res.send("getAllBookings route");
};

const getBooking = (req, res) => {
  res.send("getBooking route");
};

const createBooking = (req, res) => {
  res.send(DAL('admin'));
};

const deleteBooking = (req, res) => {
  res.send("deleting Booking");
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking
};
