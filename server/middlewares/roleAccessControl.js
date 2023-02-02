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
      // console.log(grantList)
      //console.log(JSON.stringify(grantList) + " 16");
      return grantList;
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const initAccessControl = async () => {
  ac.setGrants(await initGrantList());
  //console.log(JSON.stringify(ac));
};

const hasPermission = (action, resource) => {
  return (req, res, next) => {
    try {
      //axios method GET don't support send body data so use with query instead;
      const { user } =
        Object.keys(req.body).length !== 0 ? req.body : req.query;
      const userPosition = user?.position;
      switch (action) {
        case "get":
          permissions = ac.can(userPosition).readAny(resource);
          if (permissions.granted) {
            next();
          } else {
            const error = new Error(`We don't have that resource`);
            error.status = 501;
            next(error);
          }
          break;
        case "update":
          permissions = ac.can(userPosition).updateAny(resource);
          if (permissions.granted) {
            next();
          } else {
            const error = new Error(`We don't have that resource`);
            error.status = 501;
            next(error);
          }
          break;
        case "delete":
          permissions = ac.can(userPosition).deleteAny(resource);
          if (permissions.granted) {
            next();
          } else {
            const error = new Error(`We don't have that resource`);
            error.status = 501;
            next(error);
          }
          break;
        case "create":
          permissions = ac.can(userPosition).createAny(resource);
          if (permissions.granted) {
            next();
          } else {
            const error = new Error(`We don't have that resource`);
            error.status = 501;
            next(error);
          }
          break;
        default:
          const error = new Error(`Don't have any resource specify`);
          error.status = 403;
          next(error);
          break;
      }
    } catch (error) {
      console.log(error.message);
      error.status = 403;
      next(error);
    }
  };
};

module.exports = { hasPermission, initAccessControl };
