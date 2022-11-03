const{
    getAllRecord,
    getRecordByID,
    createNewRecord
} = require("../controllers/importingController");
const { createNewCustomer } = require("../DAL/customerDAL");


const authorizeAccessToken = require("../middlewares/authorizeAccessToken");
const { hasPermission } = require("../middlewares/roleAccessControl");
const { actionAC, resourceAC } = require("../utils/constants");
const { route } = require("./bookingsRoutes");
const router = require("express").Router();


router.get("/", 
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    getAllRecord
);
router.get("/:id",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    getRecordByID
);
router.post("/",
    authorizeAccessToken,
    hasPermission(actionAC.GET, resourceAC.BOOKING),
    createNewRecord
);

module.exports = router;