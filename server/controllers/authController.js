const { users } = require("../utils/dummyData");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;
  // Filter user from the users array by username and password
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
};

const register = (req, res) => {
  res.send("register route");
};

const forgotPassword = (req, res) => {
  res.send("forgotPassword route");
};

module.exports = {
  login,
  register,
  forgotPassword,
};
