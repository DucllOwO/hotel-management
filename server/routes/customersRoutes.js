const{
    getAllCustomer,
    createNewCustomer,
    updateCustomerInformation
} = require("../controllers/customerController");
const { createNewCustomer } = require("../DAL/customerDAL");


const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();

router.get("/", 
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    getAllCustomer
);

router.post("/",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    createNewCustomer
);

router.put("/:id",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    updateCustomerInformation
);

module.exports = router;