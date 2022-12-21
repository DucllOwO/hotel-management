const bookingDAL = require("../DAL/bookingDAL");
const roomDAL = require("../DAL/roomDAL");
const usedRoomDAL = require("../DAL/usedRoomDAL");
const customerDAL = require("../DAL/customerDAL");
const { BadRequestError } = require("../middlewares/errorHandler");
const supabase = require("../database");

const getAllBookings = async (req, res, next) => {
  const { data, error } = await bookingDAL.getAllBooking();
  if (error) return next(error);

  res.status(200).send({ data });
};
const getRooms = async (req, res, next) => {
  const { from: from, to: to } = req.query;
  console.log(from);
  console.log(to);
  if (!from || !to) return next(BadRequestError());

  const { data: booking, error: getBookingError } =
    await bookingDAL.getBookingByDate(from, to);

  if (getBookingError) return next(getBookingError);

  const listBookingID = booking?.map((item) => item.id);

  const { data: unavailableRoomID, getAvailableRoomIDError } =
    await roomDAL.getUnavailableRoomID(listBookingID);

  if (getAvailableRoomIDError) return next(getAvailableRoomIDError);

  const listRoomName = unavailableRoomID?.map((item) => item.room_name);

  const { data, error } = await roomDAL.getRoomAvailable(listRoomName);

  if (error) return next(error);
  console.log(data);

  const listRoom = data?.map((item) => {
    return {
      roomType: item.room_type_id.name,
      ...item,
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
  const { booking, roomsID } = req.body;

  if (!booking) return next(BadRequestError());

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

  const { data: usedRoomRes, error: createUsedRoomError } =
    await usedRoomDAL.createUsedRoom(booking[0]?.id, roomsID);

  if (insertBookingError) return next(insertBookingError);

  res.status(201).send(bookingRes[0]);
};

const deleteBooking = async (req, res, next) => {
  const { id } = req.params;

  const { error } = await bookingDAL.deleteBooking(id);

  if (error) return next(error);

  res.status(204).send();
};

const throwErrorDataUnavailable = () => {
  const err = new Error("Data is not available");
  err.status = 400;
  return err;
};

module.exports = {
  getAllBookings,
  getRooms,
  getBooking,
  createBooking,
  deleteBooking,
};
