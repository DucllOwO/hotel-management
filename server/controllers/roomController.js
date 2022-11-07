const roomDAL = require("../DAL/roomDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllRoom = async (req, res, next) => {
  const { status } = req.query;
  console.log(status);

  if (status) {
    const { data: roomsByStatus, error: getRoomByStatusError } =
      await roomDAL.getRoomByStatus(status);
    if (getRoomByStatusError) return next(getRoomByStatusError);
    return res.status(200).send({ roomsByStatus });
  }

  const { data: rooms, error } = await roomDAL.getAllRooms();
  console.log(rooms);
  if (error) return next(error);

  res.status(200).send({ rooms });
};

const getRoom = async (req, res, next) => {
  const { room_name } = req.params;

  const { data: room, error } = await roomDAL.getRoomByName(room_name);

  if (error) return next(error);

  res.status(200).send({ room: room[0] });
};

const updateRoom = async (req, res, next) => {
  const { room } = req.body;
  const { room_name } = req.params;

  if (!room) return next(BadRequestError());

  // to ensure room obj don't have primary key
  const { room_name: romeName, ...roomWithoutID } = room;
  console.log(roomWithoutID);

  const { error: updateRoomError } = await roomDAL.updateRoom(
    roomWithoutID,
    room_name
  );

  console.log(updateRoomError);
  if (updateRoomError) return next(updateRoomError);

  res.status(204).send();
};

const createRoom = async (req, res, next) => {
  const { room } = req.body;

  if (!room) return next(BadRequestError());

  const { error } = await roomDAL.insertRoom(room);

  if (error) return next(error);

  res.status(201).send("Created");
};

// const hideRoom = (req, res) => {
//   const { room_name } = req.params;

// };

module.exports = {
  getAllRoom,
  createRoom,
  updateRoom,
  getRoom,
};
