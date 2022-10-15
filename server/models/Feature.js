
class Feature{
    constructor(newFeature)
    {
        this.#featureID = newFeature.featureID;
        this.#featureName = newFeature.featureName;
        this.#description = newFeature.description;
    }
    get featureID()
    {
        return this.featureID;
    }
    get featureName()
    {
        return this.featureName;
    }
    set featureName(newName)
    {
        this.featureName = newName;
    }
    get description()
    {
        return this.description;
    }
    set description(newDescription)
    {
        this.description = newDescription;
    }
}