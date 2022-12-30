import React, { useState, useContext, useEffect } from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import Topbar from "../../../../components/Topbar/Topbar";
import PaymentTable from "../../Tables/Payment/PaymentTable";
import "./payment.css";
import { getAllPayment } from "../../../../api/PaymentAPI";
import ErrorAlert from "../../../../components/Error/Alert/ErrorAlert";

const Payment = () => {
  const [payment, setPayment] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    document.title = "Payment | Parallel Shine";

    getAllPayment(user?.position)
      .then(({ data }) => {
        setPayment(data);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Lấy thông tin phiếu thu thất bại!!");
      });
  }, []);
  return (
    <div className="paymentContainer">
      <PaymentTable
        payment={payment}
        setPayment={setPayment}
        positionUser={user?.position}
      ></PaymentTable>
    </div>
  );
};

export default Payment;
