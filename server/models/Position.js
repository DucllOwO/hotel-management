class Position{
    constructor(newPosition)
    {
        this.#positionID = newPosition.positionID;
        this.#positionName = newPosition.positionName;
        this.#branch = newPosition.branch;
        this.#feature = newPosition.feature;
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
    get branch()
    {
        return this.branch;
    }
    set branch(newBranch)
    {
        this.branch = newBranch;
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