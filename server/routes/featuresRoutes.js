const { getAllFeatures } = require("../controllers/featureController");
const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { tryCatch } = require("../middlewares/errorHandler");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const router = require("express").Router();

//router.post('/register', register);

router.get("/", authorizeAccessToken, tryCatch(getAllFeatures));

module.exports = router;
