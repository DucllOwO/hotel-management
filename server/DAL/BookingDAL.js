const supabase = require("../database");

const TABLE_NAME = "booking";

<<<<<<< HEAD
module.exports = {
    getAllBooking
}
=======
const getAllBooking = () => {
  return supabase.from(TABLE_NAME).select("*");
};

const getBooking = (bookingID) => {
  return supabase.from(TABLE_NAME).select().eq("id", bookingID);
};

const insertBooking = (booking) => {
  return supabase.from(TABLE_NAME).insert(booking);
};

const deleteBooking = (idBooking) => {
  return supabase.from(TABLE_NAME).delete().eq("id", idBooking);
};

//const getBooking

module.exports = { getAllBooking, getBooking, insertBooking, deleteBooking };
>>>>>>> backend