const featureDAL = require("../DAL/featureDAL");

const getAllFeatures = async (req, res, next) => {
  const { data, error } = await featureDAL.loadAllFeature();
  if (error) return next(error);

  // {
  //     name: feature.name,
  //     read: { id: "", isCheck: false },
  //     create: { id: "", isCheck: false },
  //     update: { id: "", isCheck: false },
  //     delete: { id: "", isCheck: false },
  //   };
  // }

  res.send(createFeatureCheckList(data));
};

const createFeatureCheckList = (features) => {
  // result:
  // "name": "Room",
  //   "read": {
  //     "id": 5,
  //     "isCheck": false
  //   }
  let tempArr = [];

  features.forEach((feature, index) => {
    /** feature
     * {
        id: 6,
        name: 'Room',
        resource: 'room',
        action: 'create:any',
        description: null
      },
     */

    const indexOfTemp = isFeatureExist(feature, tempArr);
    if (indexOfTemp >= 0) {
      tempArr[indexOfTemp] = {
        ...tempArr[indexOfTemp],
        [feature.action.split(":")[0]]: {
          id: feature.id,
          isCheck: false,
        },
      };
    } else {
      tempArr.push({
        name: feature.name,
        [feature.action.split(":")[0]]: { id: feature.id, isCheck: false },
      });
    }
  });

  return tempArr;
};

const isFeatureExist = (feature, arr) => {
  const index = arr.findIndex((item) => item.name === feature.name);
  //console.log(index);

  return index;
};

module.exports = { getAllFeatures, createFeatureCheckList };
