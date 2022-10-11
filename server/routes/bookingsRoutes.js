const { getAllBookings, getBooking, createBooking, deleteBooking } = require('../controllers/bookingController')
const {verifyEmployee, verifyToken} = require('../middlewares/verify')
const router = require('express').Router();

// all employee, manager, admin can get booking
router.get("/", verifyEmployee, getAllBookings);

router.get("/:id", verifyEmployee, getBooking);

router.post('/', verifyToken, createBooking);

router.delete('/:id', verifyEmployee, deleteBooking);

module.exports = router;