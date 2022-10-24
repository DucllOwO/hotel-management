const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

const actionAC = {
  GET: "get",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};

const resourceAC = {
  BOOKING: "booking",
  EMPLOYEE: "employee",
  REPORT: "report",
  ROOM: "room",
  VOUCHER: "voucher",
};

module.exports = { httpStatusCodes, actionAC, resourceAC };
