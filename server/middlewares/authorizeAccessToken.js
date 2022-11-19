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

module.exports = authorizeAccessToken;
