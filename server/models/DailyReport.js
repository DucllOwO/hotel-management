import supabase from "../database";
const Report = require("Report");


class DailyReport extends Report{
    reportDate;
    
    async getReport()
    {
        const {data, error} = await supabase
        .from(DailyReport)
        .select('*')
        .eq('DailyReport.Report_date', this.reportDate);
        if(error)
        {
            console.log(error);
        }
        else
        {
            return data;
        }
    }
}
