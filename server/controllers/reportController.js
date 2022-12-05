const reportDAL = require("../DAL/reportDAL");
const { BadRequestError } = require("../middlewares/errorHandler");

const getDailyReport = async (req, res, next) => {
  console.log("controller called");
  
  const {date, type} = req.query;

  console.log(type)
  
  if(!date || !type)
    return next(BadRequestError());

  if(type === "income"){
    const { data: listReceipt, error: getReceiptError } = await reportDAL.getReceiptByDate(date);
  
    if(getReceiptError)
    return next(getReceiptError);

    const {data: dailyReport, error: getReportError} = await reportDAL.getDailyReportByDate(date);
    
    if(getReportError)
    return next(getReportError);
    res.status(200).send({report: dailyReport, data: listReceipt});
  }
  else{
    const { data: listPayment, error: getPaymentError } = await reportDAL.getPaymentByDate(date);
  
    if(getPaymentError)
    return next(getPaymentError);

    const { data: listPurchase, error: getPurchaseError } = await reportDAL.getPurchaseByDate(date);
  
    if(getPurchaseError)
    return next(getPurchaseError);

    const {data: dailyReport, error: getReportError} = await reportDAL.getDailyReportByDate(date);
    
    if(getReportError)
    return next(getReportError);
    res.status(200).send({report: dailyReport, data: [...listPayment, ...listPurchase]});
  }

};

const getMonthlyReport = async (req, res, next) => {
  const {month} = req.query;
  
  if(!month)
  return next(BadRequestError());

  const {data: monthlyReport, error: getReportError} = await reportDAL.getMonthlyReportByMonth(month);
  
  if(getReportError)
  return next(getReportError);
 
  const { data: listDailyReport, error: getDailyReportError } = await reportDAL.getDailyReportByMonth(monthlyReport?.month); 
  
  if(getDailyReportError)
  return next(getDailyReportError);

  res.status(200).send({report: monthlyReport, data: listDailyReport});
}
const getYearlyReport = async (req, res, next) => {
    const {year} = req.query;
  
    if(!year)
      return next(BadRequestError());
    const { data: listMonlyReport, error: getMonthReportError } = await reportDAL.getMonthlyReportByYear(year);
    
    if(getMonthReportError)
    return next(getMonthReportError);
  
    const {data: monthlyReport, error: getReportError} = await reportDAL.getMonthlyReportByYear(year);
    
    if(getReportError)
    return next(getReportError);
  
    res.status(200).send({report: monthlyReport, data: listMonlyReport});
  }
module.exports = {
    getDailyReport,
    getMonthlyReport,
    getYearlyReport
}