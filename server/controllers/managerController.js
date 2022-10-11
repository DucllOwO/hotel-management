const getAllManager = (req, res) => {
  res.send("getAllManager route");
};

const getManager = (req, res) => {
  res.send("getManager route");
};

const createManager = (req, res) => {
  res.send("createManager route");
};

const updateManager = (req, res) => {
  res.send("updateManager route");
};

const deleteManager = (req, res) => {
  res.send("deleteManager route");
};

module.exports = {
  getAllManager,
  getManager,
  createManager,
  updateManager,
  deleteManager,
};
