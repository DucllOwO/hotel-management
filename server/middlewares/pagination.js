const { pagination } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { page, size } = req.query;

  const pageInt = parseInt(page);
  const sizeInt = parseInt(size);

  const limit = size ? sizeInt : pagination.LIMIT_DEFAULT;

  const from = page ? pageInt * limit - limit : 0;

  const to = page ? from + limit - 1 : limit - 1;

  console.log(from + " " + to);
  req.paginatedResult = { from, to };
  next();
};
