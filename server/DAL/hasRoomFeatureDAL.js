const supabase = require("../database");

const TABLE_NAME = "has_feature";

const getFeaturesOfRoomType = (roomTypeID) => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `id,
  room_feature (
    id,
    name
  )
  `
    )
    .eq("room_type", roomTypeID);
};

const createFeaturesOfRoomType = (roomTypeID, utilArr) => {
  return supabase.from(TABLE_NAME).insert(
    utilArr.map((util) => ({
      room_feature_id: util.id,
      room_type: roomTypeID,
    }))
  );
};

const removeHasRoomFeatures = (roomTypeID, utils) => {
  return supabase
    .from(TABLE_NAME)
    .delete()
    .in(
      "room_feature_id",
      utils.map((util) => util.id)
    )
    .eq("room_type", roomTypeID);
};

module.exports = {
  getFeaturesOfRoomType,
  createFeaturesOfRoomType,
  removeHasRoomFeatures,
};
