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
        id: value.room_id.id,
        room_name: value.room_id.room_name,
        room_type: roomType[0].name,
        area: roomType[0].area,
        first_hour_price: value.price.first_hour_price,
        hour_price: value.price.hour_price,
        overnight_price: value.price.overnight_price,
        one_day_price: value.price.one_day_price,
      }
  }))
  returnList.then((data) => res.status(200).send(data))
} 
const updateRoom = async (req, res, next) => {
  const { room } = req.body;
  const { id } = req.params;
  
  if (!room || !id) return next(BadRequestError());

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
  getRoomByBookingID
};
