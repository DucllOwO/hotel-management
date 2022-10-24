// hide
const {
  getAllRoomFeatures,
  getRoomFeature,
  createRoomFeature,
  updateRoomFeature,
  hideRoomFeature,
} = require("../controllers/roomFeatureController");
const router = require("express").Router();

router.get("/", getAllRoomFeatures);

router.get("/:id", getRoomFeature);

router.post("/", createRoomFeature);

router.put("/:id", updateRoomFeature);

router.delete("/:id", hideRoomFeature);

module.exports = router;
