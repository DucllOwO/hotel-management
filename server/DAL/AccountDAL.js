const supabase = require("../database");

const TABLE_NAME = "account";

async function getAccountByUsername(username) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("username", username);
  return { user: data[0], error };
}

const getAllAccount = () => {
  return supabase
    .from(TABLE_NAME)
    .select("*")
    .order("username", { ascending: true });
};

const getAccount = (username) => {
  return supabase.from(TABLE_NAME).select().eq("username", username);
};

const insertAccount = (Account) => {
  return supabase.from(TABLE_NAME).insert(Account);
};

const updateAccount = (Account, username) => {
  return supabase
    .from(TABLE_NAME)
    .update({ ...Account })
    .eq("username", username);
};

const deleteAccount = (username) => {
  return supabase.from(TABLE_NAME).delete().eq("username", username);
};

module.exports = {
  getAccountByUsername,
  getAccount,
  getAllAccount,
  insertAccount,
  deleteAccount,
  updateAccount,
};
