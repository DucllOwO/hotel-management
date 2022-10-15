

class HotelRoom{
    constructor(newRoom)
    {
        this.#roomTypeID = newRoom.roomTypeID;
        this.#roomTypeName = newRoom.roomTypeName;
        this.#maxCustomer = newRoom.maxCustomer;
        this.#bedAmount = newRoom.bedAmount;
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