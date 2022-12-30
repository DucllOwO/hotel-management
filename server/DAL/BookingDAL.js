const supabase = require("../database");

const TABLE_NAME = "booking";

const getAllBooking = () => {
  return supabase.from(TABLE_NAME).select("*").order("id", { ascending: true });
};

const getBooking = (bookingID) => {
  return supabase.from(TABLE_NAME).select().eq("id", bookingID);
};
const getBookingByStatus = (status) => {
  return supabase
    .from(TABLE_NAME)
    .select("id")
    .eq("status", status)
    .order("id", { ascending: true });
};
const getFullBookingByStatus = (status) => {
  return supabase
    .from(TABLE_NAME)
    .select()
    .eq("status", status)
    .order("id", { ascending: true });
};
const updateBookingStatus = (newStatus, bookingID) => {
  return supabase
    .from(TABLE_NAME)
    .update({ status: newStatus })
    .eq("id", bookingID);
};
const updateCheckInTime = (bookingID, checkInTime) => {
  return supabase
    .from(TABLE_NAME)
    .update({ checkin_time: checkInTime })
    .eq("id", bookingID);
};

const getBookingByDate = (from, to) => {
  return supabase
    .from(TABLE_NAME)
    .select("id")
    .or(
      `and(book_from.lt.${from},book_to.gt.${from}),and(book_to.gt.${to},book_from.lt.${to}),and(book_from.gt.${from},book_to.lt.${to})`
    );
};

const insertBooking = (booking) => {
  return supabase.from(TABLE_NAME).insert(booking);
};

const deleteBooking = (idBooking) => {
  return supabase.from(TABLE_NAME).delete().eq("id", idBooking);
};

//const getBooking

module.exports = {
  getBookingByDate,
  getFullBookingByStatus,
  getAllBooking,
  getBooking,
  insertBooking,
  deleteBooking,
  getBookingByStatus,
  updateBookingStatus,
  updateCheckInTime,
};
