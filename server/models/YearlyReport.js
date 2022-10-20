class YearlyReport{
    #reportYear;
    #income;
    #outcome;
    #profit;
    #customerAmount;
    #bookingAmount;
    constructor(newReport)
    {
        this.#reportYear = newReport.year;
        this.#income = newReport.income;
        this.#outcome = newReport.outcome;
        this.#profit = newReport.profit;
        this.#customerAmount = newReport.customer_amount;
        this.#bookingAmount = newReport.booking_amount;
    }    
    get reportYear()
    {
        return this.reportYear;
    }
    get income()
    {
        return this.income;
    }
    set income(newAmount)
    {
        this.income = newAmount;
    }
    get outcome()
    {
        return this.outcome;
    }
    set outcome(newAmount)
    {
        this.outcome = newAmount;
    }
    get profit()
    {
        return this.profit;
    }
    set profit(newAmount)
    {
        this.profit = newAmount;
    }
    get customerAmount()
    {
        return this.customerAmount;
    }
    set customerAmount(newAmount)
    {
        this.customerAmount = newAmount;
    }
    get bookingAmount()
    {
        return this.bookingAmount;
    }
    set bookingAmount(newAmount)
    {
        this.bookingAmount = newAmount;
    }

}

module.exports = YearlyReport;