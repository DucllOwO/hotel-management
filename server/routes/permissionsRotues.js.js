const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { tryCatch } = require("../middlewares/errorHandler.js");
const { actionAC, resourceAC } = require("../utils/constants");
const { getAllPermission } = require("../controllers/permissionController");
const router = require("express").Router();

router.get(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.GET, resourceAC.PERMISSION),
  tryCatch(getAllPermission)
);

// //can update multi permission at one time
// router.put(
//   "/",
//   authorizeAccessToken,
//   hasPermission(actionAC.UPDATE, resourceAC.PERMISSION),
//   updatePermission
// );

// router.post(
//   "/",
//   authorizeAccessToken,
//   hasPermission(actionAC.CREATE, resourceAC.PERMISSION),
//   createPermission
// );

// router.delete(
//   "/:id",
//   authorizeAccessToken,
//   hasPermission(actionAC.DELETE, resourceAC.PERMISSION),
//   deletePermission
// );

module.exports = router;
