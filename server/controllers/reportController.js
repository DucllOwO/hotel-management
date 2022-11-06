const reportDAL = require('../DAL/reportDAL');

const getAllReports = (req, res, next) => {
  const { type } = req.query;

  if (!type) return next(BadRequestError())
  
  switch (type) {
    case "daily_report":
      const { data: dailyReport, error: getDailyReportError } =
        reportDAL.getAllDailyReport();

      if (getReportError) return next(getReportError);

      return res.status(200).send({ dailyReport });
    case "monthly_report":
      const { data: monthlyReport, error: getMonthlyReportError } =
        reportDAL.getAllMonthlyReport();

      if (getMonthlyReportError) return next(getMonthlyReportError);

      return res.status(200).send({ monthlyReport });
      
    case "monthly_report":
      const { data: yearlyReport, error: getYearlyReportError } =
        reportDAL.getAllMonthlyReport();

      if (getYearlyReportError) return next(getYearlyReportError);

      return res.status(200).send({ yearlyReport });
    default:
      console.log("getReport switch case default call");
      break;
  }

};

const getReport = (req, res) => {
  const { type } = req.query;
  const { time } = req.params;

  if (!type) return next(BadRequestError());

  switch (type) {
    case "daily_report":
      const { data: dailyReport, error: getDailyReportError } =
        reportDAL.getDailyReportByDate(time);

      if (getReportError) return next(getReportError);

      return res.status(200).send({ dailyReport });
    case "monthly_report":
      const { data: monthlyReport, error: getMonthlyReportError } =
        reportDAL.getMonthlyReportByMonth(time);

      if (getMonthlyReportError) return next(getMonthlyReportError);

      return res.status(200).send({ monthlyReport });
      
    case "monthly_report":
      const { data: yearlyReport, error: getYearlyReportError } =
        reportDAL.getYearlyReportByYear(time);

      if (getYearlyReportError) return next(getYearlyReportError);

      return res.status(200).send({ yearlyReport });
    default:
      console.log("getReport switch case default call");
      break;
  }
};

module.exports = { getAllReports, getReport };
