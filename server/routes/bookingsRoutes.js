

const router = require('express').Router();

// all employee, manager, admin can get booking
router.get("/", verifyEmployee, getAllBookings);

router.get("/:id", verifyEmployee, getBooking);

router.get('/:username', verifyToken, getCustomerBooking)

router.post('/', verifyToken, createBooking);

router.delete('/:id', verifyEmployee, deleteBooking);

