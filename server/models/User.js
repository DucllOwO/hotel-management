import supabase from '../database'

class User{
    constructor(newUser)
    {
        this.#username = newUser.username;
        this.#password = newUser.password;
        this.#email = newUser.email;
        this.#isAdmin = newUser.isAdmin;
        
    }
    get username()
    {
        return this.username;
    }
    set username(newUsername)
    {
        this.username = newUsername;
    }
    get password()
    {
        return this.password;
    }
    set password(newPassword)
    {
        this.password = newPassword;
    }
    get email()
    {
        return this.email;
    }
    set email(newEmail)
    {
        this.email = newEmail;
    }

}