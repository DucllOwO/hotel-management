const roomDAL = require("../DAL/roomDAL");
const roomTypeDAL = require("../DAL/roomTypeDAL");
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
  const rooms = tempRooms.map((item) => {
    return {
      roomType: item.room_type.name,
      ...item,
    };
  });
  console.log(rooms);
  if (error) return next(error);

  res.status(200).send(rooms);
};

const getRoom = async (req, res, next) => {
  const { room_name } = req.params;

  const { data: room, error } = await roomDAL.getRoomByName(room_name);

  if (error) return next(error);

  res.status(200).send({ room: room[0] });
};

const getRoomByBookingID = async (req, res, next) => {
  const {bookingID} = req.query;

  if(!bookingID) return next(BadRequestError)

  const {data: listRoom, error: getRoomError} = await roomDAL.getRoomByBookingID(bookingID);
  console.log(listRoom)

  if(getRoomError) return next(getRoomError)

  const returnList = Promise.all(listRoom.map(async (value) => {
    const {data: roomType, error: getRoomTypeError} = await roomTypeDAL.getTypeByID(value.room_id.room_type_id);
    console.log(value.room_id.room_type_id)
    if(getRoomTypeError) return next(getRoomTypeError);
    else
      return {
        room_name: value.room_id.room_name,
        first_hour_price: roomType[0].first_hour_price,
        hour_price: roomType[0].hour_price,
        overnight_price: roomType[0].overnight_price,
        one_day_price: roomType[0].one_day_price,
      }
  }))
  returnList.then((data) => res.status(200).send(data))
} 
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
  getRoomByBookingID
};
