// hide
const {
  getAllRoom,
  createRoom,
  updateRoom,
  hideRoom,
} = require("../controllers/roomController");
const { verifyManager } = require("../middlewares/verifyAuthorization");
const router = require("express").Router();

// only manager need to get all room feature to edit
router.get("/", verifyManager, getAllRoom);

// dont need get single feature
//router.get('/:id', )

router.post("/", verifyManager, createRoom);

router.put("/:id", verifyManager, updateRoom);

router.delete("/:id", verifyManager, hideRoom);

module.exports = router;
