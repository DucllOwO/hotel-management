const getAllRoomFeatures = (req, res) => {
  res.send("getAllRoomFeatures route");
};

const getRoomFeature = (req, res) => {
  res.send("getRoomFeature route");
};

const updateRoomFeature = (req, res) => {
  res.send("updateRoomFeature route");
};

const hideRoomFeature = (req, res) => {
  res.send("hideRoomFeature route");
};

const createRoomFeature = (req, res) => {
  res.send("createRoomFeature route");
};

module.exports = {
  getAllRoomFeatures,
  getRoomFeature,
  createRoomFeature,
  updateRoomFeature,
  hideRoomFeature
};
