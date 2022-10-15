


class Branch{
    constructor(newBranch)
    {
        this.#branchID = newBranch.branchID;
        this.#branchAddress = newBranch.branchAddress;
        this.#branchName = newBranch.branchName;
        this.#branchRating = newBranch.branchRating;
    }
    get branchID()
    {
        return this.branchID;
    }
    set branchID(newBranchID)
    {
        this.branchID = newBranchID;
    }
    get branchAddress()
    {
        return this.branchAddress;
    }
    set branchAddress(newBranchAddress)
    {
        this.branchAddress = newBranchAddress;
    }
    get branchName()
    {
        return this.branchName;
    }
    set branchName(newBranchName)
    {
        this.branchName = newBranchName;
    }
    get branchRating()
    {
        return this.branchRating;
    }
    set branchRating(newBranchRating)
    {
        this.branchRating = newBranchRating;
    }
}