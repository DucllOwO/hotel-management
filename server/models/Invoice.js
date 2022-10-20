const supabase = require("../database");


class Invoice{
    #invoiceID;
    #establishedDate;
    #paymentMethod;
    #checkInTime;
    #checkOutTime;
    #rentCost;
    #serviceCost;
    #surcharge;
    #totalCost;
    #note;
    #booking;
    #employee;
    #employeeName;
    constructor(newInvoice){
        this.#invoiceID = newInvoice.id;
        this.#establishedDate = newInvoice.established_date;
        this.#paymentMethod = newInvoice.payment_method;
        this.#checkInTime = newInvoice.checkin_time;
        this.#checkOutTime = newInvoice.checkout_time;
        this.#rentCost = newInvoice.rent_cost;
        this.#serviceCost = newInvoice.service_cost;
        this.#surcharge = newInvoice.surcharge;
        this.#totalCost = newInvoice.total_cost
        this.#note = newInvoice.note;
        this.#booking = newInvoice.booking_id;
        this.#employee = newInvoice.employee_id;
        this.#employeeName = newInvoice.employee_name;
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
    get rent_cost()
    {
        return this.rent_cost;
    }
    set rent_cost(newCost)
    {
        this.rent_cost = newCost;
    }
    get service_cost()
    {
        return this.service_cost;
    }
    set service_cost(newCost)
    {
        this.service_cost = newCost;
    }
    get surcharge()
    {
        return this.surcharge;
    }
    set surcharge(newSurcharge)
    {
        this.surcharge = newSurcharge;
    }
    get totalCost()
    {
        return this.totalCost;
    }
    set totalCost(newCost)
    {
        this.totalCost = newCost;
    }
    get note()
    {
        return this.note;
    }
    set note(newNote)
    {
        this.note = newNote;
    }
    get booking()
    {
        return this.booking;
    }
    set booking(newBooking)
    {
        this.booking = newBooking;
    }
    get employee()
    {
        return this.employee;
    }
    set employee(newEmployee)
    {
        this.employee = newEmployee;
    }
    get employeeName()
    {
        return this.employeeName;
    }
    set employeeName(newName)
    {
        this.employeeName = newName;
    }
}

module.exports = Invoice;