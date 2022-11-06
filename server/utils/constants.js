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
  REPORT: "report",
  ROOM: "room",
  VOUCHER: "voucher",
  POSITION: "position",
  PERMISSION: "permission",
  PURCHASE: "purchase",
  PAYMENT: "payment",
  CUSTOMER: "customer",
  ROOMTYPE: "roomtype",
  USER: "user",
  INVENTORY: "inventory",
  SERVICE: "service",
};

const roomStatus = {
  AVAILABLE: 0,
  BOOKED: 1,
  WAITING: 2,
};

module.exports = { httpStatusCodes, actionAC, resourceAC, roomStatus };
