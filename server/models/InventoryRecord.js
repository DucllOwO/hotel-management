class InventoryRecord{
    #recordID;
    #recordDate;
    #employee;
    #invoiceID;
    #room;
    #item;
    #amount;
    constructor(newRecord)
    {
        this.#recordID = newRecord.id;
        this.#recordDate = newRecord.date;
        this.#employee = newRecord.employee_id;
        this.#invoiceID = newRecord.invoice_id;
        this.#room = newRecord.room_name;
        this.#item = newRecord.item_id;
        this.#amount = newRecord.amount;
    }
    get recordID()
    {
        return this.recordID;
    }
    get recordDate()
    {
        return this.recordDate;
    }
    get employee()
    {
        return this.employee;
    }
    set employee(newEmployee)
    {
        this.employee = newEmployee;
    }
    get invoiceID()
    {
        return this.invoiceID;
    }
    set invoiceID(newID)
    {
        this.invoiceID = newID;
    }
    get room()
    {
        return this.room;
    }
    set room(newRoom)
    {
        this.room = newRoom;
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
        this.amount = newAmount
    }
}

module.exports = InventoryRecord;