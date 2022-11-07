const {
  getAllRecord,
  getByID,
  createRecord,
} = require("../controllers/importingController");

const pagination = require("../middlewares/pagination");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const router = require("express").Router();

router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.PURCHASE),
  pagination,
  getAllRecord
);
router.get(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.PURCHASE),
  getByID
);
router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.PURCHASE),
  createRecord
);

module.exports = router;
