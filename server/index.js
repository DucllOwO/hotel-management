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
const inventoriesRoutes = require("./routes/inventoriesRoutes");
const roomFeaturesRoutes = require("./routes/roomFeaturesRoutes");
const accountsRoutes = require("./routes/accountsRoutes");
//const customersRoutes = require("./routes/customersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const roomTypesRoutes = require("./routes/roomTypesRoutes");
const receiptRoutes = require("./routes/receiptRoutes");
const itemRoutes = require("./routes/itemRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");
const importingsRoutes = require("./routes/importingsRoutes");
const featuresRoutes = require("./routes/featuresRoutes");
const reportRoutes = require("./routes/reportRoutes");
const hasRoomFeatureRoutes = require("./routes/hasRoomFeaturesRoutes");
const usedRoomRoute = require("./routes/usedRoomRoutes");
const dayjs = require("dayjs");

const app = express();

dayjs.locale("vi");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

initAccessControl();

//position vs permission route

app.use("/api/auth", authRoute);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/room_features", roomFeaturesRoutes);
app.use("/api/accounts", accountsRoutes);
app.use("/api/roomtypes", roomTypesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/inventory", inventoriesRoutes);
app.use("/api/payment", paymentsRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/importing", importingsRoutes);
app.use("/api/features", featuresRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/used_room", usedRoomRoute);
app.use("/api/has_room_features", hasRoomFeatureRoutes);

app.use("*", handle404Error);

app.use(handleOtherError);

app.listen(process.env.PORT || 1205, async () => {
  // const { data: users, error } = await supabase.auth.api.listUsers();
  // console.log(error);
  // console.log(users);
  console.log("server on port 1205");
});
