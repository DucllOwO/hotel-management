const hasRoomFeaturesDAL = require("../DAL/hasRoomFeatureDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getRoomFeatures = async (req, res, next) => {
  const { roomTypeID } = req.params;
  const { data, error } = await hasRoomFeaturesDAL.getFeaturesOfRoomType(
    roomTypeID
  );
  console.log(data);
  if (error) next(error);

  res.send(data);
};

const createRoomFeatures = async (req, res, next) => {
  const { roomTypeID, utils } = req.body;
  const { data: hasFeatureData, error: createHasFeatureError } =
    await hasRoomFeaturesDAL.createFeaturesOfRoomType(roomTypeID, utils);

  if (createHasFeatureError) throw createHasFeatureError;

  res.status(201).send("Created");
};

const updateHasRoomFeature = async (req, res) => {
  const { roomTypeID, checkUtils, unCheckUtils } = req.body;

  if (!(roomTypeID && checkUtils && unCheckUtils)) return BadRequestError();

  if (checkUtils.length > 0) {
    const { error } = await hasRoomFeaturesDAL.createFeaturesOfRoomType(
      roomTypeID,
      checkUtils
    );

    if (error) throw error;
  }

  if (unCheckUtils.length > 0) {
    const { error } = await hasRoomFeaturesDAL.removeHasRoomFeatures(
      roomTypeID,
      unCheckUtils
    );

    if (error) throw error;
  }

  res.status(204).send();
};

module.exports = { getRoomFeatures, createRoomFeatures, updateHasRoomFeature };
