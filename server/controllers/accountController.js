const AccountDAL = require("../DAL/AccountDAL");
const usersAuthDAL = require("../DAL/usersAuthDAL");
const employeeDAL = require("../DAL/employeeDAL");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../middlewares/errorHandler");

const BCRYPT_SALT = 10;

const getAllAccounts = async (req, res, next) => {
  const { data, error } = await AccountDAL.getAllAccount();

  if (error) return next(error);

  res.status(200).send(data);
};

const getAccount = async (req, res, next) => {
  const { username } = req.params;

  const { data, error } = await AccountDAL.getAccount(username);

  if (error) return next(error);

  res.status(200).send(data);
};

const createAccount = async (req, res, next) => {
  const { account } = req.body;

  if (!account) return next(BadRequestError());

  const hashPassword = await bcrypt.hash(account?.password, BCRYPT_SALT);
  console.log(hashPassword);

  const { data, error } = await AccountDAL.insertAccount({
    ...account,
    password: hashPassword,
  });

  if (error) {
    error.status = 409;
    return next(error);
  }

  // const { data: user, error: createUserError } = await usersAuthDAL.createUser({
  //   email: account.email,
  //   password: account.password,
  //   email_confirm: true,
  // });
  // console.log(user);
  // if (createUserError) return next(createUserError);

  res.status(201).send(data);
};

const updateAccount = async (req, res, next) => {
  const { username } = req.params;
  const { account } = req.body;

  if (!account?.password) return next(BadRequestError());

  const hashPassword = await bcrypt.hash(account?.password, BCRYPT_SALT);

  const { error } = await AccountDAL.updateAccount(hashPassword, username);

  if (error) return next(error);

  res.status(204).send();
};

const deleteAccount = async (req, res, next) => {
  const { username } = req.params;

  const { data: users, error } = await AccountDAL.deleteAccount(username);

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
