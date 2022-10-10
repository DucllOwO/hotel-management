const getAllRoom = (req, res) => {
  res.send("getAllRoom route");
};

const getRoom = (req, res) => {
  res.send("getRoom route");
};

const updateRoom = (req, res) => {
  res.send("updateRoom route");
};

const hideRoom = (req, res) => {
  res.send("hideRoom route");
};

const createRoom = (req, res) => {
  res.send("createRoom route");
};

module.exports = {
  getAllRoom,
  getRoom,
  createRoom,
  updateRoom,
  hideRoom,
};
