// delete
const {
  getAllManager,
  getManager,
  createManager,
  updateManager,
  deleteManager,
} = require("../controllers/managerController.js");
const { verifyAdmin } = require("../middlewares/verifyAuthorization");
const router = require("express").Router();

-router.get("/", verifyAdmin, getAllManager);

router.get("/:id", verifyAdmin, getManager);

router.post("/", verifyAdmin, createManager);

router.put("/:id", verifyAdmin, updateManager);

router.delete("/:id", verifyAdmin, deleteManager);

module.exports = router;
