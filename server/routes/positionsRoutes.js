const {
  getAllPosition,
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
} = require("../controllers/positionController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { tryCatch } = require("../middlewares/errorHandler");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const permissionsRoutes = require("./permissionsRotues.js");
const router = require("express").Router();

// create router to manage feature when display position
router.use("/:id/permissions", permissionsRoutes);

// test ok
router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.POSITION),
  tryCatch(getAllPosition)
);

router.get(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.POSITION),
  tryCatch(getPosition)
);

//test ok
router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.POSITION),
  tryCatch(createPosition)
);
// test ok
router.put(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.POSITION),
  tryCatch(updatePosition)
);

// test OK
router.delete(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.DELETE, resourceAC.POSITION),
  tryCatch(deletePosition)
);

module.exports = router;
