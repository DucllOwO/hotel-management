class Position{
    constructor(newPosition)
    {
        this.#positionID = newPosition.id;
        this.#positionName = newPosition.name;
        this.#feature = null;
    }

    get positionID()
    {
        return this.positionID;
    }
    get positionName()
    {
        return this.positionName;
    }
    set positionName(newName)
    {
        this.positionName = newName;
    }
    get feature()
    {
        return this.feature;
    }
    set feature(newFeature)
    {
        this.feature = newFeature;
    }
}