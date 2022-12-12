const supabase = require('../database');

async function getAllDailyReport()
{
    const{data, error} = supabase
    .from('daily_report')
    .select('*');
    return {data, error};
}
async function getDailyReportByDate(date)
{
    const{data, error} = supabase
    .from('daily_report')
    .select('*')
    .eq('report_date', date);
    return {data, error}
}
async function getAllMonthlyReport()
{
    const{data, error} = await supabase
    .from('monthly_report')
    .select('*');
    return {data, error};
}
async function getMonthlyReportByMonth(month)
{
    const{data, error} = await supabase
    .from('monthly_report')
    .select('*')
    .eq('report_month', month);
}
async function getAllYearlyReport()
{
    const{data, error} = await supabase
    .from('yearly_report')
    .select('*');
    return {data, error};
}
async function getYearlyReportByYear(year)
{
    const {data, error} = await supabase
    .from('yearly_report')
    .select('*')
    .eq('report_year', year);
    return {data, error};
}

module.exports = {
    getAllDailyReport,
    getAllMonthlyReport,
    getAllYearlyReport,
    getDailyReportByDate,
    getMonthlyReportByMonth,
    getYearlyReportByYear
}