const verifyToken = (req, res, next) => {
  console.log('verify token called')
  next();
};

const verifyAdmin = (req, res, next) => {
  console.log("verify admin called");
  next();
};

const verifyManager = (req, res, next) => {
  console.log("verify manager called");
  next();
};

const verifyAdminAndManager = (req, res, next) => {
  console.log("verify admin and manager called");
  next();
};

const verifyEmployee = (req, res, next) => {
  console.log("verify employee called");
  next();
};

module.exports = {
  verifyAdmin,
  verifyManager,
  verifyToken,
  verifyEmployee,
  verifyAdminAndManager
};
