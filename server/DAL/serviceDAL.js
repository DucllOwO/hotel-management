const supabase = require('../database');

async function getAllService()
{
    const {data, error} = await supabase
    .from('service')
    .select('*');
    return {data, error};
}

async function createNewService(newService)
{
    const {data, error} = await supabase
    .from('service')
    .insert(newService);
    return {data, error};
}

async function updateService(id, newService)
{
    const {data, error} = await supabase
    .from('service')
    .update({
        ...newService
    })
    .eq('id', id);
    return {data, error};
}

module.exports = {
    getAllService,
    createNewService,
    updateService
}