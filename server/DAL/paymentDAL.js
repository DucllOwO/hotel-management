const supabase = require("../database");

function getAllPayments(from, to) {
  return supabase
    .from("payment")
    .select()
    .order("id", { ascending: true })
    .range(from, to);
}

async function getPaymentByID(id) {
  const { data, error } = await supabase.from("payment").select().eq("id", id);
  return { data, error };
}
async function createNewPayment(newPayment) {
  const { data, error } = await supabase.from("payment").insert({
    name: newPayment.name,
    price: newPayment.price,
  });
}

module.exports = {
  getAllPayments,
  getPaymentByID,
  createNewPayment,
};
