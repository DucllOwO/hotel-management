const supabase = require("../database");

async function getAllTypes() {
  const { data, error } = await supabase
    .from("roomtype")
    .select("*")
    .order("id", { ascending: true })
    .range(from, to);
  return { data, error };
}
async function getTypeByID(id) {
  const { data, error } = await supabase
    .from("roomtype")
    .select("*")
    .eq("id", id);
  return { data, error };
}
async function createRoomType(newRoomType) {
  const { data, error } = await supabase.from("roomtype").insert({
    name: newRoomType.name,
    max_customer: newRoomType.max_customer,
    bed_amount: newRoomType.bed_amount,
  });
  return { data, error };
}
async function updateRoomType(id, newInfo) {
  const { data, error } = await supabase
    .from("roomtype")
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
