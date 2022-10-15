const supabase = require("../database");


class Invoice{
    
    constructor(newInvoice){
        this.#invoiceID = newInvoice.invoiceID;
        this.#establishedDate = newInvoice.establishedDate;
        this.#paymentMethod = newInvoice.paymentMethod;
        this.#bookingMethod = newInvoice.bookingMethod;
        this.#totalCost = newInvoice.totalCost
        this.#checkInTime = newInvoice.checkInTime;
        this.#checkOutTime = newInvoice.checkOutTime;
        this.#surcharge = newInvoice.surcharge;
        this.#note = newInvoice.note;
        this.#employee = newInvoice.employee
    }
    get invoiceID()
    {
        return this.invoiceID
    }
    get establishedDate()
    {
        return this.establishedDate;
    }
    set establishedDate(newDate)
    {
        this.establishedDate = newDate;
    }
    get paymentMethod()
    {
        return this.paymentMethod;
    }
    set paymentMethod(newMethod)
    {
        this.paymentMethod = newMethod;
    }
    get bookingMethod()
    {
        return this.bookingMethod;
    }
    set bookingMethod(newMethod)
    {
        this.bookingMethod = newMethod;
    }
    get totalCost()
    {
        return this.totalCost;
    }
    set totalCost(newCost)
    {
        this.totalCost = newCost;
    }
    get checkInTime()
    {
        return this.checkInTime;
    }
    set checkInTime(newTimestamp)
    {
        this.checkInTime = newTimestamp;
    }
    get checkOutTime()
    {
        return this.checkOutTime;
    }
    set checkOutTime(newTimestamp)
    {
        this.checkOutTime = newTimestamp;
    }
    get surcharge()
    {
        return this.surcharge;
    }
    set surcharge(newSurcharge)
    {
        this.surcharge = newSurcharge;
    }
    get note()
    {
        return this.note;
    }
    set note(newNote)
    {
        this.note = newNote;
    }
    get employee()
    {
        return this.employee;
    }
    set employee(newEmployee)
    {
        this.employee = newEmployee;
    }
}