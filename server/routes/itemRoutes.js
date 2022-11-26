const {
    getAllItem,
    getByID,
    createItem,
  } = require("../controllers/itemController");
  
  const pagination = require("../middlewares/pagination");
  const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
  const { hasPermission } = require("../middlewares/roleAccessControl");
  const { actionAC, resourceAC } = require("../utils/constants");
  const router = require("express").Router();
  
  router.get(
    "/",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.ITEM),
    pagination,
    getAllItem
  );
  router.get(
    "/:id",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.ITEM),
    getByID
  );
  router.post(
    "/",
    authorizeAccessToken,
    hasPermission(actionAC.CREATE, resourceAC.ITEM),
    createItem
  );
  
  module.exports = router;
  