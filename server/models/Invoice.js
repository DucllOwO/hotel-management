

class Invoice{
    invoiceID;
    establishedDate;
    paymentMethod;
    bookingMethod;
    totalCost;
    checkInTime;
    checkOutTime;
    surcharge;
    note;
    employee;

    constructor(newPaymentMethod, newBookingMethod, ){
        this.establishedDate = Date.now;
        this.checkInTime = Date.now;

    }
    
    checkOut(){
        this.checkOutTime = Date.now;
    }
}