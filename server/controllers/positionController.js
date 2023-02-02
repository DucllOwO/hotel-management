const positionDAL = require("../DAL/positionDAL");
const permissionDAL = require("../DAL/permissionDAL");
const featureDAL = require("../DAL/featureDAL");
const { createFeatureCheckList } = require("../controllers/featureController");
const { initAccessControl } = require("../middlewares/roleAccessControl");

const getAllPosition = async (req, res, next) => {
  const { data, error } = await positionDAL.loadAllPosition();
  if (error) next(error);
  res.send(data);
};

const getPosition = async (req, res, next) => {
  const { id } = req.params;

  const { data: permissions, error: getPermissionsError } =
    await permissionDAL.getPermissionByPositionID(id);
  if (getPermissionsError) next(getPermissionsError);

  const { data: features, error: getFeaturesError } =
    await featureDAL.loadAllFeature();
  if (getFeaturesError) return next(getFeaturesError);

  let featuresCheckList = createFeatureCheckList(features);

  res.send(createPositionData(permissions, featuresCheckList));
};

const createPositionData = (permissions, features) => {
  permissions.forEach((permission, index) => {
    //find feature.name in permissions
    const indexFeature = features.findIndex(
      (feature) => permission.feature_id.name === feature.name
    );

    const tempFeature = features[indexFeature];

    if (indexFeature >= 0) {
      const action = permission.feature_id.action.split(":")[0];

      features[indexFeature] = {
        ...tempFeature,
        [action]: {
          ...tempFeature[action],
          isCheck: true,
        },
      };
    }
  });

  return features;
};

/**
 *{
  "user" : {
    "position": "admin"
  },
  "position" : {
    "editedName" : "admin"
  },
  "updateFeatureList" : [
    {"id": "5", "action": "add"},
    {"id": "2", "action": "remove"}
    ]
}
 */
const updatePosition = async (req, res, next) => {
  const { id } = req.params;
  const { position, featuresForAddPermissions, featuresForRemovePermissions } =
    req.body;
  if (position?.editedName) {
    const error = await positionDAL.updatePositionName(
      id,
      position?.editedName
    );
    if (error) return next(error);
  }
  // console.log(id);
  // console.log(JSON.stringify(updateFeatureList));
  if (featuresForAddPermissions?.length > 0) {
    const { error: addError } = await permissionDAL.addPermissions(
      id,
      featuresForAddPermissions
    );
    if (addError) return next(addError);
  }
  if (featuresForRemovePermissions?.length > 0) {
    const { error: removeError } = await permissionDAL.removePermission(
      id,
      featuresForRemovePermissions
    );
    if (removeError) return next(removeError);
  }
  if (
    position?.editedName ||
    featuresForAddPermissions?.length > 0 ||
    featuresForRemovePermissions?.length > 0
  )
    await initAccessControl();
  res.status(204).send();
};

const deletePosition = async (req, res, next) => {
  const idPosition = req.params?.id;
  console.log(idPosition);
  if (idPosition) {
    const { error } = await positionDAL.deletePosition(idPosition);
    // update AC
    await initAccessControl();
    return error ? next(error) : res.status(204).send();
  }
  res.status(400).send("Bad Request");
};

// const bodyCreatePositionData = {
//   position: { name: "labor" },
//   createFeatureList: [
//     { id: 1, action: "add" },
//     { id: 2, action: "add" },
//     { id: 3, action: "add" },
//   ],
// };
const createPosition = async (req, res, next) => {
  const { position, featuresForAddPermissions } = req.body;
  //console.log(position);
  let idCreatedPosition;
  let positionRes;
  if (position?.name) {
    const { data, error } = await positionDAL.createPosition(position?.name);
    if (error) return next(error);
    idCreatedPosition = data[0].id;
    positionRes = data[0];
  }
  if (featuresForAddPermissions.length > 0 && idCreatedPosition) {
    const data = await permissionDAL.addPermissions(
      idCreatedPosition,
      featuresForAddPermissions
    );
  }
  if (position?.name && featuresForAddPermissions.length > 0)
    await initAccessControl();

  res.status(201).send(positionRes);
};

module.exports = {
  getAllPosition,
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
};
