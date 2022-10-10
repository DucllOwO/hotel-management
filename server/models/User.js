import supabase from '../database'

class User{
    username;
    password;
    email;
    isAdmin;
    constructor(username, password, isAdmin = false)
    {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.getEmailFromDB();
    }
    async getEmailFromDB(){
        const {data, error} = await supabase
        .from('Accounts')
        .select('email')
        .eq('username', this.username);
        if(error)
        {
            console.log(error);
        }
        else
        {   
            this.email = data;
        }
    }
    async login(){
        const {data, error} = await supabase
        .from('accounts')
        .select('password')
        .eq('username', username);
        if(error)
        {
            console.log(error);
        }
        else return;
    }
}