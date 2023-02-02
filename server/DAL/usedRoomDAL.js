const supabase = require("../database");

const createUsedRoom = (bookingID, roomNames) => {
  console.log(bookingID);
  console.log(roomNames);
  return supabase.from("used_room").insert({
    booking_id: bookingID,
    room_id: roomNames.id,
    price: {
      first_hour_price: roomNames.room_type_id.first_hour_price,
      hour_price: roomNames.room_type_id.hour_price,
      one_day_price: roomNames.room_type_id.one_day_price,
      overnight_price: roomNames.room_type_id.overnight_price,
    },
  });
};

const getUsedRoomByBookingID = (bookingID) => {
  return supabase
    .from("used_room")
    .select(
      `
        id,
        price,
        booking_id,
        room_id (
          id, 
          room_name,
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
