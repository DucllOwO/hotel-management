const { getAllReports, getReport } = require("../controllers/reportController");
const router = require("express").Router();

// this route use to get report of all branch

router.get("/", getAllReports);

router.get("/:id", getReport);

module.exports = router;
