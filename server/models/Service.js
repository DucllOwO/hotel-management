class Service{
    #serviceID;
    #serviceName;
    #image;
    #description;
    #price;
    constructor(newService)
    {
        this.#serviceID = newService.id;
        this.#serviceName = newService.name;
        this.#image = newService.image;
        this.#description = newService.description;
        this.#price = newService.price
    }
    get serviceID()
    {
        return this.serviceID;
    }
    get serviceName()
    {
        return this.serviceName;
    }
    set serviceName(newName)
    {
        this.serviceName = newName;
    }
    get image()
    {
        return this.image;
    }
    set image(newImage)
    {
        this.image = newImage;
    }
    get description()
    {
        return this.description;
    }
    set description(newDescription)
    {
        this.description = newDescription;
    }
    get price()
    {
        return this.price;
    }
    set price(newPrice)
    {
        this.price = newPrice;
    }
}
module.exports = Service;