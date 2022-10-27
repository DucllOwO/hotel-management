const permissionDAL = require("../DAL/permissionDAL");

const getAllPermission = async (req, res, next) => {
  //  /api/positions/1/permissions/
  const positionID = req.baseUrl.split("/")[3];
  const { data, error } = await permissionDAL.getPermissionByPositionID(
    positionID
  );
  error ? next(error) : res.status(200).send(data);
};

module.exports = {
  getAllPermission,
};
