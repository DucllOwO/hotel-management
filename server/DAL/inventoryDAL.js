const supabase = require("../database");

async function getAllInventories()
{
    const {data, error} =  await supabase
    .from('inventory')
    .select()
    return {data, error};
}

module.exports = {
    getAllInventories
}