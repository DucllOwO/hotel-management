const supabase = require("../database");
const Invoice = require('./Invoice')

class Booking
{
    constructor(newBooking)
    {
        this.#id = newBooking.id;
        this.#bookFrom = newBooking.book_from;
        this.#bookTo = newBooking.book_to;
        this.#deposit = newBooking.deposit;
        this.#status = newBooking.status;
        this.#voucher = newBooking.voucher_id;
        this.#customer = newBooking.customer_id;
        this.#room = null;
    }
    get bookingID()
    {
        return this.bookingID;
    }
    set bookingID(newBookingID)
    {
        this.bookingID = newBookingID;
    }
    get bookFrom()
    {
        return this.bookFrom;
    }
    set bookFrom(newDate)
    {
        this.bookFrom = newDate;
    }
    get bookTo()
    {
        return this.bookTo;
    }
    set bookTo(newDate)
    {
        this.bookTo = newDate;
    }
    get deposit()
    {
        return this.deposit;
    }
    set deposit(newDeposit)
    {
        this.deposit = newDeposit;
    }
    get status()
    {
        return this.status;
    }
    set status(newStatus)
    {
        this.status = newStatus;
    }
    get voucher()
    {
        return this.voucher;
    }
    set voucher(newVoucher)
    {
        this.voucher = newVoucher;
    }
    get customer()
    {
        return this.customer;
    }
    set customer(newCustomer)
    {
        this.customer = newCustomer;
    }
    get room()
    {
        return this.room;
    }
    set room(newRoom)
    {
        this.room = newRoom;
    }
}