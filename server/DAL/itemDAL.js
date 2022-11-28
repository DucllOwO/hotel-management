const supabase = require("../database");

function getAllItem() {
  return supabase
    .from("item")
    .select("*")
    .order("id", { ascending: true });
}
async function getItemByID(filter) {
  const { data, error } = await supabase
    .from("item")
    .select()
    .eq("id", filter);
  return { data, error };
}
async function createNewItem(newItem) {
  const { data, error } = await supabase
    .from("item")
    .insert({newItem});
}

module.exports = {
  getAllItem,
  getItemByID,
  createNewItem,
};
