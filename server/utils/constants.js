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
  INVENTORY: "inventory_record",
  SERVICE: "service",
  DAILYREPORT: "daily_report",
  MONTHLYREPORT: "monthly_report",
  YEARLYREPORT: "yearly_report",
  ITEM: "item",
  FEATURE: "feature",
  RECEIPT: "invoice",
};

const roomStatus = {
  AVAILABLE: 0,
  USING: 1,
  CLEANING: 2,
};

const bookingStatus = {
  WAITING: 0,
  USING: 1,
  COMPLETE: 2,
  CANCEL: 3,
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
