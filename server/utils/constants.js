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
  ACCOUNT: "account",
  BOOKING: "booking",
  REPORT: "report",
  ROOM: "room",
  ROOM_FEATURE: "room_feature",
  VOUCHER: "voucher",
  POSITION: "position",
  PERMISSION: "permission",
  PURCHASE: "purchase",
  PAYMENT: "payment",
  CUSTOMER: "customer",
  ROOMTYPE: "room_type",
  USER: "user",
  INVENTORY: "inventory",
  SERVICE: "service",
  ITEM: "item",
  FEATURE: "feature",
};

const roomStatus = {
  AVAILABLE: 0,
  BOOKED: 1,
  WAITING: 2,
};

const pagination = {
  LIMIT_DEFAULT: 10,
};

module.exports = {
  httpStatusCodes,
  actionAC,
  resourceAC,
  roomStatus,
  pagination,
};
