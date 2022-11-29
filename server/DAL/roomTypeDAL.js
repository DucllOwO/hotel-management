const supabase = require("../database");

function getAllTypes() {
  return supabase
    .from("room_type")
    .select("*")
    .order("id", { ascending: true });
}
async function getTypeByID(id) {
  const { data, error } = await supabase
    .from("room_type")
    .select("*")
    .eq("id", id);
  return { data, error };
}
async function createRoomType(newRoomType) {
  const { data, error } = await supabase.from("room_type").insert({
    name: newRoomType.name,
    max_customer: newRoomType.max_customer,
    bed_amount: newRoomType.bed_amount,
  });
  return { data, error };
}
async function updateRoomType(id, newInfo) {
  const { data, error } = await supabase
    .from("room_type")
    .update({ ...newInfo })
    .eq("id", id);
  return { data, error };
}
module.exports = {
  getAllTypes,
  getTypeByID,
  createRoomType,
  updateRoomType,
};
