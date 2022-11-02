const supabase = require("../database");

const TABLE_NAME = "room";

//const getRoomByName = ()
const getRoomByStatus = (status) => {
  return supabase.from(TABLE_NAME).select().eq("status", status);
};

const getAllRooms = () => {
  return supabase.from(TABLE_NAME).select("*");
};

module.exports = { getRoomByStatus, getAllRooms };
