const {
  getAllRecord,
  getByID,
  createRecord,
  getDeatailByPurchaseID,
} = require("../controllers/importingController");

const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { tryCatch } = require("../middlewares/errorHandler");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const router = require("express").Router();

router.get("/", authorizeAccessToken, getAllRecord);
router.get("/:id", authorizeAccessToken, getByID);
router.get("/detail/:purchaseID", authorizeAccessToken, getDeatailByPurchaseID);
router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.PURCHASE),
  tryCatch(createRecord)
);

module.exports = router;
