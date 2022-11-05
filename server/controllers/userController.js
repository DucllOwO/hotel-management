const customerDAL = require("../DAL/customerDAL");
const employeeDAL = require("../DAL/employeeDAL");
const accountDAL = require("../DAL/AccountDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getAllUsers = async (req, res, next) => {
  const { type } = req.query;

  if (!type) return next(BadRequestError());

  switch (type) {
    case "customer":
      const { data: customers, error: getCustomerError } =
        await customerDAL.getAllCustomer();
      if (getCustomerError) return next(getCustomerError);
      return res.status(200).send({ customers });
    case "employee":
      const { data: employees, error: getEmployeesError } =
        await employeeDAL.getAllEmployee();
      if (getEmployeesError) return next(getEmployeesError);
      return res.status(200).send({ employees });
    default:
      console.log("getAllUsers switch case default call");
      break;
  }
};

const getUser = async (req, res, next) => {
  const { type } = req.query;
  const { id } = req.params;

  if (!type) return next(BadRequestError());

  switch (type) {
    case "customer":
      const { data: customer, error: getCustomerError } =
        await customerDAL.getCustomerByID(id);

      if (getCustomerError) return next(getCustomerError);

      return res.status(200).send({ customer });
    case "employee":
      const { data: employee, error: getEmployeeError } =
        await employeeDAL.getEmployeeByID();

      if (getEmployeeError) return next(getEmployeeError);

      return res.status(200).send({ employee });
    default:
      console.log("getUser switch case default call");
      break;
  }
};

const createUser = async (req, res, next) => {
  const { type } = req.query;
  const { userInfo } = req.body;

  if (!type || !userInfo) return next(BadRequestError());

  switch (type) {
    case "customer":
      const { error: insertCustomerError } = await customerDAL.insertCustomer(
        userInfo
      );
      if (insertCustomerError) return next(insertCustomerError);
      return res.status(201).send();
    case "employee":
      const { error: insertEmployeesError } = await employeeDAL.insertEmployee(
        userInfo
      );
      if (insertEmployeesError) return next(insertEmployeesError);

      return res.status(201).send();
    default:
      console.log("createUser switch case default call");
      break;
  }
};

const updateUser = async (req, res, next) => {
  const { type } = req.query;
  const { id } = req.params;
  const { userInfo } = req.body;

  if (!type || !userInfo) return next(BadRequestError());

  //to ensure that don't update primary key
  const { id: idTemp, ...userWithoutID } = userInfo;

  switch (type) {
    case "customer":
      const { error: updateCustomerError } = await customerDAL.updateCustomer(
        userWithoutID,
        id
      );
      if (updateCustomerError) return next(updateCustomerError);
      return res.status(204).send();
    case "employee":
      const { error: updateEmployeesError } = await employeeDAL.updateEmployee(
        userWithoutID,
        id
      );
      if (updateEmployeesError) return next(updateEmployeesError);
      return res.status(204).send();
    default:
      console.log("updateUser switch case default call");
      break;
  }
};

const deleteUser = async (req, res, next) => {
  const { type } = req.query;
  const { id } = req.params;

  if (!type) return next(BadRequestError());

  switch (type) {
    case "customer":
      const { error: deleteCustomerError } = await customerDAL.deleteCustomer(
        id
      );
      if (deleteCustomerError) return next(deleteCustomerError);
      return res.status(204).send();
    case "employee":
      const { error: deleteEmployeesError } = await employeeDAL.deleteEmployee(
        id
      );
      if (deleteEmployeesError) return next(deleteEmployeesError);
      return res.status(204).send();
    default:
      console.log("deleteUser switch case default call");
      break;
  }
};

// const getMyAccount = async (req, res, next) => {
//   res.send("getAllUser route");
// };

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
