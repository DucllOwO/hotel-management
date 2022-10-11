const {
  getCustomerAccount,
  getCustomerBooking,
} = require("../controllers/customerController");
const { verifyToken } = require("../middlewares/verifyAuthorization");
const router = require("express").Router();

router.get("/:username", verifyToken, getCustomerAccount);

router.get("/:username/bookings", verifyToken, getCustomerBooking);

module.exports = router;
