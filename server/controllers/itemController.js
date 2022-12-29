const itemDAL = require("../DAL/itemDAL");
const employeeDAL = require("../DAL/employeeDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getAllItem = async (req, res, next) => {
  const { data, error } = await itemDAL.getAllItem();
  console.log(data);
  if (error) return next(error);
  else res.status(200).send(data);
};
const getByID = (req, res, next) => {
  const { id: itemID } = req.params;
  const { data: item, error: getItemError } = itemDAL.getByID(itemID);
  if (getItemError) return next(getItemError);
  else res.status(200).send(getByID(id));
};
const createItem = async (req, res, next) => {
  const { item } = req.body;

  if (!item) return next(BadRequestError());

  const { data: createItemData, error: insertItemError } =
    await itemDAL.createNewItem(item);

  if (insertItemError) return next(insertItemError);

  res.status(201).send({ data: createItemData });
};
const updateItem = async (req, res, next) => {
  const { itemID, newItem } = req.body;
  console.log(newItem);

  if (!newItem || !itemID) return next(BadRequestError());

  const { data: updateItemData, error: updateItemError } =
    await itemDAL.updateItem(newItem, itemID);

  if (updateItemError) return next(updateItemError);

  res.status(200).send(updateItemData);
};

module.exports = {
  getAllItem,
  getByID,
  createItem,
  updateItem,
};
