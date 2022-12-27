const { getBookingByStatus, getRecordByBookingID } = require("../controllers/inventoryController");

const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { tryCatch } = require("../middlewares/errorHandler");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();

router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.INVENTORY),
  tryCatch(getBookingByStatus)
);

router.get(
  "/record",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.INVENTORY),
  tryCatch(getRecordByBookingID)
);

module.exports = router;