class Purchase{
    #id;
    #item;
    #amount;
    #price;
    #totalCost;
    #employee
    constructor(newPurchase)
    {
        this.#id = newPurchase.id;
        this.#item = newPurchase.item_id;
        this.#amount = newPurchase.amount;
        this.#price = newPurchase.price;
        this.#totalCost = newPurchase.total_cost;
        this.#employee = newPurchase.employee_id;
    }
    get id()
    {
        return this.id;
    }
    get item()
    {
        return this.item;
    }
    set item(newItem)
    {
        this.item = newItem;
    }
    get amount()
    {
        return this.amount;
    }
    set amount(newAmount)
    {
        this.amount = newAmount;
    }
    get price()
    {
        return this.price;
    }
    set price(newPrice)
    {
        this.price = newPrice;
    }
    get totalCost()
    {
        return this.totalCost;
    }
    set totalCost(newCost)
    {
        this.totalCost = newCost;
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
module.exports = Purchase;