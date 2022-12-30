import React, { useState } from "react";
import "../../../assets/colors/Colors";
import { Button, Card, Col, Row, DatePicker, Space } from "antd";
import dayjs from "dayjs";
// import moment, { now } from "moment";
import "./dashboard.css";
import { getMonth, getYear } from "../../../Utils/helpers";
import {
  fetchDailyReport,
  fetchMonthlyReport,
  fetchYearlyReport,
} from "../../../api/DashboardAPI";
import MultiLineChart from "../../../components/Chart/MultiLineChart";
import DashboardTable from "../Tables/Dashboard/DashboardTable";
import { useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";

const dateFormat = "DD-MM-YYYY";
const monthFormat = "MM-YYYY";

const Dashboard = () => {
  const [type, setType] = useState("day");
  const [data, setData] = useState([]);
  const [report, setReport] = useState([]);
  const [semiType, setSemiType] = useState("income");
  const [time, setTime] = useState(dayjs(Date.now()));
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Parallel Shine";
    switch (type) {
      case "day":
        console.log(time);
        if (semiType === "income") {
          setIsLoading(true);
          fetchDailyReport(user?.position, time, semiType).then(({ data }) => {
            setData(data.data);
            setReport(data.report);
            setIsLoading(false);
          });
        } else {
          setIsLoading(true);
          fetchDailyReport(user?.position, time, semiType).then(({ data }) => {
            setData(data.data);
            setReport(data.report);
            setIsLoading(false);
          });
        }
        break;
      case "month":
        setIsLoading(true);
        fetchMonthlyReport(user?.position, getMonth(time)).then(({ data }) => {
          setData(data.data);
          setReport(data.report);
          setIsLoading(false);
        });
        break;
      case "year":
        setIsLoading(true);
        fetchYearlyReport(user?.position, getYear(time)).then(({ data }) => {
          setData(data.data);
          setReport(data.report);
          setIsLoading(false);
        });
        break;
      default:
        break;
    }
  }, [type, time, semiType]);

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
              Năm
            </Button>
            <Button
              className="dateBtn"
              type={type === "month" ? "primary" : "default"}
              onClick={() => {
                setType("month");
                setTime(dayjs(Date.now()));
              }}
            >
              Tháng
            </Button>
            <Button
              className="dateBtn"
              type={type === "day" ? "primary" : "default"}
              onClick={() => {
                setType("day");
                setTime(dayjs(Date.now()));
              }}
            >
              Ngày
            </Button>
          </div>
          <div>
            <div>
              {type === "day" && (
                <DatePicker
                  defaultValue={dayjs(Date.now())}
                  onChange={(values) => {
                    setTime(values.$d);
                  }}
                  picker="date"
                  format={dateFormat}
                ></DatePicker>
              )}
              {type === "month" && (
                <DatePicker
                  defaultValue={dayjs(Date.now())}
                  picker="month"
                  onChange={(values) => {
                    setTime(values.$d);
                  }}
                  format={monthFormat}
                ></DatePicker>
              )}
              {type === "year" && (
                <DatePicker
                  picker="year"
                  defaultValue={dayjs(Date.now())}
                  onChange={(values) => {
                    setTime(values.$d);
                  }}
                ></DatePicker>
              )}
            </div>
          </div>
        </div>
        <div className="sumary">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Tổng doanh thu">
                {console.log(report[0])}
                {
                  <div className="sumaryDetail income">
                    {report[0]?.income
                      ? report[0]?.income?.toLocaleString() + " đ"
                      : 0 + " đ"}
                  </div>
                }
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Tổng chi phí">
                {
                  <div className="sumaryDetail payment">
                    {report[0]?.outcome
                      ? report[0]?.outcome.toLocaleString("en-US") + " đ"
                      : 0 + " đ"}
                  </div>
                }
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Tổng lợi nhuận">
                {
                  <div className="sumaryDetail benifit">
                    {report[0]?.profit
                      ? report[0]?.profit.toLocaleString("en-US") + " đ"
                      : 0 + " đ"}
                  </div>
                }
              </Card>
            </Col>
          </Row>
        </div>
        {type === "day" && (
          <div>
            <Button
              type={semiType === "income" ? "primary" : "default"}
              className="dateBtn"
              onClick={() => {
                console.log(report);
                setSemiType("income");
              }}
            >
              Thu
            </Button>
            <Button
              type={semiType === "outcome" ? "primary" : "default"}
              className="dateBtn"
              onClick={() => {
                setSemiType("outcome");
              }}
            >
              Chi
            </Button>
          </div>
        )}
        {/* {type === "day" ? <DashboardTable /> : <MultiLineChart />} */}
        {type === "day" ? (
          <DashboardTable
            data={data}
            revenue={semiType}
            isLoading={isLoading}
          ></DashboardTable>
        ) : (
          <MultiLineChart reportData={data} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
