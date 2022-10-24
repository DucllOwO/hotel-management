const AccessControl = require("accesscontrol");
const { loadAllPermission } = require("../DAL/permissionDAL");

//import load position permission dal

const ac = new AccessControl();

const initGrantList = async () => {
  try {
    const { data, error } = await loadAllPermission();
    if (data) {
      const grantList = data.map((permission) => {
        return {
          role: permission?.position_id.name,
          action: permission?.feature_id.action,
          resource: permission?.feature_id.resource,
        };
      });
      console.log(JSON.stringify(grantList) + " 16");
      return grantList;
    }
    console.log("init access control return a empty array");
    return [];
  } catch (err) {
    console.log(err.message + "");
    return [];
  }
};

const initAccessControl = async () => {
  ac.setGrants(await initGrantList());
};

const hasPermission = (action, resource) => {
  return (req, res, next) => {
    try {
      const { user } = req.body;
      const userPosition = user?.position;
      switch (action) {
        case "get":
          permissions = ac.can(userPosition).readAny(resource);
          if (permissions.granted) {
            next();
          }
          break;
        case "update":
          permissions = ac.can(userPosition).updateAny(resource);
          if (permissions.granted) {
            next();
          }
          break;
        case "delete":
          permissions = ac.can(userPosition).deleteAny(resource);
          if (permissions.granted) {
            next();
          }
          break;
        case "create":
          permissions = ac.can(userPosition).createAny(resource);
          if (permissions.granted) {
            next();
          }
          break;
        default:
          const error = new Error(`Don't have any resource specify`);
          error.status = 403;
          next(error);
          break;
      }
    } catch (error) {
      error.status = 403;
      next(error);
    }
  };
};

module.exports = { hasPermission, initAccessControl };
