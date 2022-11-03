const supabase = require('../database');

async function getAllBooking()
{
    const {data, error}= await supabase
    .from('booking')
    .select('*')
    if(error)
    {
        console.log(error);
        return null;
    }
    else
    {
        console.log(listBooking);
        return listBooking;
    }
}

module.exports = {
    getAllBooking
}