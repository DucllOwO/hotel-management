

class HotelRoom{
    #roomTypeID;
    #roomTypeName;
    #maxCustomer;
    #bedAmount;
    constructor(newRoom)
    {
        this.#roomTypeID = newRoom.id;
        this.#roomTypeName = newRoom.name;
        this.#maxCustomer = newRoom.max_customer;
        this.#bedAmount = newRoom.bed_amount;
    }
    get roomTypeID()
    {
        return this.roomTypeID;
    }
    get roomTypeName()
    {
        return this.roomTypeName;
    }
    set roomTypeName(newName)
    {
        this.roomTypeName = newName;
    }
    get maxCustomer()
    {
        return this.maxCustomer;
    }
    set maxCustomer(newAmount)
    {
        this.maxCustomer = newAmount;
    }
    get bedAmount()
    {
        return this.bedAmount;
    }
    set bedAmount(newAmount)
    {
        this.bedAmount = newAmount;
    }
}

module.exports = HotelRoom;