const positionDAL = require("../DAL/positionDAL");
const permissionDAL = require("../DAL/permissionDAL");
const { initAccessControl } = require("../middlewares/roleAccessControl");

const getAllPosition = async (req, res) => {
  const { data, error } = await positionDAL.loadAllPosition();
  res.send(JSON.stringify(data));
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
  const { position, updateFeatureList } = req.body;
  if (position?.editedName) {
    const error = await positionDAL.updatePositionName(
      id,
      position?.editedName
    );
    error && next(error);
  }
  // console.log(id);
  // console.log(JSON.stringify(updateFeatureList));
  if (updateFeatureList.length > 0) {
    const data = await Promise.all(createPromises(updateFeatureList, id));
  }
  if (position?.editedName && updateFeatureList.length > 0) initAccessControl();
  res.status(204).send();
};

const deletePosition = async (req, res, next) => {
  const idPosition = req.params?.id;
  console.log(idPosition);
  if (idPosition) {
    const { error } = await positionDAL.deletePosition(idPosition);
    // update AC
    initAccessControl();
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
  const { position, createFeatureList } = req.body;
  //console.log(position);
  let idCreatedPosition;
  if (position?.name) {
    const { data, error } = await positionDAL.createPosition(position?.name);
    idCreatedPosition = data[0].id;
    error && next(error);
  }
  if (createFeatureList.length > 0) {
    const data = await Promise.all(
      createPromises(createFeatureList, idCreatedPosition)
    );
  }
  if (position?.editedName && createFeatureList.length > 0) initAccessControl();
  res.status(201).send("Created");
};

const createPromises = (features, positionID) => {
  return features.map((feature) => {
    switch (feature?.action) {
      case "add":
        const addPromise = permissionDAL
          .addPermission(positionID, feature.id)
          .catch((err) => {
            next(err);
          });
        return addPromise;
      case "remove":
        const removePromise = permissionDAL
          .removePermission(positionID, feature.id)
          .catch((err) => {
            next(err);
          });
        return removePromise;
      default:
        const badReqError = new Error(`Permission don't have action!`);
        badReqError.status = 400;
        return badReqError;
    }
  });
};

module.exports = {
  getAllPosition,
  createPosition,
  updatePosition,
  deletePosition,
};
