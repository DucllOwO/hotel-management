const RoomFeatureDAL = require("../DAL/roomFeatureDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getAllRoomFeatures = async (req, res, next) => {
  const { from, to } = req.paginatedResult;
  const { data, error } = await RoomFeatureDAL.getAllRoomFeature(from, to);

  if (error) return next(error);

  res.status(200).send({ data });
};

const getRoomFeature = async (req, res, next) => {
  const { id } = req.params;

  const { data, error } = await RoomFeatureDAL.getRoomFeature(id);

  if (error) return next(error);

  res.status(200).send({ data });
};

const createRoomFeature = async (req, res, next) => {
  const { RoomFeature } = req.body;
  if (!RoomFeature) return next(BadRequestError());

  const { error } = await RoomFeatureDAL.insertRoomFeature(RoomFeature);

  if (error) return next(error);

  res.status(201).send("Created");
};

const updateRoomFeature = async (req, res, next) => {
  const { id } = req.params;
  const { RoomFeature } = req.body;

  if (!RoomFeature) return next(BadRequestError());
  const { id: idTemp, ...roomFeatureWithoutID } = RoomFeature;

  const { error } = await RoomFeatureDAL.updateRoomFeature(
    roomFeatureWithoutID,
    id
  );

  if (error) return next(error);

  res.status(204).send();
};

const deleteRoomFeature = async (req, res, next) => {
  const { id } = req.params;

  const { error } = await RoomFeatureDAL.deleteRoomFeature(id);

  if (error) return next(error);

  res.status(204).send();
};

module.exports = {
  getAllRoomFeatures,
  createRoomFeature,
  deleteRoomFeature,
  getRoomFeature,
  updateRoomFeature,
};
