const {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
  getRooms
} = require("../controllers/bookingController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");

const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { tryCatch } = require("../middlewares/errorHandler");
const router = require("express").Router();

router.get(
  "/list",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.BOOKING),
  tryCatch(getAllBookings)
);

router.get(
  "/list/:id",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.BOOKING),
  tryCatch(getBooking)
);
router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.BOOKING),
  tryCatch(getRooms)
)
router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.BOOKING),
  tryCatch(createBooking)
);

router.delete(
  "/list/:id",
  authorizeAccessToken,
  hasPermission(actionAC.DELETE, resourceAC.BOOKING),
  tryCatch(deleteBooking)
);

module.exports = router;
