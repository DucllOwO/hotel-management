const { getAllReports, getReport } = require('../controllers/reportController')
const { verifyAdminAndManager } = require('../middlewares/verify')
const router = require('express').Router();

// this route use to get report of all branch

router.get('/', verifyAdminAndManager, getAllReports);

router.get('/:id', verifyAdminAndManager, getReport)

module.exports = router;