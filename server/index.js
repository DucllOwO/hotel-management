const express = require("express");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();
const morgan = require("morgan");
const {
  handle404Error,
  handleOtherError,
  tryCatch,
} = require("./middlewares/errorHandler");
const { initAccessControl } = require("./middlewares/roleAccessControl");

const authRoute = require("./routes/authRoute");
const reportsRoutes = require("./routes/reportsRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const vouchersRoutes = require("./routes/vouchersRoutes");
const roomsRoutes = require("./routes/roomsRoutes");
const roomFeaturesRoutes = require("./routes/roomFeaturesRoutes");
//const customersRoutes = require("./routes/customersRoutes");
const employeesRoutes = require("./routes/employeesRoutes");
const positionsRoutes = require("./routes/positionsRoutes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

initAccessControl();

//position vs permission route

app.use("/api/auth", authRoute);
app.use("/api/reports", reportsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/vouchers", vouchersRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/room_features", roomFeaturesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/positions", positionsRoutes);
//app.use('/positions', positionsRoutes)
//app.use("/customers", customersRoutes);
//app.use("/branches", branchesRoutes);
app.use("*", handle404Error);

app.use(handleOtherError);

app.listen(process.env.PORT || 1205, async () => {
  // console.log("server is running");
  // const ent = await supabase.from("test1").select("*");
  // console.log(ent);
  console.log("server on port 1205");
});
