// hide
const {
  getAllRoomFeatures,
  getRoomFeature,
  createRoomFeature,
  updateRoomFeature,
  hideRoomFeature,
} = require("../controllers/roomFeatureController");
const { verifyManager } = require("../middlewares/verifyAuthorization");
const router = require("express").Router();

router.get("/", getAllRoomFeatures);

router.get("/:id", getRoomFeature);

router.post("/", verifyManager, createRoomFeature);

router.put("/:id", verifyManager, updateRoomFeature);

router.delete("/:id", verifyManager, hideRoomFeature);

module.exports = router;
