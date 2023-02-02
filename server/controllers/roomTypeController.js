const roomTypeDAL = require("../DAL/roomTypeDAL");

const getAll = async (req, res, next) => {
  const { data: roomTypes, error: getRoomTypesError } =
    await roomTypeDAL.getAllTypes();
  console.log(roomTypes);
  if (getRoomTypesError) return next(getRoomTypesError);
  else res.status(200).send(roomTypes);
};
const getByID = async (req, res, next) => {
  const { id: typeID } = req.params;
  const { data: roomType, error: getRoomTypeError } =
    await roomTypeDAL.getTypeByID(typeID);
  console.log(roomType);
  if (getRoomTypeError) return next(getRoomTypeError);
  else res.status(200).send(roomType[0]);
};
const createType = async (req, res, next) => {
  const { roomType } = req.body;

  console.log(roomType);

  if (!roomType) return next(BadRequestError());

  const { data: roomTypeData, error: insertRoomTypeError } =
    await roomTypeDAL.createRoomType(roomType);

  if (insertRoomTypeError) return next(insertRoomTypeError);

  res.status(201).send(roomTypeData[0]);
};
const updateInformation = async (req, res) => {
  const { roomType } = req.body;
  const { id } = req.params;

  if (!roomType) throw BadRequestError();
  const { data, error: updateRoomTypeError } = await roomTypeDAL.updateRoomType(
    id,
    roomType
  );

  if (updateRoomTypeError) throw updateRoomTypeError;

  res.status(200).send(data[0]);
};

const hideRoomType = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { error } = await roomTypeDAL.hideRoomType(id);

  if (error) throw error;

  res.status(204).send();
};

module.exports = {
  getAll,
  getByID,
  createType,
  updateInformation,
  hideRoomType,
};
