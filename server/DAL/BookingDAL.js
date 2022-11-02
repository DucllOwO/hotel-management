const supabase = require("../database");

const TABLE_NAME = "booking";

const getAllBooking = () => {
  return supabase.from(TABLE_NAME).select("*");
};

const getBooking = (bookingID) => {
  return supabase.from(TABLE_NAME).select().eq("id", bookingID);
};

const insertBooking = (booking) => {
  return supabase.from(TABLE_NAME).insert(booking);
};

//const getBooking

module.exports = { getAllBooking, getBooking, insertBooking };
