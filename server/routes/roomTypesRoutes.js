const {
  getAll,
  getByID,
  createType,
  updateInformation,
  hideType,
} = require("../controllers/roomTypeController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();
const { tryCatch } = require("../middlewares/errorHandler");

router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.ROOMTYPE),
  tryCatch(getAll)
);

router.get(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.ROOMTYPE),
  tryCatch(getByID)
);

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.ROOMTYPE),
  tryCatch(createType)
);

router.put(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.ROOMTYPE),
  tryCatch(updateInformation)
);

module.exports = router;