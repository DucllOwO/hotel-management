const supabase = require("../database");

async function getAllRecords() {
  return supabase
    .from("purchase")
    .select(`
      id, 
      amount,
      item_id(name),
      total_cost,
      established_date
    `)
    .order("id", { ascending: true });
}
async function getRecordByID(filter) {
  const { data, error } = await supabase
    .from("purchase")
    .select()
    .eq("id", filter);
  return { data, error };
}
async function createNewRecord(newRecord) {
  const { data, error } = await supabase.from("purchase").insert({
    item_id: newRecord.item_id,
    amount: newRecord.amount,
    price: newRecord.price,
    total_cost: newRecord.total_cost,
    employee_id: newRecord.employee_id,
  });
  return { data, error };
}

module.exports = {
  getAllRecords,
  getRecordByID,
  createNewRecord,
};
