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

router.get("/", authorizeAccessToken, tryCatch(getReceiptByTime));

router.get("/day", authorizeAccessToken, tryCatch(getReceiptByDay));

router.get("/month", authorizeAccessToken, tryCatch(getReceiptByMonth));
router.get("/year", authorizeAccessToken, tryCatch(getReceiptByYear));

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.RECEIPT),
  tryCatch(createReceipt)
);

module.exports = router;
