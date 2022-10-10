/// hide
const { getAllVoucher, createVoucher, updateVoucher, hideVoucher } = require('../controllers/voucherController')
const { verifyAdmin } = require("../middlewares/verify");
const router = require("express").Router();
// only manager need to get all room feature to edit
router.get("/", verifyAdmin, getAllVoucher);

// dont need get single voucher because 
//router.get('/:id', )

router.post("/", verifyAdmin, createVoucher);

router.put("/:id", verifyAdmin, updateVoucher);

router.delete("/:id", verifyAdmin, hideVoucher);

module.exports = router;