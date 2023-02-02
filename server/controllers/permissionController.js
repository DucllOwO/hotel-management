const permissionDAL = require("../DAL/permissionDAL");

const getAllPermission = async (req, res, next) => {
  //  /api/positions/1/permissions/
  const positionID = req.baseUrl.split("/")[3];
  const { data, error } = await permissionDAL.getPermissionByPositionID(
    positionID
  );
  
  console.log(data);
  
  //return distinct array feature_id.name
  const temp = [...new Set(data.map((item) => item?.feature_id.name))];
  
  error ? next(error) : res.status(200).send(temp);
};

module.exports = {
  getAllPermission,
};
