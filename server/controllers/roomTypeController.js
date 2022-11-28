const roomTypeDAL = require("../DAL/roomTypeDAL");

const getAll = async (req, res, next) => {
  const { data: roomTypes, error: getRoomTypesError } =
    await roomTypeDAL.getAllTypes();
    console.log(roomTypes)
  if (getRoomTypesError) return next(getRoomTypesError);
  else res.status(200).send(roomTypes);
};
const getByID = (req, res, next) => {
  const { id: typeID } = req.params;
  const { data: roomType, error: getRoomTypeError } =
    roomTypeDAL.getTypeByID(typeID);
  if (getRoomTypeError) return next(getRoomTypeError);
  else res.status(200).send(roomType);
};
const createType = (req, res) => {
  const { roomType } = req.body;

  if (!roomType) return next(BadRequestError());

  const { error: insertRoomTypeError } = roomTypeDAL.createRoomType({
    ...roomType,
  });

  if (insertRoomTypeError) return next(insertRoomTypeError);

  res.status(201).send("Created");
};
const updateInformation = (req, res) => {
  const { roomType } = req.body;
  const { id: roomTypeID } = roomType?.id;

  if (!roomType) return next(BadRequestError());

  const { error: updateRoomTypeError } = roomTypeDAL.updateRoomType(
    roomTypeID,
    {
      ...roomType,
    }
  );

  if (updateRoomTypeError) return next(updateRoomTypeError);

  res.status(201).send("Created");
};

module.exports = {
  getAll,
  getByID,
  createType,
  updateInformation,
};
