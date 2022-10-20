const express = require("express");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();
const morgan = require('morgan')
const {
  handle404Error,
  handleOtherError,
} = require("./middlewares/errorHandler");
//const branchesRoutes = require("./routes/branchesRoutes");
const authRoute = require("./routes/authRoute");
const reportsRoutes = require("./routes/reportsRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const vouchersRoutes = require("./routes/vouchersRoutes");
const roomsRoutes = require("./routes/roomsRoutes");
const roomFeaturesRoutes = require("./routes/roomFeaturesRoutes");
//const customersRoutes = require("./routes/customersRoutes");
const employeesRoutes = require("./routes/employeesRoutes");
const managersRoutes = require("./routes/managersRoutes");

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use("/auth", authRoute);
app.use("/reports", reportsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/vouchers", vouchersRoutes);
app.use("/rooms", roomsRoutes);
app.use("/room_features", roomFeaturesRoutes);
app.use("/employees", employeesRoutes);
app.use("/managers", managersRoutes);
app.use('/positions', positionsRoutes)
//app.use("/customers", customersRoutes);
//app.use("/branches", branchesRoutes);

app.use(handle404Error);

app.use(handleOtherError);

app.listen(process.env.PORT || 1205, async () => {
  // console.log("server is running");
  // const ent = await supabase.from("test1").select("*");
  // console.log(ent);
  console.log("server on");
});
