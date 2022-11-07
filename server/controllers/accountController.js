const AccountDAL = require("../DAL/AccountDAL");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../middlewares/errorHandler");

const BCRYPT_SALT = 10;

const getAllAccounts = async (req, res, next) => {
  const { from, to } = req.paginatedResult;
  const { data, error } = await AccountDAL.getAllAccount(from, to);

  if (error) return next(error);

  res.status(200).send({ data });
};

const getAccount = async (req, res, next) => {
  const { username } = req.params;

  const { data, error } = await AccountDAL.getAccount(username);

  if (error) return next(error);

  res.status(200).send({ data });
};

const createAccount = async (req, res, next) => {
  const { Account } = req.body;
  if (!Account) return next(BadRequestError());

  const hashPassword = await bcrypt.hash(Account?.password, BCRYPT_SALT);
  console.log(hashPassword);

  const { error } = await AccountDAL.insertAccount({
    ...Account,
    password: hashPassword,
  });

  if (error) {
    error.status = 409;
    return next(error);
  }

  res.status(201).send("Created");
};

const updateAccount = async (req, res, next) => {
  const { username } = req.params;
  const { Account } = req.body;

  if (!Account) return next(BadRequestError());
  let { username: usernameTemp, ...AccountWithoutUsername } = Account;

  if (AccountWithoutUsername?.password) {
    const hashPassword = await bcrypt.hash(
      AccountWithoutUsername?.password,
      BCRYPT_SALT
    );

    AccountWithoutUsername = {
      ...AccountWithoutUsername,
      password: hashPassword,
    };
  }

  const { error } = await AccountDAL.updateAccount(
    AccountWithoutUsername,
    username
  );

  if (error) return next(error);

  res.status(204).send();
};

const deleteAccount = async (req, res, next) => {
  const { username } = req.params;

  const { error } = await AccountDAL.deleteAccount(username);

  if (error) return next(error);

  res.status(204).send();
};

module.exports = {
  getAllAccounts,
  createAccount,
  deleteAccount,
  getAccount,
  updateAccount,
};
