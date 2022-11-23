const featureDAL = require("../DAL/featureDAL");

const getAllFeatures = async (req, res, next) => {
  const { data, error } = await featureDAL.loadAllFeature();
  if (error) return next(error);
  //console.log(data);
  // const temp = [...new Set(data.map((item) => item?.name))];

  // const tempWithName = temp.map((feature) => {
  //   return { name: feature };
  // });

  // {
  //     name: feature.name,
  //     read: { id: "", isCheck: false },
  //     create: { id: "", isCheck: false },
  //     update: { id: "", isCheck: false },
  //     delete: { id: "", isCheck: false },
  //   };
  // }
  let tempArr = [];

  data.forEach((feature, index) => {
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
    if (indexOfTemp === 0 || indexOfTemp) {
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

  res.send({ features: tempArr });
};

const isFeatureExist = (feature, arr) => {
  const index = arr.findIndex((item) => item.name === feature.name);
  //console.log(index);

  return index !== -1 ? index : null;
};

module.exports = { getAllFeatures };
