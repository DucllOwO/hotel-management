const supabase = require("../database");
const bookingDAL = require("./BookingDAL");

const TABLE_NAME = "room";

const getRoomByName = (roomName) => {
  return supabase.from(TABLE_NAME).select().eq("room_name", roomName);
};

const getRoomByStatus = (status) => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `
      room_name,
      room_type_id(name)
    `
    )
    .eq("status", status);
};
const getUnavailableRoomID = (listBooking) => {
  console.log(listBooking);
  return supabase
    .from("used_room")
    .select("room_id")
    .in("booking_id", listBooking)
    .order("room_id", {ascending: true});
};

const getRoomAvailable = (listRoom) => {
  // console.log(listRoom);
  return supabase
    .from(TABLE_NAME)
    .select(
    `
      id,
      room_name,
      room_type_id(name)
    `
    )
    .not("id", "in", `(${listRoom})`)
    .order("room_name", { ascending: true });
};

const getAllRooms = () => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `
      room_name,
      status,
      room_type(name)
    `
    )
    .order("room_name", { ascending: true });
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
  getRoomAvailable,
  getUnavailableRoomID,
  getAllRooms,
  updateRoom,
  insertRoom,
  getRoomByName,
  getRoomByStatus,
};
