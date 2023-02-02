const {
  getAllPayment,
  getByID,
  createPayment,
} = require("../controllers/paymentController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { tryCatch } = require("../middlewares/errorHandler");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();

router.get("/", authorizeAccessToken, tryCatch(getAllPayment));
router.get("/:id", authorizeAccessToken, tryCatch(getByID));
router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.PAYMENT),
  tryCatch(createPayment)
);

module.exports = router;
