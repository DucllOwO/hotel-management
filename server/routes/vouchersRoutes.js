/// hide
const {
  getAllVoucher,
  createVoucher,
  hideVoucher,
  getVoucher,
} = require("../controllers/voucherController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { tryCatch } = require("../middlewares/errorHandler");

const router = require("express").Router();
// only manager need to get all room feature to edit
router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.VOUCHER),
  tryCatch(getAllVoucher)
);

router.get(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.VOUCHER),
  tryCatch(getVoucher)
);

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.VOUCHER),
  tryCatch(createVoucher)
);

router.put(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.BOOKING),
  tryCatch(hideVoucher)
);

module.exports = router;
