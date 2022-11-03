const{
    getAllPayment,
    getByID,
    createPayment
} = require("../controllers/paymentController");


const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();

router.get("/", 
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.PAYMENT),
    getAllPayment
);
router.get("/:id",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.PAYMENT),
    getByID
);
router.post("/",
    authorizeAccessToken,
    hasPermission(actionAC.CREATE, resourceAC.PAYMENT),
    createPayment
);

module.exports = router;