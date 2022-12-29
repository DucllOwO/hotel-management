const { BadRequestError } = require("../middlewares/errorHandler");
const usedRoomDAL = require("../DAL/usedRoomDAL");

const getItems = async (req, res) => {
  const { bookingID } = req.params;

  if (!bookingID) throw BadRequestError();

  const { data, error } = await usedRoomDAL.getUsedRoomByBookingID(bookingID);

  if (error) throw error;

  res.status(200).send(data);
};

module.exports = { getItems };
