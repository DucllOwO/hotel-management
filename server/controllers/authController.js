
const jwt = require("jsonwebtoken");
const accountDAL = require('../DAL/AccountDAL')

const login = async (req, res, next) => {
  console.log(jwt);
  try {
    const { username, password } = req.body;
    console.log(`${username} ${password}`);
    // Filter user from the users array by username and password
    const {user, error} = await accountDAL.getAccountByUsername(username);
    //console.log(`${JSON.stringify(user)} ${error}`)
    if (user) {
      console.log(user?.username);
      // Generate an access token
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET
      );

      res.json({ user,
        accessToken
      });
    } else {
      //error.status = 404;
      console.log(error)
      next(error);
    }
  } catch (error) {
    console.log('next cuar try catch')
    next(error)
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
