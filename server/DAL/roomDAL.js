const supabase = require("../database");

const TABLE_NAME = "room";

const getRoomByName = (roomName) => {
  return supabase.from(TABLE_NAME).select().eq("room_name", roomName);
};
const getRoomByStatus = (status) => {
  return supabase.from(TABLE_NAME).select().eq("status", status);
};

const getAllRooms = () => {
  return supabase.from(TABLE_NAME).select("*");
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
