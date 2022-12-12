import React, { useState } from "react";
import "../../../assets/colors/Colors";
import { Button, Card, Col, Row, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import "./dashboard.css";
import MultiLineChart from "../../../components/Chart/MultiLineChart";
import DashboardTable from "../Tables/Dashboard/DashboardTable";

const dateFormat = "DD-MM-YYYY";
const monthFormat = "MM-YYYY";

const Dashboard = () => {
  const [type, setType] = useState("day");

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
              }}
            >
              Year
            </Button>
            <Button
              className="dateBtn"
              type={type === "month" ? "primary" : "default"}
              onClick={() => {
                setType("month");
              }}
            >
              Month
            </Button>
            <Button
              className="dateBtn"
              type={type === "day" ? "primary" : "default"}
              onClick={() => {
                setType("day");
              }}
            >
              Day
            </Button>
          </div>
          <div>
            <div>
              {type === "day" && (
                <DatePicker
                  defaultValue={moment()}
                  picker="date"
                  format={dateFormat}
                ></DatePicker>
              )}
              {type === "month" && (
                <DatePicker
                  defaultValue={dayjs(Date.now())}
                  picker="month"
                  format={monthFormat}
                ></DatePicker>
              )}
              {type === "year" && (
                <DatePicker
                  picker="year"
                  defaultValue={dayjs(Date.now())}
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
