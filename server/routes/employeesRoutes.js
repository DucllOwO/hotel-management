// delete
const {
  getAllEmployees,
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployees,
} = require("../controllers/employeeController.js");
const router = require("express").Router();

router.get("/", getAllEmployees);

router.get("/:id", getEmployees);

router.post("/", createEmployees);

router.put("/:id", updateEmployees);

router.delete("/:id", deleteEmployees);

module.exports = router;
