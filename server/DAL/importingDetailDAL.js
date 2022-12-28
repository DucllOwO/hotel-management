const supabase = require("../database");

function getAllPurchaseDetail() {
  return supabase
    .from("purchase_detail")
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

function createPurchaseDetail(purchaseID, purchaseDetails) {
  const itemToCreate = purchaseDetails.map((value) => ({
    item_id: value.item_id,
    amount: value.amount,
    unit_price: value.unit_price,
    purchase_id: purchaseID,
  }));

  return supabase.from("purchase_detail").insert(itemToCreate);
}

module.exports = { getAllPurchaseDetail, createPurchaseDetail };
