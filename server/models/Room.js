
class Room{
    constructor(newRoom)
    {
        this.#roomName = newRoom.roomName;
        this.#roomImage = newRoom.roomImage;
        this.#roomDescription = newRoom.roomDescription;
        this.#roomSize = newRoom.roomSize;
        this.#inUse = newRoom.inUse;
        this.#price = newRoom.price;
        this.#branch = newRoom.branch;
        this.#roomFeature = newRoom.roomFeature;
    }
    get roomName()
    {
        return this.roomName;
    }
    get roomImage()
    {
        return this.roomImage;
    }
    set roomImage(newImage)
    {
        this.roomImage = newImage;
    }
    get roomDescription()
    {
        return this.roomDescription;
    }
    set roomDescription(newDescription)
    {
        this.roomDescription = newDescription;
    }
    get roomSize()
    {
        return this.roomSize;
    }
    set roomSize(newSize)
    {
        this.roomSize = newSize;
    }
    get inUse()
    {
        return this.inUse;
    }
    set inUse(newState)
    {
        this.inUse = newState;
    }
    get price()
    {
        return this.price;
    }
    set price(newPrice)
    {
        this.price = newPrice;
    }
    get branch()
    {
        return this.branch;
    }
    set branch(newBranch)
    {
        this.branch = newBranch;
    }
    get roomFeature()
    {
        return this.roomFeature;
    }
    set roomFeature(newFeature)
    {
        this.roomFeature = newFeature;
    }
}