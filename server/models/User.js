import supabase from '../database'

class User{
    username;
    password;
    email;
    isAdmin;
    constructor(username, password)
    {
        this.username = username;
        this.password = password;
        
    }
    async getInformationFromDB(){
        const {data, error} = await supabase
        .from('Accounts')
        .select('email, is_admin')
        .eq('username', this.username);
        if(error)
        {
            console.log(error);
        }
        else
        {   
            this.email = data.email;
            this.isAdmin = data.is_admin;
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
        else if(data === this.password)
        {
            this.getInformationFromDB();
        }
        else{
            return;
        }
    }
}