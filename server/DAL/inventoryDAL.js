const supabase = require("../database");

async function getAllInventories() {
  const { data, error } = await supabase.from("inventory_record").select();
  return { data, error };
}
const getInventoryByBookingID = (bookingID, roomID = null) => {
  const query = roomID
    ? supabase
        .from("inventory_record")
        .select()
        .match({ booking_id: bookingID, room_id: roomID })
    : supabase.from("inventory_record").select().eq("booking_id", bookingID);
  return query;
};
async function createNewRecord(newRecord) {
  const { data, error } = await supabase.from("inventory_record").insert({
    ...newRecord,
  });
  return { data, error };
}
const createDetail = (newDetail) => {
  return supabase.from("inventory_detail").insert(newDetail);
};
const getInventoryDetail = (recordID) => {
  return supabase
    .from("inventory_detail")
    .select(
      `
      id,
        item_id(id, name),
        price, 
        amount,
        record_id (id, date)
    `
    )
    .in("record_id", recordID);
};

module.exports = {
  getAllInventories,
  createNewRecord,
  getInventoryByBookingID,
  getInventoryDetail,
  createDetail,
};
