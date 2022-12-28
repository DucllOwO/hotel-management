const bookingDAL = require("../DAL/bookingDAL");
const roomDAL = require("../DAL/roomDAL");
const dayjs = require("dayjs")
const usedRoomDAL = require("../DAL/usedRoomDAL");
const roomTypeDAL = require("../DAL/roomTypeDAL")
const customerDAL = require("../DAL/customerDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getBookingByStatus = async (req, res, next) => {
  const {status} = req.query;

  if(!status) return next(BadRequestError);

  const { data: bookingList, error: getBookingError } = await bookingDAL.getFullBookingByStatus(status);
  if (getBookingError) return next(getBookingError);
  console.log(bookingList);

  const middleArray = bookingList.map(async (value) => {
    const {data: usedRoom, error: getUsedRoomError} = await roomDAL.getRoomByBookingID(value.id);
    if(getUsedRoomError) return next(getUsedRoomError);
    return {
      ...value,
      room: usedRoom
    }
  });
  console.log(middleArray);
  // console.log(middleArray);
  // const roomTypeList = usedRoom.map(async(value) => {
  //   const {data: roomType, error: getRoomTypeError} = await roomTypeDAL.getTypeByID(value.room_id.room_type_id);
  //   if(getRoomTypeError) return next(getRoomTypeError);
    
    // console.log(roomType);

  res.status(200).send(middleArray);
};
const getRooms = async (req, res, next) => {
  const { from: from, to: to } = req.query;

  if (!from || !to) return next(BadRequestError());

  const { data: booking, error: getBookingError } =
    await bookingDAL.getBookingByDate(from, to);

    console.log(booking)

  if (getBookingError) return next(getBookingError);

  const listBookingID = booking?.map((item) => item.id);

  const { data: unavailableRoomID, getAvailableRoomIDError } =
    await roomDAL.getRoomByBookingIDList(listBookingID);

    console.log(unavailableRoomID)

  if (getAvailableRoomIDError) return next(getAvailableRoomIDError);

  const listRoomID = unavailableRoomID?.map((item) => item.room_id);
  console.log(listRoomID)

  const { data, error } = await roomDAL.getAvailableRoom(listRoomID);

  if (error) return next(error);
  console.log(data);

  const listRoom = data?.map((item) => {
    return {
      ...item,
      roomType: item.room_type_id.name,
    };
  });
  res.status(200).send({ listRoom });
};
const getBooking = async (req, res, next) => {
  const { id: bookingID } = req.params;
  const { data, error } = await bookingDAL.getBooking(bookingID);

  if (error) return next(error);
  if (!data[0]) return next(throwErrorDataUnavailable());

  res.status(200).send({ data: data[0] });
};

// tao booking khong can check phong trong vi chi co status available moi co nut dat phong
const createBooking = async (req, res, next) => {
  const { booking, rooms } = req.body;
  console.log(rooms)

  if (!booking || !rooms) return next(BadRequestError());

  // const { data: customerTemp, error: customerTempError } =
  //   await customerDAL.getCustomerByID(customer?.id);

  // if (customerTempError) return next(customerTempError);

  // if (!customerTemp[0]) {
  //   const { error: insertError } = await customerDAL.insertCustomer(customer);

  //   if (insertError) return next(insertError);
  // }

  const { data: bookingRes, error: insertBookingError } =
    await bookingDAL.insertBooking({
      ...booking,
    });
    
  if (insertBookingError) return next(insertBookingError);
  console.log(bookingRes)
  console.log(rooms)
  rooms.forEach(async (values) => {
    const {data: roomRes, error: insertUsedRoomError} = await usedRoomDAL.createUsedRoom(
      bookingRes[0]?.id,
      values,
  );
      if(insertUsedRoomError) return next(insertUsedRoomError);
})
  

  // if(insertUsedRoomError)
  //   return next(insertUsedRoomError);

  res.status(201).send(bookingRes);
};

const deleteBooking = async (req, res, next) => {
  const { id } = req.params;

  const { error } = await bookingDAL.deleteBooking(id);

  if (error) return next(error);

  res.status(204).send();
};

const updateBookingStatus = async (req, res, next) => {
  const { id } = req.params;
  const {status} = req.body;

  if(!id || !status) return next(BadRequestError)

  if(status === "1") {
    const {error: updateTimeError} = await bookingDAL.updateCheckInTime(id, dayjs(Date.now()));
    
    if(updateTimeError) return next(updateTimeError);
  }

  const {data, error} = await bookingDAL.updateBookingStatus(status, id);

  if(error) return next(error)

  res.status(200).send(data);
}
const throwErrorDataUnavailable = () => {
  const err = new Error("Data is not available");
  err.status = 400;
  return err;
};

module.exports = {
  getBookingByStatus,
  getRooms,
  getBooking,
  createBooking,
  updateBookingStatus,
  deleteBooking,
};
