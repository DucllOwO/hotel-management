const getAllBookings = (req, res) => {
  res.send("getAllBookings route");
};

const getBooking = (req, res) => {
  res.send("getBooking route");
};

const getCustomerBooking = (req, res) => {
  res.send("getCustomerBooking route");
};

const createBooking = (req, res) => {
  res.send("createBooking route");
};

const deleteBooking = (req, res) => {
  res.send("deleteBooking route");
};

module.exports = {
  getAllBookings,
  getBooking,
  getCustomerBooking,
  createBooking,
  deleteBooking
};
