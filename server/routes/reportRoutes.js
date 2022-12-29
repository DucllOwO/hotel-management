const {
  getDailyReport,
  getMonthlyReport,
  getYearlyReport,
} = require("../controllers/reportController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { tryCatch } = require("../middlewares/errorHandler");
const pagination = require("../middlewares/pagination");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const router = require("express").Router();

router.get(
  "/daily_report",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.DAILYREPORT),
  tryCatch(getDailyReport)
);

router.get(
  "/monthly_report",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.MONTHLYREPORT),
  tryCatch(getMonthlyReport)
);
router.get(
  "/yearly_report",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.YEARLYREPORT),
  tryCatch(getYearlyReport)
);

module.exports = router;
