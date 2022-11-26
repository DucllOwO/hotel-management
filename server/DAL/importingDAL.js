const supabase = require("../database");

function getAllRecords(from, to) {
  return supabase
    .from("purchase")
    .select("*")
    .order("id", { ascending: true })
    .range(from, to);
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
}

module.exports = {
  getAllRecords,
  getRecordByID,
  createNewRecord,
};
