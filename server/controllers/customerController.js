const getCustomerAccount = (req, res) => {
  res.send("getCustomerAccount route");
};

const getCustomerBooking = (req, res) => {
  res.send("getCustomerBooking route");
};

module.exports = {
  getCustomerAccount,
  getCustomerBooking
};
