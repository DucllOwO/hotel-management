const getAllBranches = (req, res) => {
  res.send("getAllBranches route");
};

const getBranch = (req, res) => {
  res.send("getBranch route");
};

const createBranch = (req, res) => {
  const test = { id: 1, name: 'chi nhanh nha trang' };
  res.send("createBranch route " + JSON.stringify(test));
};

const updateBranch = (req, res) => {
  res.send("updateBranch route");
};

const deleteBranch = (req, res) => {
  res.send("deleteBranch route");
};

module.exports = {
  getAllBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch
};
