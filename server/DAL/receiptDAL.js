const supabase = require("../database");

const TABLE_NAME = "invoice";

const getAllReceipt = (from, to) => {
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
        customer_id (id, fullname)
      ),
      employee_id (),
      employee_name
      `
    )
    .range(from, to);
  //console.log("fetch all Permission data " + JSON.stringify(data));
  //console.log("error " + JSON.stringify(error));
};

const createReceipt = async (receipt) => {
  const { data, error } = await supabase.from(TABLE_NAME).insert(receipt);
  return { data, error };
};

module.exports = {
  getAllReceipt,
  createReceipt,
};
