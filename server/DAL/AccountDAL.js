const supabase = require("../database");

const TABLE_NAME = "account";

async function getAccountByUsername(username) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("username", username);
  console.log(`${data} + ${error}`);
  return { user: data[0], error };
}
async function getAccountByEmail(email) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("email", email);
  if (error) {
    console.log(error);
    return null;
  } else {
    return newAccount[0];
  }
}

const getAllAccount = (from, to) => {
  return supabase
    .from(TABLE_NAME)
    .select("*")
    .order("username", { ascending: true })
    .range(from, to);
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
  getAccountByEmail,
  getAccount,
  getAllAccount,
  insertAccount,
  deleteAccount,
  updateAccount,
};
