// hide
const {
  getAllRoom,
  createRoom,
  updateRoom,
  hideRoom,
} = require("../controllers/roomController");
const router = require("express").Router();

// only manager need to get all room feature to edit
router.get("/", getAllRoom);

// dont need get single feature
//router.get('/:id', )

router.post("/", createRoom);

router.put("/:id", updateRoom);

router.delete("/:id", hideRoom);

module.exports = router;
