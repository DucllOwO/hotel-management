const RoomFeatureDAL = require("../DAL/roomFeatureDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getAllRoomFeatures = async (req, res, next) => {
  const { data, error } = await RoomFeatureDAL.getAllRoomFeature();

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

  const { data, error } = await RoomFeatureDAL.insertRoomFeature(RoomFeature);

  if (error) return next(error);

  res.status(201).send(data[0]);
};

const updateRoomFeature = async (req, res, next) => {
  const { id } = req.params;
  const { RoomFeature } = req.body;

  if (!RoomFeature) return next(BadRequestError());

  const { data, error } = await RoomFeatureDAL.updateRoomFeature(
    RoomFeature,
    id
  );

  if (error) return next(error);

  res.status(200).send(data[0]);
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
