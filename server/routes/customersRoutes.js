const{
    getAllCustomer,
    createCustomer,
    updateInformation
} = require("../controllers/customerController");


const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();

router.get("/", 
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.CUSTOMER),
    getAllCustomer
);

router.post("/",
    authorizeAccessToken,
    hasPermission(actionAC.CREATE, resourceAC.CUSTOMER),
    createCustomer
);

router.put("/:id",
    authorizeAccessToken,
    hasPermission(actionAC.UPDATE, resourceAC.CUSTOMER),
    updateInformation
);

module.exports = router;