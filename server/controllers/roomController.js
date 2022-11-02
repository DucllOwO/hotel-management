const roomDAL = require("../DAL/roomDAL");
const { roomStatus } = require("../utils/constants");

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

const updateRoom = (req, res) => {
  res.send("updateRoom route");
};

const hideRoom = (req, res) => {
  res.send("hideRoom route");
};

const createRoom = (req, res) => {
  res.send("createRoom route");
};

module.exports = {
  getAllRoom,
  createRoom,
  updateRoom,
  hideRoom,
};
