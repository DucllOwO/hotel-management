const {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { tryCatch } = require("../middlewares/errorHandler");
const router = require("express").Router();

router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.BOOKING),
  tryCatch(getAllBookings)
);

router.get(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.BOOKING),
  tryCatch(getBooking)
);

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.BOOKING),
  tryCatch(createBooking)
);

router.delete(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.DELETE, resourceAC.BOOKING),
  tryCatch(deleteBooking)
);

module.exports = router;
