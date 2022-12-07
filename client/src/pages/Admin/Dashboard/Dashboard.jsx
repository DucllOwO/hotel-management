import React, { useState } from "react";
import "../../../assets/colors/Colors";
import { Button, Card, Col, Row, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import "./dashboard.css";
import { getMonth, getYear } from "../../../Utils/helpers";
import { fetchDailyReport, fetchMonthlyReport, fetchYearlyReport } from "../../../api/DashboardAPI";
import MultiLineChart from "../../../components/Chart/MultiLineChart";
import DashboardTable from "../Tables/Dashboard/DashboardTable";
import { useEffect } from "react";
import {AppContext} from "../../../context/AppContext"; 
import { useContext } from "react";

const dateFormat = "DD-MM-YYYY";
const monthFormat = "MM-YYYY";

const Dashboard = () => {
  const [type, setType] = useState("day");
  const [data, setData] = useState([]);
  const [report, setReport] = useState([]);
  const [semiType, setSemiType] = useState("income");
  const [time, setTime] = useState(moment.utc);
  const {user} = useContext(AppContext)

  useEffect(() => {
    switch (type) {
      case "day":
        console.log(semiType)
        if(semiType ==="income"){
          fetchDailyReport(user?.position, time, semiType)
          .then(({ data }) => {
            console.log(data);
            setData(data.data);
            setReport(data.report);
            console.log(report)
          });}
        else{
          fetchDailyReport(user?.position, time, semiType)
          .then(({ data }) => {
            console.log(data);
            setData(data.data);
            setReport(data.report);
          });
        }
        break;
      case "month":
        console.log(time);
        fetchMonthlyReport(user?.position, time)
        .then(({ data }) => {
          console.log(data);
          setData(data.data);
          setReport(data.report);
          // console.log(report)
        }); 
        break;
      case "year":
        fetchYearlyReport(user?.position, time)
        .then(({ data }) => {
          console.log(data);
          setData(data.data);
          setReport(data.report);
          // console.log(report)
        });
        break;
      default:
        break;
    }
  }, [type, time, semiType])

  return (
    <div className="container">
      <div className="dashboardContainer">
        <div className="buttonContainer">
          <div>
            <Button
              className="dateBtn"
              type={type === "year" ? "primary" : "default"}
              onClick={() => {
                setType("year");
                setTime(Date.UTC());
              }}
            >
              Năm
            </Button>
            <Button
              className="dateBtn"
              type={type === "month" ? "primary" : "default"}
              onClick={() => {
                setType("month");
                setTime(moment.utc);
              }}
            >
              Tháng
            </Button>
            <Button
              className="dateBtn"
              type={type === "day" ? "primary" : "default"}
              onClick={() => {
                setType("day");
                setTime(moment.utc);
              }}
            >
              Ngày
            </Button>
          </div>
          <div>
            <div>
              {type === "day" && (
                 <DatePicker
                 defaultValue={moment()}
                 onChange={(values)=>{setTime(values._d);}}
                 picker="date"
                 format={dateFormat}
               ></DatePicker>
              )}
              {type === "month" && (
                <DatePicker
                  defaultValue={moment()}
                  picker="month"
                  onChange={(values)=>{setTime(getMonth(values._d));}}
                  format={monthFormat}
                ></DatePicker>
              )}
              {type === "year" && (
                <DatePicker
                  picker="year"
                  defaultValue={moment()}
                  onChange={(values)=>{setTime(getYear(values._d))}}
                ></DatePicker>
              )}
            </div>
          </div>
        </div>
        <div className="sumary">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Tổng doanh thu">{report[0]?.income}</Card>
            </Col>
            <Col span={8}>
              <Card title="Tổng chi phí">{report[0]?.outcome}</Card>
            </Col>
            <Col span={8}>
              <Card title="Tổng lợi nhuận">{report[0]?.profit}</Card>
            </Col>
          </Row>
        </div>
        { type ==="day" && <div>
          <Button
            className="dateBtn"
            onClick={() => {
              setSemiType("income");
            }}
          >
            Thu
          </Button>
          <Button
            className="dateBtn"
            onClick={() => {
              setSemiType("outcome");
            }}
          >
            Chi
          </Button>
        </div>}
        {/* {type === "day" ? <DashboardTable /> : <MultiLineChart />} */}
        {(type === "day") 
        ? <DashboardTable
        data = {data}
        ></DashboardTable>
        : 
        <MultiLineChart reportData={data}/>
        }
      </div>
    </div>
  );
};

export default Dashboard;
