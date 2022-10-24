const handle404Error = (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

const handleOtherError = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message + " error handler",
    },
  });
};

module.exports = { handle404Error, handleOtherError };
