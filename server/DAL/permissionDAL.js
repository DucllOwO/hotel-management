const supabase = require("../database");

const TABLE_NAME = "permission";

const loadAllPermission = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select(`
  position_id:position(
    name
  ),
  feature_id:feature(
    action,
    resource
  )
  `);
  console.log("fetch all Permission data " + JSON.stringify(data));
  console.log("error " + JSON.stringify(error));
  return { data, error };
};

module.exports = {
  loadAllPermission,
};
