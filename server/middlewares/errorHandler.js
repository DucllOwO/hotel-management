const handle404Error = (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
};

const handle500Error = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

module.exports = { handle404Error, handle500Error };