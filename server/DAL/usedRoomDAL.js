const supabase = require("../database");

const createUsedRoom = (bookingID, roomNames) => {
  console.log(bookingID)
  console.log(roomNames)
  return supabase.from("used_room")
  .insert({
        booking_id: bookingID,
        room_id: roomNames.id,
    
});
};

module.exports = {
  createUsedRoom,
};
