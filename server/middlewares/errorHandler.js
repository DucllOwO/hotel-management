const BadRequestError = () => {
  const err = new Error("Bad request");
  err.status = 400;
  return err;
};

const handle404Error = (req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
};

const handleOtherError = (error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message + " (error handler middleware)",
    },
  });
};

const tryCatch = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  handle404Error,
  handleOtherError,
  tryCatch,
  BadRequestError,
};
