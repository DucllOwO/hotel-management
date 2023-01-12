import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../context/AppContext";
import ReceiptTable from "../../Tables/Receipt/ReceiptTable";
import "./receipt.css";
import dayjs from "dayjs";
import { getAllReceipt, getDayReceipt } from "../../../../api/receiptAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const DATE_FORMAT = "YYYY-MM-DD";

const Receipt = () => {
  const [receipt, setReceipt] = useState([]);
  const { user } = useContext(AppContext);
  const [dateType, setDateType] = useState("day");

  const [time, setTime] = useState(dayjs(Date.now()));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    switch (dateType) {
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
        const [firstDay, lastDay] = getFirstAndLastDayOfMonth(time);
        getAllReceipt(user.position)
          .then(({ data }) => {
            const filterData = data.filter((value) =>
              dayjs(value.established_date).isBetween(
                firstDay,
                lastDay,
                "day",
                "[]"
              )
            );
            setReceipt(filterData);
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
        getAllReceipt(user.position)
          .then(({ data }) => {
            const filterData = data.filter((value) =>
              dayjs(value.established_date).isBetween(
                firstDayOfYear,
                lastDayOfYear,
                "month",
                "[]"
              )
            );
            setReceipt(filterData);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            ErrorAlert("Lấy dữ liệu hóa đơn tháng thất bại !!");
          })
          .finally(() => setIsLoading(false));
        break;
      default:
        break;
    }
  }, [dateType, time]);
  return (
    <div className="recieptContainer">
      <ReceiptTable
        setTime={setTime}
        receipt={receipt}
        isLoading={isLoading}
        dateType={dateType}
        setDateType={setDateType}
        positionUser={user.position}
      ></ReceiptTable>
    </div>
  );

  function getFirstAndLastDayOfMonth(date) {
    return [
      dayjs(date).startOf("month").format("YYYY-MM-DD"),
      dayjs(date).endOf("month").format("YYYY-MM-DD"),
    ];
  }

  function getFirstAndLastDayOfYear(date) {
    return [
      dayjs(date).startOf("year").format("YYYY-MM-DD"),
      dayjs(date).endOf("year").format("YYYY-MM-DD"),
    ];
  }
};

export default Receipt;
