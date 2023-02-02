// hide
const {
  getAllRoomFeatures,
  getRoomFeature,
  createRoomFeature,
  updateRoomFeature,
  deleteRoomFeature,
} = require("../controllers/roomFeatureController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { tryCatch } = require("../middlewares/errorHandler");
const router = require("express").Router();

router.get("/", authorizeAccessToken, tryCatch(getAllRoomFeatures));

router.get("/:id", authorizeAccessToken, tryCatch(getRoomFeature));

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.ROOM_FEATURE),
  tryCatch(createRoomFeature)
);

router.put(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.ROOM_FEATURE),
  tryCatch(updateRoomFeature)
);

router.delete(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.DELETE, resourceAC.ROOM_FEATURE),
  tryCatch(deleteRoomFeature)
);

module.exports = router;
