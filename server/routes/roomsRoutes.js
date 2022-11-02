// hide
const {
  getAllRoom,
  createRoom,
  updateRoom,
  getRoom,
} = require("../controllers/roomController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { tryCatch } = require("../middlewares/errorHandler");
const router = require("express").Router();

// only manager need to get all room feature to edit
router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.ROOM),
  tryCatch(getAllRoom)
);
router.get(
  "/:room_name",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.ROOM),
  tryCatch(getRoom)
);

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.ROOM),
  tryCatch(createRoom)
);

router.put(
  "/:room_name",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.ROOM),
  tryCatch(updateRoom)
);

// router.delete(
//   "/:room_name",
//   authorizeAccessToken,
//   hasPermission(actionAC.DELETE, resourceAC.ROOM),
//   tryCatch(hideRoom)
// );

module.exports = router;
