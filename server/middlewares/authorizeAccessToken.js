const jwt = require("jsonwebtoken");

const authorizeAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("Access denied");
  }
};

// const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.role === 'admin') {
//       next();
//     } else {
//       res.status(403).json("You are not allowed to do that!");
//     }
//   });
// };

// const verifyManager = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.role === "manager") {
//       next();
//     } else {
//       res.status(403).json("You are not allowed to do that!");
//     }
//   });
// };

// const verifyAdminAndManager = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.role === "admin" || req.user.role === "manager") {
//       next();
//     } else {
//       res.status(403).json("You are not allowed to do that!");
//     }
//   });
// };

// const verifyEmployee = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.role === "employee") {
//       next();
//     } else {
//       res.status(403).json("You are not allowed to do that!");
//     }
//   });
// };

module.exports = authorizeAccessToken;
