const supabase = require("../database");

const createUsedRoom = (bookingID, roomNames) => {
  return supabase.from("used_room").insert(
    roomNames.map((roomName) => {
      return {
        booking_id: bookingID,
        room_name: roomName,
      };
    })
  );
};

module.exports = {
  createUsedRoom,
};
