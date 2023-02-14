const inventoryDAL = require("../DAL/inventoryDAL");
const bookingDAL = require("../DAL/BookingDAL");
const roomDAL = require("../DAL/roomDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getRecordByBookingID = async (req, res, next) => {
  const { booking_id, room_id } = req.query;

  if (!booking_id) return next(BadRequestError);

  const query = room_id
    ? inventoryDAL.getInventoryByBookingID(booking_id, room_id)
    : inventoryDAL.getInventoryByBookingID(booking_id);

  const { data: inventoryRecord, error: getInventoryError } = await query;

  if (getInventoryError) return next(getInventoryError);

  if (inventoryRecord.length !== 0) {
    const recordID = inventoryRecord.map((value) => value.id);
    const { data: inventoryDetail, error: getInventoryDetailError } =
      await inventoryDAL.getInventoryDetail(recordID);

    if (getInventoryDetailError) return next(getInventoryDetailError);

    let result = [];
    for (const ele of inventoryRecord) {
      const temp = inventoryDetail.filter(
        (value) => value.record_id.id === ele.id
      );
      if (temp) {
        result.push({
          detail_id: temp.id,
          room_id: ele.room_id,
          inventory_detail: temp,
        });
      }
    }

    res.status(200).send(result);
  } else res.status(200).send([]);
};
const createRecord = async (req, res, next) => {
  const { record } = req.body;

  if (!record) return next(BadRequestError);

  const { data, error: insertRecordError } = await inventoryDAL.createNewRecord(
    { ...record }
  );
  console.log(data);

  if (insertRecordError) return next(insertRecordError);

  res.status(201).send(data);
};
const createDetail = async (req, res, next) => {
  const { detail } = req.body;

  if (!detail) return next(BadRequestError);

  const { data, error: insertDetailError } = await inventoryDAL.createDetail({
    ...detail,
  });

  if (insertDetailError) return next(insertDetailError);

  res.status(201).send(data);
};

const getBookingByStatus = async (req, res, next) => {
  const { status } = req.query;

  if (!status) return next(BadRequestError);

  const { data: listBooking, error: getBookByStatusError } =
    await bookingDAL.getBookingByStatus(status);

  if (getBookByStatusError) return next(getBookByStatusError);

  const listBookingID = listBooking.map((value) => value.id);

  const { data: listRoom, error: getUsingRoomError } =
    await roomDAL.getUsingRoom(listBookingID);

  if (getUsingRoomError) return next(getUsingRoomError);

  const returnList = listRoom?.map((value) => {
    return {
      used_room_id: value.id,
      room_id: value.room_id.id,
      booking_id: value.booking_id,
      room_name: value.room_id.room_name,
      room_type: value.room_id.room_type_id.name,
      area: value.room_id.room_type_id.area,
    };
  });

  console.log(returnList);

  res.status(200).send(returnList);
};

module.exports = {
  getBookingByStatus,
  createRecord,
  getRecordByBookingID,
  createDetail,
};
