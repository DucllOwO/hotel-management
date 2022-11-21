const featureDAL = require("../DAL/featureDAL");

const getAllFeatures = async (req, res, next) => {
  const { data, error } = await featureDAL.loadAllFeature();
  if (error) return next(error);

  const temp = [...new Set(data.map((item) => item?.name))];

  const tempWithName = temp.map((feature) => {
    return { name: feature };
  });
  res.send({ features: tempWithName });
};

module.exports = { getAllFeatures };
