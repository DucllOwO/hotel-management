

class Parameter{
    constructor(newParameter){
        this.#parameterID = newParameter.parameterID;
        this.#parameterName = newParameter.parameter.Name;
        this.#parameterValue = newParameter.parameterValue;
    }
    get parameterID()
    {
        return this.parameterID;
    }
    get parameterName()
    {
        return this.parameterName;
    }
    set parameterName(newName)
    {
        this.parameterName = newName;
    }
    get parameterValue()
    {
        return this.parameterValue;
    }
    set parameterValue(newValue)
    {
        this.parameterValue = newValue;
    }
}