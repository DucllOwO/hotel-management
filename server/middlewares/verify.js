const verifyToken = (req, res, next) => {
  next();
};

const verifyAdmin = (req, res, next) => {
  next();
};

const verifyManager = (req, res, next) => {
  next();
};

const verifyAdminAndManager = (req, res, next) => {
  next();
};

const verifyEmployee = (req, res, next) => {
  next();
};

module.exports = {
  verifyAdmin,
  verifyManager,
  verifyToken,
  verifyEmployee,
  verifyAdminAndManager
};
