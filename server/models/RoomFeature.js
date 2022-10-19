
class RoomFeature{
    
    constructor(newFeature)
    {
        this.#roomFeatureID = newFeature.id;
        this.#roomFeatureName = newFeature.name;
        this.#roomFeatureIcon = newFeature.icon;
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