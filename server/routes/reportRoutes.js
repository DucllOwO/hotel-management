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

router.get("/daily_report", authorizeAccessToken, tryCatch(getDailyReport));

router.get("/monthly_report", authorizeAccessToken, tryCatch(getMonthlyReport));
router.get("/yearly_report", authorizeAccessToken, tryCatch(getYearlyReport));

module.exports = router;
