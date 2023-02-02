const supabase = require("../database");
const dayjs = require("dayjs");

function getAllRecords() {
  return supabase
    .from("purchase")
    .select(
      `
      id, 
      total_cost,
      established_date,
      employee_id (fullname)
    `
    )
    .order("id", { ascending: true });
}

const getPurchaseDetail = (purchaseID) => {
  return supabase
    .from("purchase_detail")
    .select(
      `
      item_id (
        id, name
      ),
      amount,
      unit_price
  `
    )
    .eq("purchase_id", purchaseID);
};

async function getRecordByID(filter) {
  const { data, error } = await supabase
    .from("purchase")
    .select()
    .eq("id", filter);
  return { data, error };
}
function createNewRecord(newRecord) {
  return supabase
    .from("purchase")
    .insert({
      total_cost: newRecord.total_cost,
      employee_id: newRecord.employee_id,
      established_date: dayjs(Date.now()),
    })
    .select(
      `
      id, 
      total_cost,
      established_date,
      employee_id (fullname)
    `
    );
}

module.exports = {
  getAllRecords,
  getRecordByID,
  createNewRecord,
  getPurchaseDetail,
};
