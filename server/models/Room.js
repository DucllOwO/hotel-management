
class Room{
    constructor(newRoom)
    {
        this.#roomName = newRoom.roomName;
        this.#roomImage = newRoom.image;
        this.#roomDescription = newRoom.description;
        this.#roomSize = newRoom.size;
        this.#status = newRoom.status;
        this.#price = newRoom.price;
        this.#roomType = newRoom.room_type_id;
        this.#roomFeature = null;
        this.#isActive = newRoom.is_active
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
    get status()
    {
        return this.status;
    }
    set status(newState)
    {
        this.status = newState;
    }
    get price()
    {
        return this.price;
    }
    set price(newPrice)
    {
        this.price = newPrice;
    }
    get roomType()
    {
        return this.roomType;
    }
    set roomType(newType)
    {
        this.roomType = newType;
    }
    get roomFeature()
    {
        return this.roomFeature;
    }
    set roomFeature(newFeature)
    {
        this.roomFeature = newFeature;
    }
    get isActive()
    {
        return this.isActive;
    }
    set isActive(newState)
    {
        this.isActive = newState;
    }
}