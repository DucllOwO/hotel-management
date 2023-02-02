import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../context/AppContext";
import PaymentTable from "../../Tables/Payment/PaymentTable";
import "./payment.css";
import {
  getAllPayment,
  getDayPayment,
  getMonthPayment,
  getYearPayment,
} from "../../../../api/PaymentAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

import dayjs from "dayjs";

const Payment = () => {
  const [payment, setPayment] = useState([]);
  const { user } = useContext(AppContext);

  const [type, setType] = useState("day");

  const [time, setTime] = useState(dayjs(Date.now()));

  useEffect(() => {
    document.title = "Payment | Parallel Shine";

    switch (type) {
      case "day":
        getDayPayment(user.position, time)
          .then(({ data }) => {
            setPayment(data);
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Lấy dữ liệu phiếu thu ngày thất bại");
          });
        break;
      case "month":
        const [firstDay, lastDay] = getFirstAndLastDayOfMonth(time);
        getMonthPayment(user.position, firstDay, lastDay)
          .then(({ data }) => {
            setPayment(data);
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Lấy dữ liệu phiếu thu tháng thất bại");
          });
        break;
      case "year":
        const [firstDayOfYear, lastDayOfYear] = getFirstAndLastDayOfYear(time);
        getYearPayment(user.position, firstDayOfYear, lastDayOfYear)
          .then(({ data }) => {
            setPayment(data);
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Lấy dữ liệu phiếu thu năm thất bại");
          });
        break;

      default:
        break;
    }
    getAllPayment(user?.position)
      .then(({ data }) => {
        setPayment(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy thông tin phiếu thu thất bại!!");
      });
  }, [type, time]);
  return (
    <div className="paymentContainer">
      <PaymentTable
        payment={payment}
        setPayment={setPayment}
        setTime={setTime}
        type={type}
        setType={setType}
        positionUser={user.position}
      ></PaymentTable>
    </div>
  );

  function getFirstAndLastDayOfMonth(date) {
    return [dayjs(date).startOf("month"), dayjs(date).endOf("month")];
  }

  function getFirstAndLastDayOfYear(date) {
    return [dayjs(date).startOf("year"), dayjs(date).endOf("year")];
  }
};

export default Payment;
