const getAllPermission = (req, res) => {
  res.send("getAllPermission route");
};

const updatePermission = (req, res) => {
  res.send("updatePermission route");
};

const deletePermission = (req, res) => {
  res.send("deletePermission route");
};

const createPermission = (req, res) => {
  res.send("createPermission route");
};

module.exports = {
  getAllPermission,
  createPermission,
  updatePermission,
  deletePermission,
};
