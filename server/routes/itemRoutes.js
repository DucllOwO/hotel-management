const {
  getAllItem,
  getByID,
  createItem,
  updateItem,
} = require("../controllers/itemController");

const pagination = require("../middlewares/pagination");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { tryCatch } = require("../middlewares/errorHandler");
const router = require("express").Router();

router.get("/", authorizeAccessToken, getAllItem);
router.get("/:id", authorizeAccessToken, getByID);
router.put(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.ITEM),
  tryCatch(updateItem)
);
router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.ITEM),
  createItem
);

module.exports = router;
