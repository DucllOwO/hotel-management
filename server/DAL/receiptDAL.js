const supabase = require("../database");

const TABLE_NAME = "invoice";

const updateReceipt = (receiptID, newInfo) => {
  return supabase
  .from(TABLE_NAME)
  .update(newInfo)
  .eq("id", receiptID);
}
const getReceiptByBookingID = (bookingID) => {
  return supabase
  .from(TABLE_NAME)
  .select()
  .eq("booking_id", bookingID);
}
const getAllReceipt = () => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `
      id,
      established_date,
      payment_method,
      checkin_time,
      checkout_time,
      service_cost,
      rent_cost,
      surcharge,
      total_cost,
      note,
      status,
      booking_id ( 
        id,
        customer_id (id, fullname)
      ),
      employee_id (),
      employee_name
      `
    )
    .order("id", { ascending: false });
  //console.log("fetch all Permission data " + JSON.stringify(data));
  //console.log("error " + JSON.stringify(error));
};

const getReceiptByDay = (day) => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `
    id,
    established_date,
    payment_method,
    checkin_time,
    checkout_time,
    service_cost,
    rent_cost,
    surcharge,
    total_cost,
    note,
    status,
    booking_id (
      id,
      customer_id (
        id, 
        fullname
      )
    ),
    employee_name
    `
    )
    .eq("established_date", day)
    .order("id", { ascending: false });
};
const getReceiptByMonth = (firstDay, lastDay) => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `
    id,
    established_date,
    payment_method,
    checkin_time,
    checkout_time,
    service_cost,
    rent_cost,
    surcharge,
    total_cost,
    note,
    status,
    booking_id (
      id,
      customer_id (
        id, 
        fullname
      )
    ),
    employee_name
    `
    )
    .gt("established_date", firstDay)
    .lt("established_date", lastDay)
    .order("id", { ascending: false });
};
const getReceiptByYear = (firstDay, lastDay) => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `
    id,
    established_date,
    payment_method,
    checkin_time,
    checkout_time,
    service_cost,
    rent_cost,
    surcharge,
    total_cost,
    note,
    booking_id (
      id,
      customer_id (
        id, 
        fullname
      )
    ),
    employee_name
    `
    )
    .gt("established_date", firstDay)
    .lt("established_date", lastDay)
    .order("id", { ascending: false });
};

const createReceipt = async (receipt) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(receipt)
    .select(
      `
    id,
    established_date,
    payment_method,
    checkin_time,
    checkout_time,
    service_cost,
    rent_cost,
    surcharge,
    total_cost,
    note,
    booking_id (
      id,
      customer_id (
        id, 
        fullname
      )
    ),
    employee_name
    `
    );
  return { data, error };
};

module.exports = {
  getAllReceipt,
  createReceipt,
  getReceiptByDay,
  getReceiptByMonth,
  getReceiptByYear,
  updateReceipt,
  getReceiptByBookingID
};
