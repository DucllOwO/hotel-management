const Booking = require('../models/Booking');

const getAllBookings = (req, res) => {
  res.send("getAllBookings route");
};

const getBooking = (req, res) => {
  res.send("getBooking route");
};

const createBooking = (req, res) => {
  const newBooking = new Booking();
  res.status(200).json(newBooking.createBooking());
};

const deleteBooking = (req, res) => {
  const cancelBooking = new Booking();
  res.send(cancelBooking.cancelBooking());
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking
};
