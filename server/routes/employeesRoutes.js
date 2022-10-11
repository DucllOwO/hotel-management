// delete
const {
  getAllEmployees,
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployees,
} = require("../controllers/employeeController.js");
const { verifyManager } = require('../middlewares/verify')
const router = require("express").Router();

router.get("/", verifyManager, getAllEmployees);

router.get("/:id", verifyManager, getEmployees);

router.post("/", verifyManager, createEmployees);

router.put("/:id", verifyManager, updateEmployees);

router.delete("/:id", verifyManager, deleteEmployees);

module.exports = router;
