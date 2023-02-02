const supabase = require("../database");

const TABLE_NAME = "feature";

const loadAllFeature = async () => {
  const { data, error } = await await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("id", { ascending: true });
  //console.log('fetch all feature data ' + JSON.stringify(data))
  return { data, error };
};

module.exports = {
  loadAllFeature,
};
