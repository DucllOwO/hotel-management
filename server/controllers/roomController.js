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
    return res.status(200).send(roomsByStatus);
  }

  const { data: tempRooms, error } = await roomDAL.getAllRooms();
  // const rooms = tempRooms.map((item) => {
  //   return {
  //     ...item,
  //     roomType: item.room_type.name,
  //   };
  // });
  console.log(tempRooms);
  if (error) return next(error);

  res.status(200).send(tempRooms);
};

const getRoom = async (req, res, next) => {
  const { id } = req.params;

  const { data: room, error } = await roomDAL.getRoomByName(id);

  if (error) return next(error);

  res.status(200).send({ room: room[0] });
};

const updateRoom = async (req, res, next) => {
  const { room } = req.body;
  const { id } = req.params;

  if (!room) return next(BadRequestError());

  const { data, error: updateRoomError } = await roomDAL.updateRoom(room, id);

  console.log(updateRoomError);
  if (updateRoomError) return next(updateRoomError);

  res.status(200).send(data[0]);
};

const createRoom = async (req, res, next) => {
  const { room } = req.body;

  if (!room) return next(BadRequestError());

  const { data, error } = await roomDAL.insertRoom(room);

  if (error) return next(error);

  res.status(200).send(data[0]);
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
