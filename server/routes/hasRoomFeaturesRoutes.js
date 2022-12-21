const { getRoomFeatures } = require("../controllers/hasRoomController");
const { tryCatch } = require("../middlewares/errorHandler");

const router = require("express").Router();

router.get("/:roomTypeID", tryCatch(getRoomFeatures));

module.exports = router;
