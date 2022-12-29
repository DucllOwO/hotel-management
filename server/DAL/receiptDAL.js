const supabase = require("../database");

const TABLE_NAME = "invoice";

const getAllReceipt = () => {
  return supabase.from(TABLE_NAME).select(
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
        customer_id (id, fullname)
      ),
      employee_id (),
      employee_name
      `
  );
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
    .order("id", { ascending: true });
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
    .lt("established_date", lastDay)
    .gt("established_date", firstDay)
    .order("id", { ascending: true });
};
const getReceiptByYear = (firstDay, lastDay) => {
  return (
    supabase
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
      .lt("established_date", lastDay)
      .gt("established_date", firstDay)
      // .rangeLte("established_date", [firstDay, lastDay])
      .order("id", { ascending: true })
  );
};

const createReceipt = async (receipt) => {
  const { data, error } = await supabase.from(TABLE_NAME).insert(receipt);
  return { data, error };
};

module.exports = {
  getAllReceipt,
  createReceipt,
  getReceiptByDay,
  getReceiptByMonth,
  getReceiptByYear,
};
