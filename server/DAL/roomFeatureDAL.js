const supabase = require("../database");

const TABLE_NAME = "room_feature";

const getAllRoomFeature = () => {
  return supabase.from(TABLE_NAME).select("*").order("id", { ascending: true });
};

const getRoomFeature = (id) => {
  return supabase.from(TABLE_NAME).select().eq("id", id);
};

const insertRoomFeature = (RoomFeature) => {
  return supabase.from(TABLE_NAME).insert({ name: RoomFeature });
};

const updateRoomFeature = (RoomFeature, id) => {
  return supabase.from(TABLE_NAME).update({ name: RoomFeature }).eq("id", id);
};

const deleteRoomFeature = (id) => {
  return supabase.from(TABLE_NAME).delete().eq("id", id);
};

module.exports = {
  getAllRoomFeature,
  getRoomFeature,
  insertRoomFeature,
  deleteRoomFeature,
  updateRoomFeature,
};
