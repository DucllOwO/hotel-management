const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { getAllReports, getReport } = require("../controllers/reportController");
const router = require("express").Router();

// this route use to get report of all branch

router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.REPORT),
  getAllReports
);

router.get("/:id", getReport);

module.exports = router;
