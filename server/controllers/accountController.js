const AccountDAL = require("../DAL/AccountDAL");
const usersAuthDAL = require("../DAL/usersAuthDAL");
const employeeDAL = require("../DAL/employeeDAL");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../middlewares/errorHandler");

const BCRYPT_SALT = 10;

const getAllAccounts = async (req, res, next) => {
  const { data, error } = await AccountDAL.getAllAccount();

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

  const { data: user, error: createUserError } = await usersAuthDAL.createUser({
    email: Account.email,
    password: Account.password,
    email_confirm: true,
  });
  console.log(user);
  if (createUserError) return next(createUserError);

  res.status(201).send("Created");
};

const updateAccount = async (req, res, next) => {
  const { username } = req.params;
  const { Account } = req.body;

  if (!Account) return next(BadRequestError());

  let { username: usernameTemp, oldEmail, ...AccountWithoutUsername } = Account;

  //hash password before update account
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

  //change email of user auth supabase
  if (AccountWithoutUsername?.email) {
    // can't get specific user because don't have uid
    const { data: users, error: getAllError } = await usersAuthDAL.getAllUser();
    if (getAllError) return next(getAllError);

    const user = users.find((user) => user.email === oldEmail);

    if (user) {
      const { error: updateError } = await usersAuthDAL.updateUserById(
        user.id,
        { ...AccountWithoutUsername, password: Account.password }
      );

      if (updateError) return next(updateError);
    }
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

  const { data: users, error } = await AccountDAL.deleteAccount(username);
  if (error) return next(error);

  const email = users[0]?.email;

  if (email) {
    const { data: users, error: getAllError } = await usersAuthDAL.getAllUser();
    if (getAllError) return next(getAllError);

    const user = users.find((user) => user.email === email);

    if (user) {
      const { error: updateError } = await usersAuthDAL.deleteUser(user.id);

      if (updateError) return next(updateError);
    }
  }

  res.status(204).send();
};

module.exports = {
  getAllAccounts,
  createAccount,
  deleteAccount,
  getAccount,
  updateAccount,
};
