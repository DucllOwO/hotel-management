const supabase = require("../database");
const Invoice = require('./Invoice')

class Booking
{
    bookingID;
    bookFrom;
    bookTo;
    deposit;
    status;
    voucher;
    customer;
    room;

    async cancelBooking()
    {
        const {data, error} = await supabase
        .from('Booking')
        .update({Status : 0})
        .eq('Booking_id', this.bookingID);
        if(error)
        {
            console.log(error);
        }
    }
    checkIn(){
        const newInvoice = new Invoice();
    }
}