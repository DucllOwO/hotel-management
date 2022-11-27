const supabase = require("../database");

const TABLE_NAME = "room";

const getRoomByName = (roomName) => {
  return supabase.from(TABLE_NAME).select().eq("room_name", roomName);
};
const getRoomByStatus = (status, from, to) => {
  return supabase
    .from(TABLE_NAME)
    .select()
    .eq("status", status)
    .order("room_name", { ascending: true })
    .range(from, to);
};

const getAllRooms = (from, to) => {
  return supabase
    .from(TABLE_NAME)
    .select(`
      room_name,
      size,
      price,
      status,
      room_type(name)
    `)
    .order("room_name", { ascending: true })
    .range(from, to);
};

const updateRoom = (room, roomName) => {
  return supabase
    .from(TABLE_NAME)
    .update({ ...room })
    .eq("room_name", roomName);
};

const insertRoom = (room) => {
  return supabase.from(TABLE_NAME).insert(room);
};

module.exports = {
  getRoomByStatus,
  getAllRooms,
  updateRoom,
  insertRoom,
  getRoomByName,
};
