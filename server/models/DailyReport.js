class DailyReport{
    #reportDate;
    #income;
    #outcome;
    #profit;
    #customerAmount;
    #bookingAmount;
    #reportMonth;
    constructor(newReport)
    {
        this.#reportDate = newReport.date;
        this.#income = newReport.income;
        this.#outcome = newReport.outcome;
        this.#profit = newReport.profit;
        this.#customerAmount = newReport.customer_amount;
        this.#bookingAmount = newReport.booking_amount;
        this.#reportMonth = newReport.report_month;
    }    
    get reportDate()
    {
        return this.reportDate;
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
    get reportMonth()
    {
        return this.reportMonth;
    }
    set reportMonth(newReport)
    {
        this.reportMonth = newReport;
    }
}
module.exports = DailyReport;