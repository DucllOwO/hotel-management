const { getItems } = require("../controllers/usedRoomController");
const { tryCatch } = require("../middlewares/errorHandler");

const router = require("express").Router();

router.get("/:bookingID", tryCatch(getItems));

module.exports = router;
