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
const getRoomByBookingIDList = (listBooking) => {
  console.log(listBooking);
  return supabase
    .from("used_room")
    .select("room_id")
    .in("booking_id", listBooking)
    .eq("is_active", true)
    .order("room_id", { ascending: true });
};

const getRoomByBookingID = (bookingID) => {
  return supabase
    .from("used_room")
    .select(
      `
      room_id(room_name, room_type_id)
    `
    )
    .eq("booking_id", bookingID)
    .order("room_id", {ascending: true});
}
const getUsingRoom = (listBooking) => {
  return supabase
    .from("used_room")
    .select(
      `
        booking_id,
        room_id(room_name, room_type_id(name))
      `
    )
    .in("booking_id", listBooking)
    .order("room_id", {ascending: true});
};

const getAvailableRoom = (listRoom) => {
  // console.log(listRoom);
  return supabase
    .from(TABLE_NAME)
    .select(
      `
      id,
      room_name,
      room_type_id(*)
    `
    )
    .not("room_name", "in", `(${listRoom})`)
    .order("room_name", { ascending: true })
    .eq("is_active", true);
};
const getRoomByID = (listRoom) => {
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
    .in("id", listRoom)
    .order("room_name", { ascending: true });
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
  getAvailableRoom,
  getRoomByID,
  getUsingRoom,
  getRoomByBookingIDList,
  getRoomByBookingID,
  getAllRooms,
  updateRoom,
  insertRoom,
  getRoomByName,
  getRoomByStatus,
};
