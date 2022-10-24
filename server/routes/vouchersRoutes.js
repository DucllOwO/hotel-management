/// hide
const {
  getAllVoucher,
  createVoucher,
  updateVoucher,
  hideVoucher,
} = require("../controllers/voucherController");
const router = require("express").Router();
// only manager need to get all room feature to edit
router.get("/", getAllVoucher);

// dont need get single voucher because
//router.get('/:id', )

router.post("/", createVoucher);

router.put("/:id", updateVoucher);

router.delete("/:id", hideVoucher);

module.exports = router;
