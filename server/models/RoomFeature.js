
class RoomFeature{
    
    constructor(newFeature)
    {
        this.#roomFeatureID = newFeature.roomFeatureID;
        this.#roomFeatureName = newFeature.roomFeatureName;
        this.#roomFeatureIcon = newFeature.roomFeatureIcon;
    }
    get roomFeatureID()
    {
        return this.roomFeatureID;
    }
    get roomFeatureName()
    {
        return this.roomFeatureName;
    }
    set roomFeatureName(newName)
    {
        this.roomFeatureName = newName;
    }
    get roomFeatureIcon()
    {
        return this.roomFeatureIcon;
    }
    set roomFeatureIcon(newIcon)
    {
        this.roomFeatureIcon = newIcon;
    }
}