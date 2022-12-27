const supabase = require("../database");

async function getAllInventories()
{
    const {data, error} =  await supabase
    .from('inventory')
    .select()
    return {data, error};
}

async function createNewRecord(newRecord)
{
    const{data, error} = await supabase
    .from('inventory')
    .insert({
        ...newRecord
    });
    return {data, error};
}

module.exports = {
    getAllInventories,
    createNewRecord
}