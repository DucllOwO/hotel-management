const supabase = require("../database");

const TABLE_NAME = "voucher";

const getAllVoucher = () => {
  return supabase.from(TABLE_NAME).select("*");
};

const getVoucher = (id) => {
  return supabase.from(TABLE_NAME).select().eq("id", id);
};

const insertVoucher = (voucher) => {
  return supabase.from(TABLE_NAME).insert(voucher);
};

const changeActiveVoucher = (id, isActive) => {
  return supabase
    .from(TABLE_NAME)
    .update({ is_active: !isActive })
    .eq("id", id);
};

module.exports = {
  getAllVoucher,
  getVoucher,
  insertVoucher,
  changeActiveVoucher,
};
