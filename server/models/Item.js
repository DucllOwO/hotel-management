class Item{
    #itemID;
    #itemName;
    #reserveAmount;
    constructor(newItem)
    {
        this.#itemID = newItem.id;
        this.#itemName = newItem.name;
        this.#reserveAmount = newItem.reserve_amount;
    }
    get itemID()
    {
        return this.itemID;
    }
    get itemName()
    {
        return this.itemName;
    }
    set itemName(newName)
    {
        this.itemName = newName;
    }
    get reserveAmount()
    {
        return this.reserveAmount;
    }
    set reserveAmount(newAmount)
    {
        this.reserveAmount = newAmount;
    }
}
module.exports = Item;