const getAllVoucher = (req, res) => {
  res.send("getAllRoom route");
};

const createVoucher = (req, res) => {
  res.send("getRoom route");
};

const updateVoucher = (req, res) => {
  res.send("updateRoom route");
};

const hideVoucher = (req, res) => {
  res.send("hideRoom route");
};

module.exports = {
  getAllVoucher,
  createVoucher,
  updateVoucher,
  hideVoucher
};
