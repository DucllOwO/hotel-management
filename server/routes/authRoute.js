const { login, forgotPassword } = require("../controllers/authController");
const { tryCatch } = require("../middlewares/errorHandler");
const router = require("express").Router();

//router.post('/register', register);

router.post("/login", tryCatch(login));

router.post("/forgotpassword", forgotPassword);

module.exports = router;
