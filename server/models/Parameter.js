

class Parameter{
    #parameterID;
    #parameterName;
    #parameterValue;
    constructor(newParameter){
        this.#parameterID = newParameter.id;
        this.#parameterName = newParameter.name;
        this.#parameterValue = newParameter.value;
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
module.exports = Parameter;