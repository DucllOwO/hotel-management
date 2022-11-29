const {
    getAllReceipt,
    createReceipt,
  } = require("../controllers/receiptController");
  const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
  const { tryCatch } = require("../middlewares/errorHandler");
  const pagination = require("../middlewares/pagination");
  const { hasPermission } = require("../middlewares/roleAccessControl");
  const { actionAC, resourceAC } = require("../utils/constants");
  const permissionsRoutes = require("./permissionsRotues.js");
  const router = require("express").Router();
  


  
  router.get(
    "/",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.RECEIPT),
    pagination,
    tryCatch(getAllReceipt)
  );
  //router.get("/:id");
  //test ok
  router.post(
    "/",
    authorizeAccessToken,
    hasPermission(actionAC.CREATE, resourceAC.RECEIPT),
    tryCatch(createReceipt)
  );
  
  module.exports = router;
  