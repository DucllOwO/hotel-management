// hide
const {
  getAllRoom,
  getRoom,
  createRoom,
  updateRoom,
  hideRoom,
} = require("../controllers/roomController");
const { verifyManager } = require("../middlewares/verify");
const router = require("express").Router();

// only manager need to get all room feature to edit
router.get("/", verifyManager, getAllFeature);

// dont need get single feature
//router.get('/:id', )

router.post("/", verifyManager, createFeature);

router.put("/:id", verifyManager, updateFeature);

router.delete("/:id", verifyManager, hideFeature);

module.exports = router;
