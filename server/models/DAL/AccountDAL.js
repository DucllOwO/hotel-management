const supabase = require('../../database');
const Account = require('../Account');

async function getAccountByUsername(username)
{
    const {data, error} = await supabase
    .from('account')
    .select('*')
    .eq('username', username)
    if(error)
    {
        console.log(error);
        return null;
    }
    else{
        console.log(data);
        const newAccount = new Account(data[0]);
        console.log(newAccount);
        console.log(newAccount.password);
        return newAccount;
    }
}
async function getAccountByEmail(email)
{
    const {data, error} = await supabase
    .from('account')
    .select('*')
    .eq('email', email)
    if(error)
    {
        console.log(error);
        return null;
    }
    else
    {
        const newAccount = new Account(data[0]);
        return newAccount;
    }
}

module.exports = {
    getAccountByUsername,
    getAccountByEmail
};