const jwt = require("jsonwebtoken");
const accountDAL = require("../DAL/AccountDAL");
const employeeDAL = require("../DAL/employeeDAL");
const bcrypt = require("bcrypt");
const permissionDAL = require("../DAL/permissionDAL");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (username) {
    const { user, error } = await accountDAL.getAccountByUsername(username);
    //console.log(`${JSON.stringify(user)} `);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        // Generate an access token
        const accessToken = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET
        );

        const { password: temp, ...userWithoutPassword } = user;

        const { data: employeePosition, error: getPositionError } =
          await employeeDAL.getEmployeePositionByUsername(username);
        console.log(employeePosition[0]);

        const { data, error } = await permissionDAL.getPermissionByPositionID(
          employeePosition[0].position_id.id
        );
        const tempPermission = [
          ...new Set(data.map((item) => item?.feature_id.name)),
        ];
        if (getPositionError) return next(getPositionError);

        return res
          .json({
            user: {
              ...userWithoutPassword,
              fullname: employeePosition[0].fullname,
            },
            accessToken,
            position: employeePosition[0].position_id.name,
            permission: tempPermission,
          })
          .send();
      } else {
        return res.status(401).send("Password is incorrect");
      }
    } else {
      error.status = 400;
      return next(error);
    }
  }

  //logic to login with email
  // const { session, error } = await supabase.auth.signIn({
  //   email: email,
  //   password: password,
  // });
  // //console.log("chạy duoc sign in");
  // if (error) return next(error);

  // const { data, error: errorGetPosition } =
  //   await employeeDAL.getEmployeePositionByEmail(email);
  // console.log(data);
  // if (error) return next(errorGetPosition);

  // return res.json({ user: session, position: data[0].position_id.name }).send();
};

const forgotPassword = (req, res) => {
  res.send("forgotPassword route in development");
};

module.exports = {
  login,
  forgotPassword,
};
