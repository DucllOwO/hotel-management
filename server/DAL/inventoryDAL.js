const supabase = require("../database");

async function getAllInventory()
{
    const {data, error} =  await supabase
    .from('inventory')
    .select()
    return {data, error};
}

module.exports = {
    getAllInventory
}