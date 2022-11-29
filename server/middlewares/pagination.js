const { pagination } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { page, size } = req.query;

  const pageInt = parseInt(page);
  const sizeInt = parseInt(size);

  const limit = sizeInt && sizeInt > 0 ? sizeInt : pagination.LIMIT_DEFAULT;

  const from = pageInt && pageInt > 0 ? pageInt * limit - limit : 0;

  const to = pageInt && pageInt > 0 ? from + limit - 1 : limit - 1;

  console.log(from + " " + to);
  req.paginatedResult = { from, to };
  next();
};
