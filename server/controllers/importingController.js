const importingDAL = require("../DAL/importingDAL");
const { BadRequestError } = require("../middlewares/errorHandler");
const importingDetailDAL = require("../DAL/importingDetailDAL");
const itemDAL = require("../DAL/itemDAL");

const getAllRecord = async (req, res, next) => {
  const { data: importing, error: getImportingError } =
    await importingDAL.getAllRecords();
  console.log(importing);
  const record = importing?.map((item) => {
    return {
      item: item.item_id?.name,
      ...item,
    };
  });
  if (getImportingError) return next(getImportingError);
  else res.status(200).send(record);
};
const getByID = (req, res, next) => {
  const { id: importingID } = req.params;
  const { data: importing, error: getImportingError } =
    importingDAL.getByID(importingID);
  if (getImportingError) return next(getImportingError);
  else res.status(200).send(getByID(id));
};

const getDeatailByPurchaseID = async (req, res, next) => {
  const { purchaseID } = req.params;

  const { data: purchaseDeatail, error: getPurchaseDeatailError } =
    await importingDAL.getPurchaseDetail(purchaseID);

  if (getPurchaseDeatailError) return next(getPurchaseDeatailError);

  res.status(200).send({ detail: purchaseDeatail, purchase_id: purchaseID });
};

const createRecord = async (req, res, next) => {
  const { record, purchaseDetail } = req.body;

  if (!record || !purchaseDetail) return next(BadRequestError());

  const { data: importData, error: insertImportingError } =
    await importingDAL.createNewRecord({
      ...record,
    });

  if (insertImportingError) return next(insertImportingError);

  const { data: purchaseDetailData, error: insertPDError } =
    await importingDetailDAL.createPurchaseDetail(
      importData[0].id,
      purchaseDetail
    );

  if (insertPDError) throw insertPDError;

  const { data: itemData, error: getItemError } = await itemDAL.getAllItem();

  const promises = purchaseDetail.map((value) => {
    const item = itemData.find((itemTemp) => value.item_id === itemTemp.id);
    return itemDAL.updateItem(
      {
        reserve_amount: item.reserve_amount + value.amount,
      },
      item.id
    );
  });

  const resItemUpdate = await Promise.all(promises).catch((err) => {
    throw err;
  });

  console.log(resItemUpdate);

  res.status(200).send(importData[0]);
};

module.exports = {
  getAllRecord,
  getByID,
  createRecord,
  getDeatailByPurchaseID,
};
