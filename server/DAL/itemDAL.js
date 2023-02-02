const supabase = require("../database");

function getAllItem() {
  return supabase.from("item").select("*").order("id", { ascending: true });
}
async function getItemByID(filter) {
  const { data, error } = await supabase.from("item").select().eq("id", filter);
  return { data, error };
}
async function createNewItem(newItem) {
  const { data, error } = await supabase.from("item").insert(newItem);
  return { data, error };
}
const updateItem = (newItem, itemID) => {
  console.log(newItem);
  return supabase
    .from("item")
    .update({
      ...newItem,
    })
    .eq("id", itemID);
};

module.exports = {
  getAllItem,
  getItemByID,
  createNewItem,
  updateItem,
};
