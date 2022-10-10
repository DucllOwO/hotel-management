const { getCustomerAccount } = require('../controllers/customerController')
const { verifyToken } = require('../middlewares/verify')
const router = require("express").Router();

router.get("/:username", verifyToken, getCustomerAccount);

module.exports = router;