const importingDAL = require("../DAL/importingDAL");
const employeeDAL = require("../DAL/employeeDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getAllRecord = async (req, res, next) => {
  const { data: importing, error: getImportingError } =
    await importingDAL.getAllRecords();
    console.log(importing)
    const record = importing?.map((item) => {
      return {
        item: item.item_id?.name,
        ...item
      }
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
const createRecord = async (req, res, next) => {
  const { importing, item, employee } = req.body;

  if (!importing || !item || !employee) return next(BadRequestError());

  const { error: insertImportingError } = await importingDAL.createNewRecord({
    employee_id: employee?.id,
    ...importing,
  });

  if (insertImportingError) return next(insertImportingError);

  res.status(201).send("Created");
};

module.exports = {
  getAllRecord,
  getByID,
  createRecord,
};
