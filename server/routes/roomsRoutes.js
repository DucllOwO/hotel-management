// hide
const {
  getAllRoom,
  createRoom,
  updateRoom,
  hideRoom,
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

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.ROOM),
  tryCatch(createRoom)
);

router.put(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.ROOM),
  tryCatch(updateRoom)
);

router.delete(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.DELETE, resourceAC.ROOM),
  tryCatch(hideRoom)
);

module.exports = router;
