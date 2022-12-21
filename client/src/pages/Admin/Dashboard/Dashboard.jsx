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
  const [time, setTime] = useState(dayjs(Date.now()));
  const {user} = useContext(AppContext)
  useEffect(() => {
    switch (type) {
      case "day":
        if(semiType ==="income"){
          fetchDailyReport(user?.position, time, semiType)
          .then(({ data }) => {
            setData(data.data);
            setReport(data.report);
          });}
        else{
          fetchDailyReport(user?.position, time, semiType)
          .then(({ data }) => {
            setData(data.data);
            setReport(data.report);
          });
        }
        break;
      case "month":
        // console.log(time);
        fetchMonthlyReport(user?.position, getMonth(time))
        .then(({ data }) => {
          setData(data.data);
          setReport(data.report);
        }); 
        break;
      case "year":
        // console.log(time);
        // console.log(getYear(time));
        fetchYearlyReport(user?.position, getYear(time))
        .then(({ data }) => {
          setData(data.data);
          setReport(data.report);
        });
        break;
      default:
        break;
    }
  }, [time, semiType, type])

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
                setTime(dayjs(Date.now()));
              }}
            >
              Year
            </Button>
            <Button
              className="dateBtn"
              type={type === "month" ? "primary" : "default"}
              onClick={() => {
                setType("month");
                setTime(dayjs(Date.now()));
              }}
            >
              Month
            </Button>
            <Button
              className="dateBtn"
              type={type === "day" ? "primary" : "default"}
              onClick={() => {
                setType("day");
                setTime(dayjs(Date.now()));
              }}
            >
              Day
            </Button>
          </div>
          <div>
            <div>
              {type === "day" && (
                 <DatePicker
                 defaultValue={dayjs(Date.now())}
                 onChange={(values)=>{setTime(values.$d);}}
                 picker="date"
                 format={dateFormat}
               ></DatePicker>
              )}
              {type === "month" && (
                <DatePicker
                  defaultValue={dayjs(Date.now())}
                  picker="month"
                  onChange={(values)=>{setTime(values.$d);}}
                  format={monthFormat}
                ></DatePicker>
              )}
              {type === "year" && (
                <DatePicker
                  picker="year"
                  defaultValue={dayjs(Date.now())}
                  onChange={(values)=>{setTime(values.$d)}}
                ></DatePicker>
              )}
            </div>
          </div>
        </div>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Tổng doanh thu">đ 100.000.000</Card>
            </Col>
            <Col span={8}>
              <Card title="Tổng chi phí">đ 30.000.000</Card>
            </Col>
            <Col span={8}>
              <Card title="Tổng lợi nhuận">đ 70.000.000</Card>
            </Col>
          </Row>
        </div>
        {/* {type === "day" ? <DashboardTable /> : <MultiLineChart />} */}
        <MultiLineChart />
      </div>
    </div>
  );
};

export default Dashboard;
