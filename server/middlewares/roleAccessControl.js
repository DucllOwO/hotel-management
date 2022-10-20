const ac = require('accesscontrol')
//import load position feature dal

const loadPositionFeature = () => {
  // write in DAL 
}

const initAccessControl = () => {
  
}

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body;
    const { asset } = req.params;
    const userRoles = resolveUserRoles(user);
    const allowed = userRoles.reduce((perms, role) => {
      let permissions;
      switch (action) {
        case "gather":
          permissions = ac.can(role).readAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
        case "consume":
          permissions = ac.can(role).updateAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
        case "destroy":
          permissions = ac.can(role).deleteAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
      }
      return perms;
    }, []);

    if (allowed.length) {
      const result = allowed.map((perm) => {
        const data = assets[asset];
        return {
          data: perm.filter(data),
          asRole: perm._.role,
        };
      });

      res.locals = result;
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
};

module.exports = { hasPermission, initAccessControl};