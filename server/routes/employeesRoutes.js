// delete
const {
  getAllEmployees,
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployees,
  logout,
  getMyAccount
} = require("../controllers/employeeController.js");
const router = require("express").Router();

router.get("/", getAllEmployees);

router.get("/:id", getEmployees);

router.post("/", createEmployees);

router.get('/me', getMyAccount)

router.put("/:id", updateEmployees);

router.delete("/:id", deleteEmployees);

router.post('/me/logout', logout)

module.exports = router;
