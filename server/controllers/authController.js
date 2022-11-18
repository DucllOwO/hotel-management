const jwt = require("jsonwebtoken");
const accountDAL = require("../DAL/AccountDAL");
const bcrypt = require("bcrypt");
const supabase = require("../database");

const login = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (username) {
    const { user, error } = await accountDAL.getAccountByUsername(username);
    console.log(`${JSON.stringify(user)} `);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        // Generate an access token
        const accessToken = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET
        );

        const { password: temp, ...userWithoutPassword } = user;

        return res.json({ userWithoutPassword, accessToken }).send();
      } else {
        return res.status(401).send("Password is incorrect");
      }
    } else {
      error.status = 400;
      return next(error);
    }
  }

  const { session, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  });
  //console.log("chạy duoc sign in");
  if (error) return next(error);

  return res.json({ token: session }).send();
};

const forgotPassword = (req, res) => {
  res.send("forgotPassword route");
};

module.exports = {
  login,
  forgotPassword,
};
