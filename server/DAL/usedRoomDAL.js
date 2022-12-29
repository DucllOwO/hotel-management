const supabase = require("../database");

const createUsedRoom = (bookingID, roomNames) => {
  console.log(bookingID);
  console.log(roomNames);
  return supabase.from("used_room").insert({
    booking_id: bookingID,
    room_id: roomNames.id,
  });
};

const getUsedRoomByBookingID = (bookingID) => {
  return supabase
    .from("used_room")
    .select(
      `
        id,
        room_id (
          id, 
          room_name,
          price,
          room_type_id (
            id,
            name
          )
        )
      `
    )
    .eq("booking_id", bookingID);
};

module.exports = {
  createUsedRoom,
  getUsedRoomByBookingID,
};
