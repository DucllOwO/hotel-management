const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(compression());

app.use("/auth", authRoute);
app.use("/reports", reportsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/vouchers", vouchersRoutes);
app.use("/branches", branchesRoutes);
app.use("/rooms", roomsRoutes);
app.use("/hotels", hotelsRoutes);
app.use("/room_features", roomFeaturesRoutes);
app.use("/customers", customersRoutes);
app.use("/employees", employeesRoutes);
app.use("/invoices", invoicesRoutes);
//app.use("/checkout", stripeRoute);

app.listen(pocess.env.PORT || 1205, async () => {
  // console.log("server is running");
  // const ent = await supabase.from("test1").select("*");
  // console.log(ent);
});
