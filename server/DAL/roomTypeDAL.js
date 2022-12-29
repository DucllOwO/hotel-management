const supabase = require("../database");

function getAllTypes() {
  return supabase
    .from("room_type")
    .select("*")
    .order("id", { ascending: true })
    .eq("is_active", true);
}
function getTypeByID(id) {
  return supabase.from("room_type").select("*").eq("id", id);
}
function createRoomType(newRoomType) {
  return supabase.from("room_type").insert({ ...newRoomType });
}
function updateRoomType(id, newInfo) {
  return supabase
    .from("room_type")
    .update({ ...newInfo })
    .eq("id", id);
}

function hideRoomType(roomTypeID) {
  return supabase
    .from("room_type")
    .update({ is_active: false })
    .eq("id", roomTypeID);
}
module.exports = {
  getAllTypes,
  getTypeByID,
  createRoomType,
  updateRoomType,
  hideRoomType,
};
