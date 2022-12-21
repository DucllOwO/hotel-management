const hasRoomFeatureDAL = require("../DAL/hasRoomFeatureDAL");

const getRoomFeatures = async (req, res, next) => {
  const { roomTypeID } = req.params;
  const { data, error } = await hasRoomFeatureDAL.getFeaturesOfRoomType(
    roomTypeID
  );
  console.log(data);
  if (error) next(error);

  res.send(data);
};

module.exports = { getRoomFeatures };
