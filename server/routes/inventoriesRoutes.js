const {
  getBookingByStatus,
  getRecordByBookingID,
  createRecord,
  createDetail,
} = require("../controllers/inventoryController");

const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { tryCatch } = require("../middlewares/errorHandler");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();

router.get("/", authorizeAccessToken, tryCatch(getBookingByStatus));
router.post(
  "/record",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.INVENTORY),
  tryCatch(createRecord)
);

router.post(
  "/detail",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.INVENTORY),
  tryCatch(createDetail)
);

router.get(
  "/detail/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.INVENTORY),
  tryCatch(createDetail)
);

router.get("/record", authorizeAccessToken, tryCatch(getRecordByBookingID));

module.exports = router;
