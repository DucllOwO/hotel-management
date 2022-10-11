const getAllBookings = (req, res) => {
  res.send("getAllBookings route");
};

const getBooking = (req, res) => {
  res.send("getBooking route");
};

const createBooking = (req, res) => {
  const test = { id: 1, name: 'test booking'}
  res.send("createBooking route " + JSON.stringify(test));
};

const deleteBooking = (req, res) => {
  res.send("deleteBooking route");
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking
};
