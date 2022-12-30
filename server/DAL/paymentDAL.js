const supabase = require("../database");

function getAllPayments() {
  return supabase.from("payment").select().order("id", { ascending: true });
}

async function getPaymentByID(id) {
  const { data, error } = await supabase.from("payment").select().eq("id", id);
  return { data, error };
}
function createNewPayment(newPayment) {
  return supabase.from("payment").insert({
    name: newPayment.name,
    total_cost: newPayment.total_cost,
    established_date: newPayment.established_date,
  });
}

module.exports = {
  getAllPayments,
  getPaymentByID,
  createNewPayment,
};
