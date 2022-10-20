const { mode } = require("crypto-js");

class Account{
    #username;
    #password;
    #email;
    constructor(newAccount){
        this.#username = newAccount.username;
        this.#password = newAccount.password;
        this.#email = newAccount.email;
    }
    get username()
    {
        return this.#username;
    }
    set username(newUsername)
    {
        this.#username = newUsername;
    }
    get password()
    {
        return this.#password;
    }
    set password(newPassword)
    {
        this.#password = newPassword;
    }
    get email()
    {
        return this.#email;
    }
    set email(newEmail)
    {
        this.#email = newEmail;
    }
}

module.exports = Account;