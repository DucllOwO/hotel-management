const login = (req, res) => {
  res.send('login route')
 }

const register = (req, res) => {
  res.send("register route");
 }

const forgotPassword = (req, res) => {
  res.send("forgotPassword route");
}
 
module.exports = {
  login,
  register,
  forgotPassword
}


