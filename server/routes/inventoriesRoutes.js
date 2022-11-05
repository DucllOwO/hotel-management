const{
} = require("../controllers/inventoryController");

const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();

router.get(
    "/",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.INVENTORY),
    
)