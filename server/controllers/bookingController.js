

const getAllBookings = (req, res) => {
  res.send("getAllBookings route");
};

const getBooking = (req, res) => {
  res.send("getBooking route");
};

const createBooking = (req, res) => {
  res.send("k");
};

const deleteBooking = (req, res) => {
  res.send("deleting Booking");
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
};
