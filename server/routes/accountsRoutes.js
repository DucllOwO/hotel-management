// husernamee
const {
  getAllAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { tryCatch } = require("../middlewares/errorHandler");
const router = require("express").Router();

router.get("/", authorizeAccessToken, tryCatch(getAllAccounts));

router.get("/:username", authorizeAccessToken, tryCatch(getAccount));

router.post(
  "/",
  authorizeAccessToken,
  hasPermission(actionAC.CREATE, resourceAC.ACCOUNT),
  tryCatch(createAccount)
);

router.put(
  "/:username",
  authorizeAccessToken,
  hasPermission(actionAC.UPDATE, resourceAC.ACCOUNT),
  tryCatch(updateAccount)
);

router.delete(
  "/:username",
  authorizeAccessToken,
  hasPermission(actionAC.DELETE, resourceAC.ACCOUNT),
  tryCatch(deleteAccount)
);

module.exports = router;
