const getAllEmployees = (req, res) => {
  res.send("getAllEmployees route");
};

const getEmployees = (req, res) => {
  res.send("getEmployees route");
};

const createEmployees = (req, res) => {
  res.send("createEmployees route");
};

const updateEmployees = (req, res) => {
  res.send("updateEmployees route");
};

const deleteEmployees = (req, res) => {
  res.send("deleteEmployees route");
};

module.exports = {
  getAllEmployees,
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployees
};
