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
  //console.log("fetch all Permission data " + JSON.stringify(data));
  //console.log("error " + JSON.stringify(error));
  return { data, error };
};
/**
 * updatePermissionList: [
  {position_id, feature_id, type: (remove/add)}
]
 */
const updatePermissions = async (updatePermissionList) => {
  let errorList;
  for (const permission of updatePermissionList) {
  }
};

const addPermission = async (positionID, featureID) => {
  return supabase
    .from(TABLE_NAME)
    .insert({ position_id: positionID, feature_id: featureID });
};

const removePermission = async (positionID, featureID) => {
  return supabase
    .from(TABLE_NAME)
    .delete()
    .match({ feature_id: featureID, position_id: positionID });
};

const getPermissionByPositionID = async (positionID) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("position_id", positionID);
  return { data, error };
};

module.exports = {
  loadAllPermission,
  updatePermissions,
  addPermission,
  removePermission,
  getPermissionByPositionID,
};
