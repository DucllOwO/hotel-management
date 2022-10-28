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

const addPermissions = async (positionID, features) => {
  if (!(await checkPermissionExist(features, positionID))) {
    const { error } = await supabase.from(TABLE_NAME).insert(
      features.map((feature) => {
        return { feature_id: feature.id, position_id: positionID };
      })
    );
    return error;
  } else {
    const conflictError = new Error(`Already have these permission`);
    conflictError.status = 409;
    return { error: conflictError };
  }
};

const removePermission = async (positionID, features) => {
  return await supabase
    .from(TABLE_NAME)
    .delete()
    //.match({ feature_id: featureID, position_id: positionID });
    .in(
      "feature_id",
      features.map((feature) => feature.id)
    )
    .eq("position_id", positionID);
};

const getPermissionByPositionID = async (positionID) => {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("position_id", positionID);
};

const checkPermissionExist = async (features, positionID) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .in(
      "feature_id",
      features.map((feature) => feature.id)
    )
    .eq("position_id", positionID);
  return data[0] ? true : false;
};

module.exports = {
  loadAllPermission,
  addPermissions,
  removePermission,
  getPermissionByPositionID,
};
