
class MonthlyReport{
    #reportMonth;
    #income;
    #outcome;
    #profit;
    #customerAmount;
    #bookingAmount;
    #reportYear;
    constructor(newReport)
    {
        this.#reportMonth = newReport.month;
        this.#income = newReport.income;
        this.#outcome = newReport.outcome;
        this.#profit = newReport.profit;
        this.#customerAmount = newReport.customer_amount;
        this.#bookingAmount = newReport.booking_amount;
        this.#reportYear = newReport.report_year;
    }
    get reportMonth()
    {
        return this.reportMonth;
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
    get reportYear()
    {
        return this.reportYear;
    }
    set reportYear(newReport)
    {
        this.reportYear = newReport;
    }
}

module.exports = MonthlyReport;