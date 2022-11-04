const supabase = require('../database');

async function getAccountByUsername(username)
{
    const {data, error} = await supabase
    .from('account')
    .select('*')
        .eq('username', username)
    console.log(`${data} + ${error}`)
    return { user: data[0] , error };
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
        return newAccount[0];
    }
}

module.exports = {
    getAccountByUsername,
    getAccountByEmail
};