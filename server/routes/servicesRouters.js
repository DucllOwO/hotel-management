const {
    getAll,
    createService,
    updateService
  } = require("../controllers/serviceController.js");

  const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
  const { hasPermission } = require("../middlewares/roleAccessControl");
  const { actionAC, resourceAC } = require("../utils/constants");
  const { tryCatch } = require("../middlewares/errorHandler");
  const router = require("express").Router();

  router.get(
    "/",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.SERVICE),
    getAll
  )

  router.post(
    "/",
    authorizeAccessToken,
    hasPermission(actionAC.CREATE, resourceAC.SERVICE),
    createService
  )

  router.put(
    "/:id",
    authorizeAccessToken,
    hasPermission(actionAC.UPDATE, resourceAC.SERVICE),
    updateService
  )