const supabase = require("../database");

async function getDailyReportByDate(date) {
  const { data, error } = await supabase
    .from("daily_report")
    .select("*")
    .eq("date", date)
    .order("date", { ascending: true });
  return { data, error };
}
async function getReceiptByDate(date) {
  console.log(date);
  const { data, error } = await supabase
    .from("invoice")
    .select("*")
    .eq("established_date", date)
    .order("established_date", { ascending: true });
  return { data, error };
}
async function getPaymentByDate(date) {
  console.log(date);
  const { data, error } = await supabase
    .from("payment")
    .select("*")
    .eq("established_date", date)
    .order("established_date", { ascending: true });
  return { data, error };
}
async function getPurchaseByDate(date) {
  console.log(date);
  const { data, error } = await supabase
    .from("purchase")
    .select("*")
    .eq("established_date", date)
    .order("established_date", { ascending: true });
  return { data, error };
}
async function getMonthlyReportByMonth(month) {
  const { data, error } = await supabase
    .from("monthly_report")
    .select("*")
    .eq("month", month.toString());
  return { data, error };
}
async function getDailyReportByMonth(month) {
  const { data, error } = await supabase
    .from("daily_report")
    .select("*")
    .eq("report_month", month)
    .order("date", { ascending: true });
  return { data, error };
}

async function getYearlyReportByYear(year) {
  const { data, error } = await supabase
    .from("yearly_report")
    .select("*")
    .eq("year", year);
  return { data, error };
}
async function getMonthlyReportByYear(year) {
  const { data, error } = await supabase
    .from("monthly_report")
    .select("*")
    .eq("report_year", year)
    .order("month", { ascending: true });
  return { data, error };
}

module.exports = {
  getDailyReportByDate,
  getMonthlyReportByMonth,
  getYearlyReportByYear,
  getDailyReportByMonth,
  getPaymentByDate,
  getPurchaseByDate,
  getMonthlyReportByYear,
  getReceiptByDate,
};
