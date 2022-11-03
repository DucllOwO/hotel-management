const{
    getAllPayment,
    getPaymentByID,
    createNewPayment
} = require("../controllers/paymentController");
const { createNewCustomer } = require("../DAL/customerDAL");


const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();

router.get("/", 
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    getAllPayment
);
router.get("/:id",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    getPaymentByID
);
router.post("/",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    createNewPayment
);

module.exports = router;