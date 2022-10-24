const supabase = require("../database");

const TABLE_NAME = "position";

const loadAllPosition = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select("*");
  //console.log("fetch all Position data " + JSON.stringify(data));
  return { data, error };
};

module.exports = {
  loadAllPosition,
};
