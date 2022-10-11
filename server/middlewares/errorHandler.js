const handle404Error = (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
};

const handleOtherError = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
};

module.exports = { handle404Error, handleOtherError };
