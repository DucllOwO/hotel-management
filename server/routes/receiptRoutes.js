const {
  getReceiptByTime,
  createReceipt,
  getReceiptByDay,
  getReceiptByYear,
  getReceiptByMonth,
} = require("../controllers/receiptController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { tryCatch } = require("../middlewares/errorHandler");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const permissionsRoutes = require("./permissionsRotues.js");
const router = require("express").Router();

router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.RECEIPT),
  tryCatch(getReceiptByTime)
);

router.get(
  "/day",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.RECEIPT),
  tryCatch(getReceiptByDay)
);

router.get(
  "/month",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.RECEIPT),
  tryCatch(getReceiptByMonth)
);
router.get(
  "/year",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.RECEIPT),
  tryCatch(getReceiptByYear)
);

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.RECEIPT),
  tryCatch(createReceipt)
);

module.exports = router;
