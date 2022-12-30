import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../context/AppContext";
import ReceiptTable from "../../Tables/Receipt/ReceiptTable";
import "./receipt.css";
import dayjs from "dayjs";
import {
  getDayReceipt,
  getMonthReceipt,
  getYearReceipt,
} from "../../../../api/receiptAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const DATE_FORMAT = "DD-MM-YYYY";

const Receipt = () => {
  const [receipt, setReceipt] = useState([]);
  const { user } = useContext(AppContext);
  const [type, setType] = useState("day");

  const [time, setTime] = useState(dayjs(Date.now()));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    switch (type) {
      case "day":
        getDayReceipt(user?.position, dayjs(time), DATE_FORMAT)
          .then(({ data }) => {
            setReceipt(data);
          })
          .catch((err) => {
            console.log(err);
            ErrorAlert("Lấy dữ liệu hóa đơn ngày thất bại !!");
            setIsLoading(false);
          })
          .finally(() => setIsLoading(false));
        break;
      case "month":
        console.log("month case run");
        console.log(type);
        const [firstDay, lastDay] = getFirstAndLastDayOfMonth(time);
        getMonthReceipt(user?.position, firstDay, lastDay)
          .then(({ data }) => {
            setReceipt(data);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            ErrorAlert("Lấy dữ liệu hóa đơn tháng thất bại !!");
          })
          .finally(() => setIsLoading(false));
        break;
      case "year":
        const [firstDayOfYear, lastDayOfYear] = getFirstAndLastDayOfYear(time);
        getYearReceipt(user?.position, firstDayOfYear, lastDayOfYear)
          .then(({ data }) => {
            setReceipt(data);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            ErrorAlert("Lấy dữ liệu hóa đơn năm thất bại !!");
            setIsLoading(false);
          })
          .finally(() => setIsLoading(false));
        break;
      default:
        break;
    }
  }, [type, time]);
  return (
    <div className="recieptContainer">
      <ReceiptTable
        setTime={setTime}
        receipt={receipt}
        isLoading={isLoading}
        type={type}
        setType={setType}
        positionUser={user.position}
      ></ReceiptTable>
    </div>
  );

  function getFirstAndLastDayOfMonth(date) {
    return [dayjs(date).startOf("month"), dayjs(date).endOf("month")];
  }

  function getFirstAndLastDayOfYear(date) {
    return [dayjs(date).startOf("year"), dayjs(date).endOf("year")];
  }
};

export default Receipt;
