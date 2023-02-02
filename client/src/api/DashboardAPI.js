import { userRequest } from "./api";

export const fetchDailyReport = (positionUser, date, type) => {
  return userRequest.get("/reports/daily_report", {
    params: { user: { position: positionUser }, date: date, type: type },
  });
};

export const fetchMonthlyReport = (positionUser, month) => {
  return userRequest.get("/reports/monthly_report", {
    params: { user: { position: positionUser }, month: month },
  });
};

export const fetchYearlyReport = (positionUser, year) => {
  return userRequest.get("/reports/yearly_report", {
    params: { user: { position: positionUser }, year: year },
  });
};
