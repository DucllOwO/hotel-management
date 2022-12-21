const express = require("express");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();
const morgan = require("morgan");
const {
  handle404Error,
  handleOtherError,
} = require("./middlewares/errorHandler");
const { initAccessControl } = require("./middlewares/roleAccessControl");

const authRoute = require("./routes/authRoute");
const bookingsRoutes = require("./routes/bookingsRoutes");
const vouchersRoutes = require("./routes/vouchersRoutes");
const roomsRoutes = require("./routes/roomsRoutes");
const roomFeaturesRoutes = require("./routes/roomFeaturesRoutes");
const accountsRoutes = require("./routes/accountsRoutes");
//const customersRoutes = require("./routes/customersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const roomTypesRoutes = require("./routes/roomTypesRoutes")
const receiptRoutes = require("./routes/receiptRoutes");
const itemRoutes = require("./routes/itemRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");
const importingsRoutes = require("./routes/importingsRoutes");
const featuresRoutes = require("./routes/featuresRoutes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

initAccessControl();

//position vs permission route

app.use("/api/auth", authRoute);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/vouchers", vouchersRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/room_features", roomFeaturesRoutes);
app.use("/api/accounts", accountsRoutes);
app.use("/api/roomtypes", roomTypesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/payment", paymentsRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/importing", importingsRoutes);
app.use("/api/features", featuresRoutes);
app.use("/api/receipt", receiptRoutes);
//app.use("/branches", branchesRoutes);
app.use("*", handle404Error);

app.use(handleOtherError);

app.listen(process.env.PORT || 1205, async () => {
  // const { data: users, error } = await supabase.auth.api.listUsers();
  // console.log(error);
  // console.log(users);
  console.log("server on port 1205");
});
