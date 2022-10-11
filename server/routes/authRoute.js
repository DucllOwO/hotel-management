const { login, register, forgotPassword } = require('../controllers/authController')
const router = require("express").Router();


router.post('/register', register);

router.post('/login', login)

router.post('/forgotpassword', forgotPassword)

module.exports = router

