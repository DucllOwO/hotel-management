const voucherDAL = require("../DAL/voucherDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getAllVoucher = async (req, res, next) => {
  const { data, error } = await voucherDAL.getAllVoucher();

  if (error) return next(error);

  res.status(200).send(data);
};

const getVoucher = async (req, res, next) => {
  const { id } = req.params;

  const { data, error } = await voucherDAL.getVoucher(id);

  if (error) return next(error);

  res.status(200).send(data);
};

const createVoucher = async (req, res, next) => {
  const { voucher } = req.body;
  if (!voucher) return next(BadRequestError());

  const { data, error } = await voucherDAL.insertVoucher(voucher);

  if (error) return next(error);

  res.status(201).send(data);
};

const hideVoucher = async (req, res, next) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (isActive == null || isActive == undefined) return next(BadRequestError());

  const { error } = await voucherDAL.changeActiveVoucher(id, isActive);

  if (error) return next(error);

  res.status(204).send();
};

module.exports = {
  getAllVoucher,
  createVoucher,
  hideVoucher,
  getVoucher,
};
