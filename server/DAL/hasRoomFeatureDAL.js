const supabase = require("../database");

const TABLE_NAME = "has_feature";

const getFeaturesOfRoomType = (roomTypeID) => {
  return supabase
    .from(TABLE_NAME)
    .select(
      `id,
  room_feature (
    name
  )
  `
    )
    .eq("room_type", roomTypeID);
};

module.exports = { getFeaturesOfRoomType };
