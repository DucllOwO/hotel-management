// delete
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getEmployeeByUsername,
} = require("../controllers/userController.js");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { tryCatch } = require("../middlewares/errorHandler");
const router = require("express").Router();

router.get("/", authorizeAccessToken, tryCatch(getAllUsers));

router.get("/:id", authorizeAccessToken, tryCatch(getUser));

router.get(
  "/employee/:username",
  authorizeAccessToken,
  tryCatch(getEmployeeByUsername)
);

// router.get(
//   "/me",
//   authorizeAccessToken,
//   hasPermission(actionAC.GET, resourceAC.USER),
//   tryCatch(getMyAccount)
// );

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.USER),
  tryCatch(createUser)
);

router.put(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.USER),
  tryCatch(updateUser)
);

router.delete(
  "/:id",
  authorizeAccessToken,
  hasPermission(actionAC.DELETE, resourceAC.USER),
  tryCatch(deleteUser)
);

// router.post(
//   "/me/logout",
//   authorizeAccessToken,
//   hasPermission(actionAC.CREATE, resourceAC.USER),
//   tryCatch(logout)
// );

module.exports = router;
