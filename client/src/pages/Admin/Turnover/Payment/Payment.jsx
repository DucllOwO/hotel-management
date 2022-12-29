import React, { useState, useContext, useEffect } from "react";
import { userRequest } from "../../../../api/api";
import { AppContext } from "../../../../context/AppContext";
import Topbar from "../../../../components/Topbar/Topbar";
import PaymentTable from "../../Tables/Payment/PaymentTable";
import "./payment.css";

const Payment = () => {
  const [payment, setPayment] = useState([]);
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Payment | Parallel Shine";
    const fetchPayment = async () => {
      setIsLoading(true);
      const { data } = await userRequest.get("/payment", {
        params: { user: { position: user?.position } },
      });
      console.log(data);
      setPayment(data);
      console.log(payment);
      setIsLoading(false);
    };
    fetchPayment();
  }, []);
  return (
    <div className="paymentContainer">
      <PaymentTable payment={payment} isLoading={isLoading}></PaymentTable>
    </div>
  );
};

export default Payment;
