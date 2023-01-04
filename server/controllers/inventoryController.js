const inventoryDAL = require("../DAL/inventoryDAL");
const bookingDAL = require("../DAL/bookingDAL");
const roomDAL = require("../DAL/roomDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getAll = async (req, res, next) => {
  const { data, error } = await inventoryDAL.getAllInventories();
  if (error) return next(error);
  return data;
};

const getRecordByBookingID = async (req, res, next) => {
  const { booking_id } = req.query;

  if (!booking_id) return next(BadRequestError);

  const { data: inventoryRecord, error: getInventoryError } =
    await inventoryDAL.getInventoryByBookingID(booking_id);

  if (getInventoryError) return next(getInventoryError);

  if (inventoryRecord.length !== 0) {
    const recordID = inventoryRecord.map((value) => value.id);
    const { data: inventoryDetail, error: getInventoryDetailError } =
      await inventoryDAL.getInventoryDetail(recordID);

    if (getInventoryDetailError) return next(getInventoryDetailError);

    let result = [];
    for (const ele of inventoryRecord) {
      const temp = inventoryDetail.filter(
        (value) => value.record_id === ele.id
      );
      if (temp) {
        result.push({ room_id: ele.room_id, inventory_detail: temp });
      }
    }

    // const listItemUsed = inventoryDetail.map((value, index, arr) => {
    //   return {
    //     item_id: value.item_id.id,
    //     item_name: value.item_id.name,
    //     price: value.price,
    //     amount: value.amount,
    //     record_id: value.record_id,
    //   };
    // });
    res.status(200).send(result);
  } else res.status(200).send([]);
  // console.log(inventoryDetail)
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

  const listBookingID = listBooking.map((value) => value.id);

  if (getBookByStatusError) return next(getBookByStatusError);

  const { data: listRoom, error: getUsingRoomError } =
    await roomDAL.getUsingRoom(listBookingID);

  console.log(listRoom);
  if (getUsingRoomError) return next(getUsingRoomError);

  const returnList = listRoom?.map((value) => {
    return {
      booking_id: value.booking_id,
      room_name: value.room_id.room_name,
      room_type: value.room_id.room_type_id.name,
      area: value.room_id.room_type_id.area,
    };
  });

  res.status(200).send(returnList);
};

module.exports = {
  getBookingByStatus,
  createRecord,
  getRecordByBookingID,
  createDetail,
};
