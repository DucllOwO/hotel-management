const {
  getRoomFeatures,
  createRoomFeatures,
  updateHasRoomFeature,
} = require("../controllers/hasRoomController");
const { tryCatch } = require("../middlewares/errorHandler");

const router = require("express").Router();

router.get("/:roomTypeID", tryCatch(getRoomFeatures));

router.post("/", tryCatch(createRoomFeatures));

router.put("/", tryCatch(updateHasRoomFeature));

module.exports = router;
