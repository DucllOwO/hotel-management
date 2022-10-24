const {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const authorizeAccessToken = require("../middlewares/authorizaAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const router = require("express").Router();

router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.BOOKING),
  getAllBookings
);

router.get(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.BOOKING),
  getBooking
);

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.BOOKING),
  createBooking
);

router.delete(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.DELETE, resourceAC.BOOKING),
  deleteBooking
);

module.exports = router;
