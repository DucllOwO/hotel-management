const getAllReports = (req, res) => {
  res.send("getAllReports route");
};

const getReport = (req, res) => {
  res.send("getReport route");
};

module.exports = { getAllReports, getReport };
