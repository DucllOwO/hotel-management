const getAllReports = (req, res, next) => {
  res.send("getAllReports route");
};

const getReport = (req, res) => {
  res.send("getReport route");
};

module.exports = { getAllReports, getReport };
