const supabase = require("../database");
const bookingDAL = require("./BookingDAL");

const TABLE_NAME = "room";

const getRoomByName = (id) => {
  return supabase.from(TABLE_NAME).select().eq("room_name", id);
};

const getRoomByStatus = (status) => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `
      id,
      room_name,
      room_type_id(id,
        name)
    `
    )
    .eq("status", status)
    .eq("is_active", true);
};
const getUnavailableRoomID = (listBooking) => {
  console.log(listBooking);
  return supabase
    .from("used_room")
    .select("room_id")
    .in("booking_id", listBooking)
    .eq("is_active", true)
    .order("room_id", { ascending: true });
};

const getRoomAvailable = (listRoom) => {
  // console.log(listRoom);
  return supabase
    .from(TABLE_NAME)
    .select(
      `
      id,
      room_name,
      room_type_id(id,
        name)
    `
    )
    .not("room_name", "in", `(${listRoom})`)
    .order("room_name", { ascending: true })
    .eq("is_active", true);
};

const getAllRooms = () => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `
      id,
      room_name,
      status,
      room_type_id(id,
        name)
    `
    )
    .order("id", { ascending: true })
    .eq("is_active", true);
};

const updateRoom = (room, id) => {
  return supabase
    .from(TABLE_NAME)
    .update({ ...room })
    .eq("id", id)
    .select(
      `
      id,
      room_name,
      status,
      room_type_id(id,
        name)
    `
    );
};

const insertRoom = (room) => {
  return supabase
    .from(TABLE_NAME)
    .insert(room)
    .select(
      `
      id,
      room_name,
      status,
      room_type_id(id,
        name)
    `
    );
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
